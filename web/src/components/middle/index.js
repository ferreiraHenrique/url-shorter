import React, { Component } from 'react'
import styled from "styled-components";

import Counter from "../counter";
import AuthBox from "../authbox";

const Main = styled.div`
  display: grid;
  grid-template-columns: 5vw 25vw 25vw 25vw 5vw;
  grid-column-gap: 20px;
  grid-row-gap: 40px;
  margin-top: 40px;
  align-items: center;
`;

const List = styled.div`
  grid-column: ${props => props.column};

  h2 {
    letter-spacing: 3px;
    text-transform: uppercase;
    opacity: .6;
    font-size: 16px;
  }

  h2::after {
    content: '';
    height: 2px;
    width: 46px;
    display: block;
    background: #551A8B;
  }

  ul {
    padding: 0;

    li { list-style: none; padding: 7px 0; }
    a { 
      text-decoration: none; 
      color: #551A8B;
      opacity: .7;
      transition: opacity .4s ease;

      &:hover { opacity: 1; transition: opacity .4s ease; }
    }
  }
`;

class Middle extends Component {
  state = {host: ''}

  componentWillMount = () => {
    this.setState({host: window.location.host});
  }

  render() {
    return (
      <Main>
        <List column="2">
          <h2>Last Inserted</h2>

          <ul>
            {
              this.props.last_five.map((el, i) => {
                return (
                  <li key={i}>
                    <a href={'/'+el.short} rel="noopener noreferrer" target="_blank">short/{el.short}</a>
                  </li>
                )
              })
            }
          </ul>
        </List>

        <List column="3">
          <h2>Most Accessed</h2>

          <ul>
            {
              this.props.most_accessed.map((el, i) => {
                return (
                  <li key={i}>
                    <a href={'/'+el.short} rel="noopener noreferrer" target="_blank">short/{el.short}</a>
                  </li>
                )
              })
            }
          </ul>
        </List>

        {/* <AuthBox /> */}

        <Counter quantity={this.props.quantity} />
      </Main>
    )
  }
}

export default Middle;
