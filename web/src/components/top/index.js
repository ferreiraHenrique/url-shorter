import React, { Component } from 'react';
import styled from "styled-components";

const Nav = styled.nav`
  background: rgba(85, 26, 139, .6);
  padding: 20px 0 0 0;
  display: grid;
  grid-template-columns: 5vw 1fr 5vw;

  div {
    grid-column: 2;
    background: #fff;
    border: 1px solid #551A8B;
    height: 50px;
    margin-bottom: -20px;
    display: grid;
    grid-template-columns: 1fr auto;

    input {
      padding: 7px 15px;
      font-size: 16px;
    }

    button {
      background: #551A8B;
      color: #fff;
      border: 1px solid #551A8B;
      box-shadow: none;
      padding: 0 20px;
    }

    h2 {
      margin: 0;
      align-self: center;
      text-align: center;
      color: #551A8B;
    }
  }
`;

export default class Top extends Component {
  state = {
    to_short: '',
  };

  handleChange = (e) => {
    this.setState({to_short: e.target.value});
  }

  renderInput = () => {
    if(this.props.show){
      return (
        <div>
          <input placeholder="Paste an url here..." value={this.state.to_short} onChange={this.handleChange} />
          <button onClick={() => {
            if(this.state.to_short.length < 3){
              return false;
            }
            
            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:8080/v1/url/', true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify({long: this.state.to_short}));
            xhr.onload = () => {
              document.location.reload();
            }
          }}>SHORTEN</button>
        </div>
      )
    }

    return (
      <div>
        <h2>{this.props.text}</h2>
      </div>
    )
  }

  render() {
    return (
      <Nav>
        {this.renderInput()}
      </Nav>
    )
  }
}
