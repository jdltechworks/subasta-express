import Auctions from './Auctions';
import Comments from './Comments';
import Images from './Images';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const mainReducer = combineReducers({ 
  Auctions, 
  Comments,
  Images,
  form: formReducer,
  routing: routerReducer 
});

export default mainReducer;