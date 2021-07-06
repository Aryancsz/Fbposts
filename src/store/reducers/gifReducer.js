const initialState = {
  results: [],
};

const gifReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "RESULTS":
      return { ...state, results: payload };
    default:
      return state;
  }
};

export default gifReducer;
