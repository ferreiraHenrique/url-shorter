import React from 'react';
import styled from 'styled-components';

const ContainerFooter = styled.div`
  background: #551A8B;
  height: 52px;
  display: grid;
  align-items: center;

  p {
    text-align: center;
    color: #fff;
    font-size: 12px;
    margin: 0;
  }
`;

const Footer = () => {
  return (
    <ContainerFooter>
      <p>2019 - Henrique Ferreira</p>
    </ContainerFooter>
  )
}

export default Footer
