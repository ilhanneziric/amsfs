import * as actionTypes from '../actionTypes/napomenaActionTypes';

export const updNapomena = (nap) => {
    return {
        type: actionTypes.UPDATE_NAPOMENA,
        payload: nap
    };
};