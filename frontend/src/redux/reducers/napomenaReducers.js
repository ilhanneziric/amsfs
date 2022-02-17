import * as actionTypes from '../actionTypes/napomenaActionTypes';

export const napomenaReducer = (state = '', action) =>{
    switch(action.type){
        case(actionTypes.UPDATE_NAPOMENA):
            return state = action.payload;
        default: 
            return state; 
    }
};