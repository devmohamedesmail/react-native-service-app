import { createSlice } from '@reduxjs/toolkit'
import Toast from 'react-native-toast-message';

const initialState = {
  wishlistItems: [], // Initialize wishlistItems as an empty array
};


export const wishlistSlice = createSlice({
 
  name: 'wishlist',
  initialState,
  reducers: {
    add_To_wishlist: (state, action) => {
      const itemToAdd = action.payload;

      // Check if the item already exists in the wishlist
      const isItemAlreadyInWishlist = state.wishlistItems.some(
        (item) => item.id === itemToAdd.id // Assuming each product has a unique 'id'
      );

      // Only add the item if it doesn't exist
      if (!isItemAlreadyInWishlist) {
        state.wishlistItems.push(itemToAdd);
       
      } else {
        console.log("Item already exists in the wishlist")
      }
    },

    // Remove item from wishlist
    remove_From_wishlist: (state, action) => {
      console.log("Before removing:", state.wishlistItems);
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload.id
      );
      console.log("After removing:", state.wishlistItems);
    }

  },
})


export const { add_To_wishlist, remove_From_wishlist } = wishlistSlice.actions

export default wishlistSlice.reducer