/**
 * Created by hanwencheng on 1/13/16.
 */

import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import registerValidation from './registerValidation';
import {check as checkEmail} from 'redux/modules/auth';

const enableAsyncCheck = false;
const asyncValidate = (value , dispatch) => {
  if(enableAsyncCheck){
    //return new Promise((resolve, reject) =>{
    //
    //})
    return dispatch(checkEmail(value))
  }else{
    return new Promise((resolve, reject) => {
      console.log('sync validate value is disable now.')
      resolve()
    })

  }
}


@reduxForm({
  form: 'register',
  fields : ['email', 'username', 'password', 'passwordRepeat'],
  validate : registerValidation,
  asyncValidate,
  asyncBlurFields: ["email", "name"],
})

export default class RegisterForm extends Component{
  static propTypes = {
    asyncValidating: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  render() {
    const styles = require('./RegisterForm.scss');
    const {
      fields: {email, username, password, passwordRepeat},
      resetForm,
      handleSubmit,
      submitting,
      asyncValidating} = this.props;
    const isPasswordSame = password.value && passwordRepeat.value && passwordRepeat.value == password.value;

    return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      <div className={'form-group'}>
        <label>Email</label>
        <div>
          <input type="text" placeholder="Email" className="form-control" {...email}/>
        </div>
        {email.touched && email.error && <div>{email.error}</div>}
      </div>
      <div className={'form-group'}>
        <label>用户名</label>
        <div>
          <input type="text" placeholder="Username" className="form-control" {...username}/>
          {asyncValidating === 'username' && <i /* spinning cog *//>}
        </div>
        {username.touched && username.error && <div>{username.error}</div>}
      </div>
      <div className={'form-group'}>
        <label>密码</label>
        <div>
          <input type="text" placeholder="Password" className="form-control" {...password}/>
        </div>
        {password.touched && password.error && <div>{password.error}</div>}
      </div>
      <div className={'form-group'}>
        <label>重复密码</label>
        <div>
          <input type="text" placeholder="Repeat Password" className="form-control" {...passwordRepeat}/>
        </div>
        { passwordRepeat.touched && <div>{passwordRepeat.error}</div>}
        {
          passwordRepeat.touched && password.touched && !passwordRepeat.error && !isPasswordSame &&
        <div>Password is not same</div>
        }
      </div>
      <div>
        <button disabled={isPasswordSame? submitting : "true"} className="btn btn-primary" onClick={handleSubmit}>
          {submitting ? <i/> : <i/>} Submit
        </button>
        <button disabled={submitting} className="btn btn-warning" onClick={resetForm}>
          Clear Values
        </button>
      </div>
    </form>
    );
  }
}