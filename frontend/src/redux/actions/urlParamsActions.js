import * as actionTypes from "../actionTypes/urlParamsActionTypes";

export const updateUrlParams = (urlobj) => {
    return{
        type: actionTypes.UPDATE_URL_PARAMS,
        payload: urlobj
    };
};