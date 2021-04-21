import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
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
    }));
}
export const loginUser = userData => dispatch =>{
  axios.post('api/users/login', userData)
  .then(res => {
    //save token to local state
    const {token} = res.data;
    localStorage.setItem('jwtToken', token);
    //automatically set token to authHeader
    setAuthToken(token);
    //decode token
    const decoded = jwt_decode(token);
    //dispatch SET_CURRENT_USER
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
})
//.catch(err => console.log({errors: err.response.data}))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
   }));
}