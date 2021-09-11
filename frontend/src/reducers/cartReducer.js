import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/types';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

export default function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;

      const existItem = state.cartItems.find(
        prod => prod.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(p =>
            p.product === existItem.product ? item : p
          ),
          // if(p.product === existItem.product) return item;
          //  else return x
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(i => i.product !== payload),
      };
    default:
      return state;
  }
}
