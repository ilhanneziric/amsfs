import {createStore, combineReducers} from 'redux';

//reducers
import { urlParamsReducer } from './reducers/urlParamsReducers';

const reducers = combineReducers({
    urlParams: urlParamsReducer
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;