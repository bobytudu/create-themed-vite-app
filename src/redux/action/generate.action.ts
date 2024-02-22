import {
  bookmarkImageFailure,
  bookmarkImageRequest,
  bookmarkImageSuccess,
  enhanceImageFailure,
  enhanceImageRequest,
  enhanceImageSuccess,
  generateImageFailure,
  generateImageRequest,
  generateImageSuccess,
  getElementsImageListSuccess,
  getElementsListsFailure,
  getElementsListsRequest,
  getNoOfImageLeftFailure,
  getNoOfImageLeftRequest,
  getNoOfImageLeftSuccess,
  getThemeImageFailure,
  historyGeneratedImagesRequest,
} from "src/redux/reducers/generate.reducer";
import makeAIAPIAuthorizedRequest from "service/api/makeAIAPIAuthorizedRequest";
import store from "src/redux/store";
import { getUrlExtension } from "utils/helper";

const dispatch = store.dispatch;
const getState = store.getState;

export const getNoOfImageLeft = async (email: string) => {
  try {
    dispatch(getNoOfImageLeftRequest());
    let url =
      process.env.REACT_APP_AI_API_URL + `/api/get_number_of_images_left/`;
    const response = await makeAIAPIAuthorizedRequest({
      url,
      method: "POST",
      data: { email: email },
    });
    const res = response.data;
    dispatch(getNoOfImageLeftSuccess(res));
  } catch (error: any) {
    dispatch(getNoOfImageLeftFailure(error.message));
  }
};

export const getElementsDetails = async ( elementName: string ) => {
  let result = [];
  try {
    let url = process.env.REACT_APP_AI_API_URL + `/api/decorations/${elementName}`;
    const response = await makeAIAPIAuthorizedRequest( { url, method: "GET" } )

    const res = response.data;
    result = res;

    return result;
  } catch ( error: any ) {
    result = [];
  }
};
interface elementsDetailListType {
  elementName: string;
  elementImages: any[];
}
export const getElementsListsApi = async () => {
  try {
    dispatch( getElementsListsRequest() );
    let url = process.env.REACT_APP_AI_API_URL + "/api/decoration_category_list";
    const response = await makeAIAPIAuthorizedRequest( { url, method: "GET" } )

    const res = response.data;
    if ( res && res.length ) {
      let elementsDetailList: elementsDetailListType[] = [];
      await Promise.all(
        res.map( async ( element: any ) => {
          let elementImages = await getElementsDetails( element );
          elementsDetailList = [
            ...elementsDetailList,
            { elementName: element, elementImages: elementImages },
          ];
        } )
      );
      elementsDetailList.sort( ( a, b ) => {
        let fa = a.elementName.toLowerCase(),
          fb = b.elementName.toLowerCase();

        if ( fa < fb ) {
          return -1;
        }
        if ( fa > fb ) {
          return 1;
        }
        return 0;
      } );
      dispatch( getElementsImageListSuccess( elementsDetailList ) );
    }
  } catch ( error: any ) {
    dispatch( getElementsListsFailure( error.message ) );
  }
};
export const getThemeImage = async (theme: string) => {
  let result = "";
  try {
    let url = process.env.REACT_APP_AI_API_URL + `/api/theme_image/${theme}`;
    const response = await makeAIAPIAuthorizedRequest({ url, method: "GET" });

    const res = response.data;
    result = res && res.length > 0 && res[0];
  } catch (error) {
    result = "";
  }
  return result;
};

export const getThemeImageListsApi = async () => {
  try {
    // dispatch(getThemeImageRequest());
    // let url = process.env.REACT_APP_AI_API_URL + "/api/themes";
    // const response = await makeAIAPIAuthorizedRequest({ url, method: "GET" });
    // const res = response.data;
    // if (res && res.length) {
    //   let themeImageList: any[] = [];
    //   await Promise.all(
    //     res.map(async (theme: any) => {
    //       let themeImage = await getThemeImage(theme);
    //       themeImageList = [
    //         ...themeImageList,
    //         { theme: theme, image: themeImage },
    //       ];
    //     })
    //   );
    //   themeImageList.sort((a, b) => {
    //     let fa = a.theme.toLowerCase(),
    //       fb = b.theme.toLowerCase();

    //     if (fa < fb) {
    //       return -1;
    //     }
    //     if (fa > fb) {
    //       return 1;
    //     }
    //     return 0;
    //   });
    //   dispatch(getThemeImageSuccess(themeImageList));
    // }
  } catch (error: any) {
    console.log(error.message);
    dispatch(getThemeImageFailure(error.message));
  }
};

