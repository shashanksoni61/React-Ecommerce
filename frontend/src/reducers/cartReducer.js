import {
  CART_ADD_ITEM,
  CART_PAYMENT_METHOD,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../actions/types';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || {},
  paymentMethod: JSON.parse(localStorage.getItem('paymentMethod')) || null,
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

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };

    case CART_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };
    default:
      return state;
  }
}
