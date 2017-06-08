// @flow

import React from 'react';
import * as Bootstrap from 'reactstrap';

import label from '../../helpers/label';

class NoteNameComponent extends React.Component {
  render() {
    return (
      <Bootstrap.Button
        size="sm"
        active={this.props.active}
        onClick={this.props.selectNoteName.bind(undefined, this.props.name)}
        style={styles.button}>
        {label(this.props.name)}
        <sub>{label(this.props.alt)}</sub>
      </Bootstrap.Button>
    );
  }
}

NoteNameComponent.propTypes = {
  name  : React.PropTypes.string.isRequired,
  active: React.PropTypes.bool,

  selectNoteName: React.PropTypes.func.isRequired
};

const styles = {
  button: {
    boxSizing: 'border-box',
    flex     : 1,
    height   : 60,
    margin   : '0 2px'
  }
};

export default NoteNameComponent;

