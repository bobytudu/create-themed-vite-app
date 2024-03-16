import React from "react";
import Loader from "components/Loader";
import { useDispatch } from "react-redux";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import { useAppSelector } from "src/redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "src/service/firebase";
import { setUser, stopLoading } from "src/redux/reducers/auth.reducer";

export default function Routes() {
  const dispatch = useDispatch();
  const auth = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    if (!auth.user) {
      const unsubscribe = onAuthStateChanged(
        firebaseAuth,
        async (currentUser) => {
          if (currentUser) {
            const userObj = {
              displayName: currentUser.displayName || "",
              email: currentUser.email || "",
              photoURL: currentUser.photoURL || "",
              uid: currentUser.uid,
              emailVerified: currentUser.emailVerified,
              isAnonymous: currentUser.isAnonymous,
              phoneNumber: currentUser.phoneNumber || "",
              providerData: currentUser.providerData,
              accessToken: await currentUser.getIdToken(),
            };
            localStorage.setItem("accessToken", userObj.accessToken);
            dispatch(setUser(userObj));
          }
          dispatch(stopLoading());
        }
      );
      return () => unsubscribe();
    }
  }, [auth.user, dispatch]);

  return (
    <div>
      {auth.loading && <Loader loading />}
      {auth.user && !auth.loading && <PrivateRouter />}
      {!auth.user && !auth.loading && <PublicRouter />}
    </div>
  );
}