export const generateImageCampaignBasedApi = async (formData: any) => {
  try {
    dispatch(generateImageRequest());
    let url =
      process.env.REACT_APP_AI_API_URL + "/api/generate_image_target_audience";
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await makeAIAPIAuthorizedRequest({
      url,
      method: "POST",
      data: formData,
      headers,
    });

    const res = response.data;
    if (response.status === 200) {
      let state = getState();
      let generatedImageState = state.generate["generateImageResponse"];
      if (generatedImageState && generatedImageState?.length > 0) {
        let historyGeneratedImageState =
          state.generate["historyGeneratedImages"];
        historyGeneratedImageState = [
          ...generatedImageState,
          ...historyGeneratedImageState,
        ];
        dispatch(historyGeneratedImagesRequest(historyGeneratedImageState));
      }
      dispatch(generateImageSuccess(res));
      getNoOfImageLeft( localStorage.getItem( "email" ) || "" );
    }
  } catch (error: any) {
    let errorMsg = error?.response?.data?.message || "";
    dispatch(generateImageFailure(errorMsg));
  }
};

export const removeBgImg = async ( name: string, src: string ) => {
  const formData = new FormData();
  formData.append(
    "product_name", name );
  if ( src ) {
    const imgExt = getUrlExtension( src );
    const response = await fetch( src );
    const blob = await response.blob();
    const file = new File(
      [blob],
      `${name || "product"}.${imgExt}`,
      {
        type: blob.type,
      }
    );
    formData.append( "image", file );
  }
  // window.amplitude.track( "Remove background", {
  //   email: localStorage.getItem( "email" ) || "",
  // } );
  return await removeBackgroundApi( formData )
};

export const removeBackgroundApi = async ( formData: FormData ) => {
  try {
    let url = process.env.REACT_APP_AI_API_URL + "/api/remove_background";
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await makeAIAPIAuthorizedRequest( { url, method: "POST", data: formData, headers } )
    const res = response.data;
    return res
  } catch ( error: any ) {
    throw error
  }
};

export const generateImageThemeBasedApi = async (formData: any) => {
  try {
    dispatch(generateImageRequest());
    let url = process.env.REACT_APP_AI_API_URL + "/api/generate_image_theme";
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await makeAIAPIAuthorizedRequest({
      url,
      method: "POST",
      data: formData,
      headers,
    });

    const res = response.data;
    if (response.status === 200) {
      let state = getState();
      let generatedImageState = state.generate["generateImageResponse"];
      if (generatedImageState && generatedImageState?.length > 0) {
        let historyGeneratedImageState =
          state.generate["historyGeneratedImages"];
        historyGeneratedImageState = [
          ...generatedImageState,
          ...historyGeneratedImageState,
        ];
        dispatch(historyGeneratedImagesRequest(historyGeneratedImageState));
      }
      dispatch(generateImageSuccess(res));
      getNoOfImageLeft( localStorage.getItem( "email" ) || "" );
    }
  } catch (error: any) {
    let errorMsg = error?.response?.data?.message || error.message;
    dispatch(generateImageFailure(errorMsg));
  }
};

