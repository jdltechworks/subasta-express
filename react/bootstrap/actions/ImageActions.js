import { END_POINT } from '../helpers';

export const uploadImage = (payload) => {
    let body = new FormData();
    let headers = new Headers();
    headers.set("Content-Type", "multipart/form-data");

    body.append('image', payload);

    return (dispatch) => {
      dispatch(isUploading());

      return fetch(`${END_POINT()}/upload`, {
          method: 'POST',
          body,
        }).then((res) => {
          return res.json();
        }).then(json => {
          dispatch(isUploaded(json));
          return json;
        })
        .catch( err => dispatch(uploadError(err)));
    }
}

export const isUploading = () => {
  return {
    type: 'IS_UPLOADING',
    payload: []
  }
};

export const isUploaded = (payload) => {
  return {
    type: 'IS_UPLOADED',
    payload
  }
};

export const uploadError  = (payload) => {
  return {
    type: 'UPLOAD_ERROR',
    payload
  }
};