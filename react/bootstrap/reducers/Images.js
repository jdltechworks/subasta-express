import _ from 'lodash';

const Images = (state = {
  isUploading: false,
  isCompleted: false,
  payload: []
  }, action) => {
  let { payload } = action;
  let reduced = {
    'IS_UPLOADING': {
      ...state,
      isUploading: true,
      isCompleted: false,
    },
    'IS_UPLOADED': {
      ...state,
      isUploading: false,
      isCompleted: true,
      collection: payload
    },
    'UPLOAD_ERROR': {
      ...state,
      isUploading: false,
      isCompleted: false,
      collection: payload
    }
  }

  return _.isUndefined(reduced[action.type]) ? state : reduced[action.type];
};

export default Images;