import * as actionTypes from '../actionTypes/adminDanActionTypes';

export const updAdminDan = (dan) => {
    return {
        type: actionTypes.UPDATE_ADMIN_DAN,
        payload: dan
    };
};