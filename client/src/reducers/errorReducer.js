//import {GET_ERRORS} from '../actions/types';
import { SET_ERROR } from "../actions/types";
const initialState = {};
export default function (state = initialState, action){
  switch(action.type){
    //case GET_ERRORS:
    case SET_ERROR:
      return action.payload;
    default:
      return state;
         }
    }