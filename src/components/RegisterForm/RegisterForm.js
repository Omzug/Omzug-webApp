/**
 * Created by hanwencheng on 1/13/16.
 */

import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {surveyValidation} from './registerValidation';

@reduxForm({
  form: 'register',
  fields : ['email', 'username', 'password', 'passwordRepeat'],
  validate : surveyValidation
})

export default class RegisterForm extends Component{
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }


  render() {
    const {fields: {email, username, password, passwordRepeat}, resetForm, handleSubmit, submitting} = this.props;
    return (
    <form onSubmit={handleSubmit}>
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
        {passwordRepeat.touched && passwordRepeat!== password && <div>{passwordRepeat.error}</div>}
      </div>
      <div>
        <button disabled={submitting} onClick={handleSubmit}>
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