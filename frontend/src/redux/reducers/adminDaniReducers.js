import * as actionTypes from '../actionTypes/adminDaniActionTypes';

export const adminDaniReducer = (state = [], action) =>{
    switch(action.type){
        case(actionTypes.ADD_ADMIN_DANI):
            return state = [...state, action.payload];

        case(actionTypes.REMOVE_ADMIN_DANI):
            const odabrani = action.payload;
            return state = state.filter((x) => x._id !== odabrani._id);
        
        default: 
            return state; 
    }
};