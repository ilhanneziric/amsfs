import * as actionTypes from '../actionTypes/adminDanActionTypes';

export const adminDanReducer = (state = '', action) =>{
    switch(action.type){
        case(actionTypes.UPDATE_ADMIN_DAN):
            return state = action.payload;
        default: 
            return state; 
    }
};