import {ADD_TO_CART, SHOW_HIDE_CART, REMOVE_ITEM} from "../Types";

const CartReducer = (state, action) => {
    switch(action.type) {
        case ADD_TO_CART:{
            return {
                ...state,
                cartItems : [...state.cartItems, action.payload]
            }
        }
        case SHOW_HIDE_CART:{
            return {
                ...state,
                showCart : !state.showCart
            }
        }
        case REMOVE_ITEM:{
            return {
                ...state,
                cartItems : state.cartItems.filter((item) => item._id !== action.payload)
            }
        }
        default:
            return state;

    }
}

export default CartReducer;