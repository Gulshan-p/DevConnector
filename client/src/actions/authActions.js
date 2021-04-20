import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER} from './types';
//use history when to go to another page
export const registerUser = (userData, history) => dispatch => {
  //return{
    //type: SET_CURRENT_USER,
    //payload: userData
  //} for the first flow to write register data into redux store.
  
  axios.post('api/users/register', userData)
   //to show in console//.then(res => console.log(res.data))
   .then(res => history.push('/login'))
   .catch(err => dispatch({
     type: GET_ERRORS,
     payload: err.response.data
    }))

}