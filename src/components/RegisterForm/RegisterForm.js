/**
 * Created by hanwencheng on 1/13/16.
 */

import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import registerValidation from './registerValidation';

const submitValidate = (data/*, dispatch */) => {
  if (data.password !== data.passwordRepeat) {
    console.log('password issue')
    return
  }
  return new Promise((resolve, reject) => {
      if (!['john', 'paul', 'xinyue', 'hanwen'].includes(values.username)) {
        console.log('name issue')
        reject({username: 'User does not exist', _error: 'Login failed!'});
      } else {
        console.log('success')
        resolve();
      }
     // simulate server latency
  });
}

const asyncValidate = (values /*, dispatch */) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
        reject({username: 'That username is taken'});
      } else {
        resolve();
      }
    }, 1000); // simulate server latency
  });
};

@reduxForm({
  form: 'register',
  fields : ['email', 'username', 'password', 'passwordRepeat'],
  validate : registerValidation,
  asyncValidate,
  asyncBlurFields: ['username'],
})

export default class RegisterForm extends Component{
  static propTypes = {
    asyncValidating: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }


  render() {
    const {fields: {email, username, password, passwordRepeat}, resetForm, handleSubmit, submitting, asyncValidating} = this.props;
    return (
    <form onSubmit={handleSubmit(submitValidate)}>
      <div>
        <label>Email</label>
        <div>
          <input type="text" placeholder="Email" {...email}/>
        </div>
        {email.touched && email.error && <div>{email.error}</div>}
      </div>
      <div>
        <label>Username</label>
        <div>
          <input type="text" placeholder="Username" {...username}/>
          {asyncValidating === 'username' && <i /* spinning cog *//>}
        </div>
        {username.touched && username.error && <div>{username.error}</div>}
      </div>
      <div>
        <label>Password</label>
        <div>
          <input type="text" placeholder="Password" {...password}/>
        </div>
        {password.touched && password.error && <div>{password.error}</div>}
      </div>
      <div>
        <label>Repeat Password</label>
        <div>
          <input type="text" placeholder="Repeat Password" {...passwordRepeat}/>
        </div>
        { passwordRepeat.touched && <div>{passwordRepeat.error}</div>}
        {
          passwordRepeat.touched && password.touched && !passwordRepeat.error && passwordRepeat.value !== password.value &&
        <div>Password is not same</div>
        }
      </div>
      <div>
        <button disabled={submitting} onClick={handleSubmit(submitValidate)}>
          {submitting ? <i/> : <i/>} Submit
        </button>
        <button disabled={submitting} onClick={resetForm}>
          Clear Values
        </button>
      </div>
    </form>
    );
  }
}