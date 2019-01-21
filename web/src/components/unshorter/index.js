import React, { Component } from 'react';
import styled from 'styled-components';

import Top from '../top';
import Footer from '../footer';

const Main = styled.div`
  display: grid;
  grid-template-rows: auto calc(100vh - 52px - 52px) auto;
`;


class Unshorter extends Component {
  componentDidMount = (el) => {
    const aux = document.location.href.split('/');
    const short = aux[aux.length - 1];
    
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', `http://localhost:8080/v1/url/${short}/`);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = () => {
      if(xhr.status === 200){
        const resp = JSON.parse(xhr.responseText);

        document.location.href = resp.long;
      }
    }
    xhr.send();
  }

  render() {
    return (
      <Main>
        <Top text="Decoding URL" />
        <div></div>
        <Footer></Footer>
      </Main>
    )
  }
}

export default Unshorter;
