//import {SET_CURRENT_USER} from '../actions/types';
import { SET_USER } from "../actions/types";
import isEmpty from '../validation/is-empty';
const initialState = {
  isAuthenticated: false,
  user: {}
};
export default function (state = initialState, action){
  switch(action.type){
    //case SET_CURRENT_USER:
    case SET_USER:
      return{
        ...state,
        // if action payload is not empty then isAuthenticated is true.
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default:
      return state;
  }
}