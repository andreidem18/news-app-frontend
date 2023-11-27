import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from '../../utils/axios';

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        setFavorites: (state, action) => {
            const favorites = action.payload;
            return favorites;
        }
    }
})

export const getFavoritesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios().get('/favorites/')
        .then(res => dispatch(setFavorites(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addFavoriteThunk = (favorite) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios().post('/favorites/', favorite)
        .then(() => dispatch(getFavoritesThunk()))
        .catch(() => alert("Hubo un error"))
        .finally(() => dispatch(setIsLoading(false)));
}
export const updateRateThunk = (id, rate) => (dispatch) => {
    dispatch(setIsLoading(true));
    const body = { 
        rate: rate 
    }
    return axios().put(`/favorites/${id}/change_rate/`, body)
        .then(() => dispatch(getFavoritesThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteFavoriteThunk = (id) => dispatch => {
    dispatch(setIsLoading(true));
    return axios().delete('/favorites/'+id)
        .then(() => dispatch(getFavoritesThunk()))
        .catch(() => alert("Hubo un error"))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
