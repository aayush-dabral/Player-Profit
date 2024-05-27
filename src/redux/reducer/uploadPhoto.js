import { UPLOAD_PHOTO_INIT, UPLOAD_PHOTO_SUCCESS, UPLOAD_PHOTO_FAILURE } from "../actionType";

const initialState = {};

const uploadPhotoInit = (state, action) => ({
  ...state,
  uploadPhoto: {data: {}, status: false, loader: true},
});

const uploadPhotoSuccess = (state, action) => ({
  ...state,
  uploadPhoto: {data: action?.data, status: true, loader: false},
});

const uploadPhotoFailure = (state, action) => ({
  ...state,
  uploadPhoto: {data: action?.data, status: false, loader: false},
});


const uploadPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_PHOTO_INIT:
      return uploadPhotoInit(state, action);
    case UPLOAD_PHOTO_SUCCESS:
      return uploadPhotoSuccess(state, action?.payload);
    case UPLOAD_PHOTO_FAILURE:
      return uploadPhotoFailure(state, action?.payload);
    default:
      return state;
  }
};

export default uploadPhotoReducer;