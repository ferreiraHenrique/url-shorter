import React, { Component } from 'react';
import styled from "styled-components";

const Box = styled.div`
  h2 {
    letter-spacing: 3px;
    text-transform: uppercase;
    opacity: .6;
    font-size: 16px;
  }

  h2::after {
    content: '';
    height: 2px;
    width: 60px;
    display: block;
    background: #551A8B;
  }

  > div {
    display: grid;
    grid-row-gap: 15px;

    a {
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
  }
`;

class AuthBox extends Component {
  render() {
    return (
      <Box>
        <h2>Login & Register</h2>

        <div>
          {/* <button onClick={() => {}}>Login</button> */}
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </Box>
    )
  }
}

export default AuthBox;
