import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import axios from '../../utils/axios';

export const newsSlice = createSlice({
  name: "news",
  initialState: [],
  reducers: {
    setNews: (state, action) => {
      const news = action.payload;
      return news;
    }
  }
});

export const getNewsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  axios()
    .get("/news/")
    .then((res) => dispatch(setNews(res.data)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterNewsCategoryThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios()
    .get(`/news/?category=${id}`)
    .then((res) => dispatch(setNews(res.data)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterNewsHeadlineThunk = (newsSearch) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios()
    .get(
      "/news/?headline__icontains=" +
        newsSearch
    )
    .then((res) => dispatch(setNews(res.data)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setNews } = newsSlice.actions;

export default newsSlice.reducer;
