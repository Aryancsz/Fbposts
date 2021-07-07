const initialState = {
  PostList: [],
};

const allPostsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ALL_POSTS_GIF":
      return { ...state, PostList: [...state.PostList, payload] };
    default:
      return state;
  }
};

export default allPostsReducer;
