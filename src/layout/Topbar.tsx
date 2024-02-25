import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "src/service/firebase";
import { NavLink, Link } from "react-router-dom";
import AccountMenu from "src/layout/AccountMenu";
import {Icon } from '@iconify/react'
import useAuthStatus from "utils/hooks/useAuthStatus";
import { IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { switchToDark, switchToLight } from "src/redux/reducers/theme.reducer";

function CustomLink({ path, title }: { path: string; title: string }) {
  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            mr: 2,
            fontWeight: 600,
            color: isActive ? "text.primary" : "text.disabled",
          }}
        >
          {title}
        </Typography>
      )}
    </NavLink>
  );
}

export default function Topbar() {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | boolean>(null);
  const open = Boolean(anchorEl);
  let [isSignedIn] = useAuthStatus();
  const {mode} = useAppSelector(state => state.theme)

  const handleLogout = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        localStorage.clear();
        window.location.href = "/login";
      })
      .catch((error) => {
        // An error occurred during logout
        console.log("Logout error:", error);
      });
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ bgcolor: "background.paper", borderBottom: 1, borderColor: 'divider' }}
      elevation={0}
    >
      <Toolbar disableGutters sx={{ px: 5 }}>
        <Link to="/" style={{ marginRight: 16 }}>
          <Typography variant="h6" sx={{color: 'text.primary'}}>LOGO</Typography>
          {/* <img
            src={brandLogo}
            style={{
              width: 100,
              height: 20,
            }}
            alt="logo"
          /> */}
        </Link>
        <Stack direction="row" alignItems="center" flexGrow={1}>
          <CustomLink path="/" title="Home" />
          <CustomLink path="/contact" title="Contact" />
          <CustomLink path="/about" title="About" />
        </Stack>
        <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
        {mode === "light" ? (
            <IconButton
              onClick={() => dispatch(switchToDark())}
              sx={{ width: 40, height: 40 }}
            >
              <Icon icon="twemoji:sun" />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => dispatch(switchToLight())}
              sx={{ width: 40, height: 40 }}
            >
              <Icon icon="icon-park:moon" />
            </IconButton>
          )}
          {isSignedIn && (
            <AccountMenu
              handleClose={handleClose}
              handleLogout={handleLogout}
              handleClick={handleClick}
              anchorEl={anchorEl}
              open={open}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
