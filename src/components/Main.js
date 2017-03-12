require('normalize.css/normalize.css');
require('styles/App.css');
import React from 'react';
import FlexBox from './FlexBox.js'
class AppComponent extends React.Component {

  render() {
    return (
        <FlexBox />
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
