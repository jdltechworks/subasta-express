const Comments = (state = {
  isLoading: false,
  isCompleted: false,
  data: {}
}, action ) => {
  switch(action.type) {
    case 'FETCH_COMMENTS':
      return {
        ...state,
        isLoading: true,
        isCompleted: true,
        data: action.entry
      };
      break;
    default:
      return state;
  }
};

export default Comments;