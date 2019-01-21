import React, { Component } from 'react'
import styled from 'styled-components';

const Main = styled.div`
  display: grid;
  grid-template-columns: 40vw 60vw;

  > div {
    height: 100vh;

    &:first-child { 
      background: #551A8B;
      display: grid;
      align-items: end;
      text-align: center;
      
      p { color: #fff; font-size: 12px; }
    }

    &:last-child {
      display: grid;
      align-items: center;
      padding-left: 40px;
    }
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 40% 1fr;
  align-items: center;

  > div { grid-column: 1; }

  h2 {
    letter-spacing: 3px;
    text-transform: uppercase;
    opacity: .6;
    font-size: 16px;
  }

  label {
    display: block;
    margin: 15px 0 3px 0;
    opacity: .8;
    color: #551A8B;
  }

  input {
    font-size: 16px;
    padding: 10px 15px;
    width: 100%;
  }

  button {
    grid-column: 1;
    margin-top: 20px;
    justify-self: end;
    background: #551A8B;
    color: #fff;
    border: 1px solid #551A8B;
    box-shadow: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    opacity: .8;
    transition: opacity .4s ease;

    &:hover {
      opacity: 1;
      transition: opacity .4s ease;
    }

    &.disabled { opacity: .4; cursor: not-allowed }
  }
`;


class Register extends Component {
  state = {email: '', password: '', repeat_password: '', email_ok: null, password_ok: null};

  verifyEmail = (e) => {
    if(this.state.email !== ''){
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:8080/v1/user/verify-email/', true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify({email: this.state.email}));
      xhr.onload = () => {
        if(xhr.status === 203){
          this.setState({email_ok: true});
        } else {
          this.setState({email_ok: false});
        }
      }
    } else {
      this.setState({email_ok: false});
    }
  }

  verifyPass = (e) => {
    if(
        (this.state.password === '' || this.state.repeat_password === '') || 
        (this.state.password !== this.state.repeat_password)
      ){
      this.setState({password_ok: false});
    } else {
      this.setState({password_ok: true});
    }
  }

  submitForm = (e) => {
    e.preventDefault();

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/v1/user/register/', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({email: this.state.email, password: this.state.password}));
    xhr.onload = () => {
      if(xhr.status === 201){
        localStorage.setItem('session', xhr.responseText);
        document.location.href = '/dashboard';
      }
    }
  }

  handleEmailChange = (e) => this.setState({email: e.target.value});
  handlePassChange = (e) => this.setState({password: e.target.value});
  handleRepeatPassChange = (e) => this.setState({repeat_password: e.target.value});
  
  render() {
    return (
      <Main>
        <div>
          <p>2019 - Henrique Ferreira</p>
        </div>
        <div>
          <Form onSubmit={this.submitForm} method="POST">
            <h2>Register</h2>
            <div>
              <label>Email</label>
              <input type="email" value={this.state.email} onChange={this.handleEmailChange} onBlur={this.verifyEmail} required />
            </div>
            <div>
              <label>Password</label>
              <input type="password" value={this.state.password} onChange={this.handlePassChange} required />
            </div>
            <div>
              <label>Repeat Password</label>
              <input type="password" value={this.state.repeat_password} onChange={this.handleRepeatPassChange} onBlur={this.verifyPass} required />
            </div>
            <button className={(!this.state.email_ok || !this.state.password_ok)? 'disabled': ''}>Register</button>
          </Form>
        </div>
      </Main>
    )
  }
}

export default Register;