export const generateImageCustomStudioApi = async ( formData: any, settings: any, present: string | null ) => {
  try {
    dispatch(generateImageRequest());

    if ( present ) formData.append( "present", "true" )
    let url =
      process.env.REACT_APP_AI_API_URL + "/api/generate_image_custom_studio";
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await makeAIAPIAuthorizedRequest({
      url,
      method: "POST",
      data: formData,
      headers,
    });

    const res = response.data;
    if (response.status === 200) {
      let state = getState();
      let generatedImageState = state.generate["generateImageResponse"];
      if (generatedImageState && generatedImageState?.length > 0) {
        let historyGeneratedImageState =
          state.generate["historyGeneratedImages"];
        historyGeneratedImageState = [
          ...generatedImageState,
          ...historyGeneratedImageState,
        ];
        dispatch(historyGeneratedImagesRequest(historyGeneratedImageState));
      }
      dispatch( generateImageSuccess( res.map( ( item: any ) => ( { ...item, settings } ) ) ) );
      getNoOfImageLeft( localStorage.getItem( "email" ) || "" );
    }
  } catch (error: any) {
    let errorMsg = error?.response?.data?.message || "";
    dispatch(generateImageFailure(errorMsg));
  }
};

export const generateImageVisualConceptApi = async ( formData: any, settings: any, present: string | null ) => {
  try {
    dispatch(generateImageRequest());
    let url =
      process.env.REACT_APP_AI_API_URL + "/api/generate_image_visual_concept";
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    if ( present ) formData.append( "present", "true" )
    const response = await makeAIAPIAuthorizedRequest({
      url,
      method: "POST",
      data: formData,
      headers,
    });

    const res = response.data;
    if (response.status === 200) {
      let state = getState();
      let generatedImageState = state.generate["generateImageResponse"];
      if (generatedImageState && generatedImageState?.length > 0) {
        let historyGeneratedImageState =
          state.generate["historyGeneratedImages"];
        historyGeneratedImageState = [
          ...generatedImageState,
          ...historyGeneratedImageState,
        ];
        dispatch(historyGeneratedImagesRequest(historyGeneratedImageState));
      }
      dispatch(
        generateImageSuccess(res.map((item: any) => ({ ...item, settings })))
      );
      getNoOfImageLeft(localStorage.getItem("email") || "");
    }
  } catch (error: any) {
    let errorMsg = error?.response?.data?.message || "";
    dispatch(generateImageFailure(errorMsg));
    throw error;
  }
};

export const enhanceImageApi = async (
  formData: any,
  arrIndex: any,
  imageListState: any
) => {
  try {
    dispatch(enhanceImageRequest());
    let url = process.env.REACT_APP_AI_API_URL + "/api/enhance_image";
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await makeAIAPIAuthorizedRequest({
      url,
      method: "POST",
      data: formData,
      headers,
    });
    const res = response.data;
    dispatch(enhanceImageSuccess(res));
    if (response.status === 200) {
      let state = getState();
      let previousState = state.generate[imageListState];
      previousState[arrIndex] = {
        ...previousState[arrIndex],
        image: res,
        enhancedImage: true,
      };
      let stateFunction: any = generateImageSuccess;
      if (imageListState === "historyGeneratedImages") {
        stateFunction = historyGeneratedImagesRequest;
      }
      dispatch(stateFunction(previousState));
    }
  } catch (error: any) {
    dispatch(enhanceImageFailure(error.message));
  }
};

export const bookmarkImage = async (
  formData: any,
  arrIndex: number,
  imageListState: string
) => {
  try {
    const generateProductState = getState().generate;
    const historyGeneratedImageState =
      generateProductState?.historyGeneratedImages || [];
    dispatch(bookmarkImageRequest());
    let url = process.env.REACT_APP_AI_API_URL + "/api/bookmark_image";
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await makeAIAPIAuthorizedRequest({
      url,
      method: "POST",
      data: formData,
      headers,
    });

    const res = response.data;
    dispatch(bookmarkImageSuccess(res));
    if (response.status === 200) {
      let state = getState();
      let previousState = state.generate[imageListState];
      previousState[arrIndex] = {
        ...previousState[arrIndex],
        saved: true,
      };
      let stateFunction = generateImageSuccess;
      if (imageListState === "historyGeneratedImages") {
        stateFunction = historyGeneratedImageState;
      }
      dispatch(stateFunction(previousState));
    }
  } catch (error: any) {
    dispatch(bookmarkImageFailure(error.message));
  }
};
