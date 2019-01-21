import React, { Component } from 'react';
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
  }
`;

class Login extends Component {
  state = {email: '', password: ''};

  submitForm = (e) => {
    e.preventDefault();

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/login/', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(this.state));
    xhr.onload = () => {
      console.log(xhr.responseText);
      // document.location.reload();
    }
  }

  handleEmailChange = (e) => this.setState({email: e.target.value});
  handlePassChange = (e) => this.setState({password: e.target.value});

  render() {
    return (
      <Main>
        <div>
          <p>2019 - Henrique Ferreira</p>
        </div>
        <div>
          <Form onSubmit={this.submitForm} method="POST">
            <h2>Login</h2>
            <div>
              <label>Email</label>
              <input type="email" value={this.state.email} onChange={this.handleEmailChange} required />
            </div>
            <div>
              <label>Password</label>
              <input type="password" value={this.state.password} onChange={this.handlePassChange} required />
            </div>
            <button>Login</button>
          </Form>
        </div>
      </Main>
    )
  }
}

export default Login;
