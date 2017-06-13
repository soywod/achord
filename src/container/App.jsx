// @flow

import React from 'react';
import {Container} from 'reactstrap';

import Navbar from '../navigation/Navbar';

class AppContainer extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>

        <Container>
          {this.props.children}
        </Container>
      </div>
    )
  }
}

export default AppContainer;

