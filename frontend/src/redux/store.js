import {createStore, combineReducers} from 'redux';

//reducers
import { urlParamsReducer } from './reducers/urlParamsReducers';
import { adminDanReducer } from './reducers/adminDanReducers';
import { napomenaReducer } from './reducers/napomenaReducers';

const reducers = combineReducers({
    urlParams: urlParamsReducer,
    adminDan: adminDanReducer,
    napomena: napomenaReducer,
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;