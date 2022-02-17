import * as actionTypes from '../actionTypes/adminDaniActionTypes';

export const addAdminDani = (dan) => {
    return {
        type: actionTypes.ADD_ADMIN_DANI,
        payload: dan
    };
};

export const removeAdminDani = (dan) => {
    return {
        type: actionTypes.REMOVE_ADMIN_DANI,
        payload: dan
    };
};