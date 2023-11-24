import { configureStore } from "@reduxjs/toolkit";
import isLoadingSlice from "./slices/isLoading.slice";
import newsSlice from "./slices/news.slice";
import favoritesSlice from './slices/favorites.slice';

export default configureStore({
  reducer: {
    isLoading: isLoadingSlice,
    news: newsSlice,
    favorites: favoritesSlice,
  }
});
