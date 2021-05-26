//import {GET_ERRORS} from '../actions/types';
import { SET_ERROR, CLEAR_ERRORS } from "../actions/types";
const initialState = {};
export default function (state = initialState, action){
  switch(action.type){
    //case GET_ERRORS:
    case SET_ERROR:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
         }
    }