import React, { Component } from 'react'
import styled from 'styled-components';

import Top from '../top';
import Middle from '../middle';
import Footer from '../footer';

const Main = styled.div`
  display: grid;
  grid-template-rows: auto calc(100vh - 52px - 52px) auto;
`;


class Home extends Component {
  state = {
    all: [],
    last_five: [],
    most_accessed: [],
    quantity: 0
  }

  componentDidMount = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/v1/urls/home/', true);
    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);

      this.setState({
        last_five: resp.last_five? resp.last_five : [],
        quantity: resp.quantity,
        all: resp,
        most_accessed: resp.most_accessed? resp.most_accessed : []
      });
    }
    xhr.send();
  }

  render() {
    return (
      <Main>
          <Top all={this.state.all} show />
          <Middle last_five={this.state.last_five} quantity={this.state.quantity} most_accessed={this.state.most_accessed} />
          <Footer />
      </Main>
    )
  }
}

export default Home;
