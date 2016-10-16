import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Menu from '../components/menu';

/** @todo  user authentication check per role */
class App extends Component {
  render() {
    let { props } = this;
    return(
      <div className="page">
        <div className="page-inner">
          <Navbar {...props} />
          <Menu {...props} />
          <div className="wrapper">
            <div className="container-fluid">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
