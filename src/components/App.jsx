import React from 'react';
import { Container } from 'reactstrap';

import Navbar from './Navbar';

const App = props => (
  <div>
    <Navbar />

    <Container>
      {props.children}
    </Container>
  </div>
);

export default App;
