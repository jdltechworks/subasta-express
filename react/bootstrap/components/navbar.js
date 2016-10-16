import React, { Component } from 'react';
import { Link } from 'react-router';

class Navbar extends Component {
  render() {
    return(
      <header>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#" style={ { marginRight: '10px' } } onClick={(e) => {
                  let { body } = document;
                  let { firstChild } = e.currentTarget;
                  e.preventDefault();
                  body.classList.toggle('menu-open');
                }}>
                <span className="glyphicon glyphicon-menu-hamburger" style={{fontSize: '13px'}}></span>
              </a>
              <a className="navbar-brand" href="#">Subasta</a>
            </div>

            <ul className="nav navbar-nav navbar-right">
              <li><a href="#"><span className="glyphicon glyphicon-user"></span>  <span>jdltechworks</span></a></li>
              <li><a href="#"><span className="glyphicon glyphicon-bell"></span></a></li>
              <li><a href="#"><span className="glyphicon glyphicon-envelope"></span></a></li>
              <li><a href="#"><span className="glyphicon glyphicon-cog"></span></a></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;