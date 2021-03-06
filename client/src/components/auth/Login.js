import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import axios from 'axios';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onChange(e){
    //this.setState({name: e.target.value}); to pass value only name text field
    this.setState({[e.target.name]: e.target.value});
  }
 onSubmit(e){
  e.preventDefault()

  const user = {
    email: this.state.email,
    password: this.state.password,
  };
  this.props.loginUser(user);
  //axios.post('api/users/login', user)
  //.then(res => console.log(res.data))
  //.catch(err => this.setState({errors: err.response.data}))
  //all three lines move to login authActions
 }
 //lifecycle
 componentDidMount(){
  if(this.props.auth.isAuthenticated){
    this.props.history.push('/dashboard');
 }}
 componentWillReceiveProps(nextProps){
   if(nextProps.auth.isAuthenticated){
     this.props.history.push('/dashboard');
   }
  if (nextProps.errors){
    this.setState({errors: nextProps.errors});
  }
}
  render() {
    //const errors = this.state.errors; 
    const {errors} = this.state;
    return (
      <div className="landing-inn">
        <div className="dark text-light">
      <div className="login">
    <div className="container">
      <div className="row m-auto">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Log In</h1>
          <p className="lead text-center">Sign in to your DevConnector account</p>
          <form noValidate onSubmit = {this.onSubmit.bind(this)}>
            <div className="form-group">
              <input type="email" className={classnames('form-control form-control-lg', {'is-invalid': errors.email})}  placeholder="Email Address" name="email" value = {this.state.email} onChange = {this.onChange.bind(this)} />
              {errors.email && (
                <div className = "invalid-feedback">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="form-group">
              <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.password})} placeholder="Password" name="password" value = {this.state.password} onChange = {this.onChange.bind(this)} />
              {errors.password && (
                <div className = "invalid-feedback">
                  {errors.password}
                </div>
              )}
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
    )
  }
}
//export default Login;
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth
});
export default connect(mapStateToProps, {loginUser})(Login);
