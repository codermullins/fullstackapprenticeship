import React, { Component } from 'react';

export default class ResetPasswordForm extends Component {
  render() {
    return(
      <React.Fragment>
        <p id='formErrors'>
          {this.props.data.errors
            ? this.props.data.errors.join(', ')
            : null}
        </p>
        <form className='resetPasswordForm' onSubmit={this.handleOnSubmit}>
          <div className='formElement'>
            <label>Confirmation Code</label><br />
            <input type='text' id='code'
                   value={this.props.data.code}
                   onChange={this.props.handleOnChange} />
            <p className='light small'>Confirmation code has been sent to the email you used to register.</p>
          </div>

          <div className='formElement'>
            <label>New Password</label><br />
            <input type='password' id='newPassword'
                   value={this.props.data.newPassword}
                   onChange={this.props.handleOnChange} />
            <p className='light small'>Make sure this is at least 8 characters, including a number, an uppercase character, and a symbol.</p>
          </div>

          <input type='submit' value='Submit' />
        </form>
      </React.Fragment>
    )
  }

  handleOnSubmit = event => {
    event.preventDefault();
    if (!this.validateCode(this.props.data.code)) {
      this.props.addError("Code is required");
      return;
    }
    
    if (!this.validatePassword(this.props.data.newPassword)) {
      this.props.addError("Password is invalid");
      return;
    }

    this.props.handleOnSubmit();
  }

  validateCode = code => {
    const validCode = /[0-9]{6}/
    return validCode.test(code);
  }

  validatePassword = password => {
    const validPassword = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&?"]).*$/
    return validPassword.test(password);
  }
}