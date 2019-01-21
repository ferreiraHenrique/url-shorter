import React, { Component } from 'react';
import styled from "styled-components";

const ContainerCounter = styled.div`
  grid-column: 4;

  > div {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;

    background: #551A8B;
    color: #fff;
    font-weight: bold;
    font-size: 20px;

    > div {
      padding: 20px;
      border-right: 1px solid #fff;
    }
  }

  h2 {
    letter-spacing: 3px;
    text-transform: uppercase;
    opacity: .6;
    font-size: 16px;
  }

  h2::after {
    content: '';
    height: 2px;
    width: 48px;
    display: block;
    background: #551A8B;
  }
`;

class Counter extends Component {
  state = { quantity: 0 }

  componentDidMount = () => {
    
  }

  render() {
    return (
      <ContainerCounter>
        <h2>URLS INSERTED</h2>

        <div>
          <div>{this.props.quantity.toString()[this.props.quantity.toString().length - 4] | 0}</div>
          <div>{this.props.quantity.toString()[this.props.quantity.toString().length - 3] | 0}</div>
          <div>{this.props.quantity.toString()[this.props.quantity.toString().length - 2] | 0}</div>
          <div>{this.props.quantity.toString()[this.props.quantity.toString().length - 1] | 0}</div>
        </div>
      </ContainerCounter>
    )
  }
}

export default Counter;
