import * as actionTypes from '../actionTypes/urlParamsActionTypes';

export const urlParamsReducer = (state = {}, action) => {
    switch(action.type){
        case actionTypes.UPDATE_URL_PARAMS:
            return state = action.payload;

        default:
            return state;
    }
};