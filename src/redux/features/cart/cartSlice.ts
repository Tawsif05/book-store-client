import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  productId: string; // MongoDB ObjectId হবে
  title: string;
  name: string;
  price: number;
  quantity: number;
  imgUrl?: string; // Image field updated
}

interface CartState {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
  isCartOpen: boolean;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.totalQuantity += action.payload.quantity;
      state.totalPrice += action.payload.price * action.payload.quantity;
    },

    removeFromCart(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.productId === itemId);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.productId !== itemId);
      }
    },

    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);

      if (existingItem && quantity > 0) {
        const quantityDifference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += quantityDifference;
        state.totalPrice += quantityDifference * existingItem.price;
      }
    },
    openCart: (state) => {
      state.isCartOpen = true; 
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity,openCart, closeCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
