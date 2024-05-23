const initialState = {
  userData: {},
  login: false,
  cart: [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        userData: action.payload,
        login: true,
        clearToken: '124566',
      };
    case 'REMOVE_USER':
      return initialState;

    case 'UPDATE_CART':
      const existFood = state.cart.find(
        item => item.foodId === action.payload.foodId,
      );

      if (existFood) {
        const updatedCart = state.cart.map(food => {
          if (food.foodId === action.payload.foodId) {
            return {...food, unit: action.payload.unit};
          }
          return food;
        });
        return {
          ...state,
          cart: updatedCart.filter(food => food.unit > 0),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }

    case 'DEL_CART':
      return {
        ...state,
        cart: [],
      };
    case 'LOG_OUT':
      return {
        ...initialState,
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
