const initialState = {
  restaurantList: [],
  foodList: [],
  categoryList: [],
  foodIdList: [],
};

const supplierReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RESTAURANT':
      return {
        ...state,
        restaurantList: action.payload,
      };
    case 'GET_FOOD':
      return {
        ...state,
        foodList: action.payload,
      };

    case 'GET_CATEGORY':
      return {
        ...state,
        categoryList: action.payload,
      };
    case 'GET_TOPFOOD':
      return {
        ...state,
        foodIdList: action.payload,
      };
    default:
      return state;
  }
};

export default supplierReducer;
