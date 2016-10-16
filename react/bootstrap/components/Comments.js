import React, { Component } from 'react';

export default class Comments extends Component {
  render() {
    return(
      <div className="panel-footer">
        <div class="media">
          <div class="media-left">
            <a href="#">
              <img class="media-object" src="https://dummyimage.com/64x64/#f1f1f/fff" alt="..." />
            </a>
          </div>
          <div class="media-body">
            <p style={ { fontSize: '12px'} }><a href="#">
              <strong>Wailhix</strong></a> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus. <span>5 hours ago</span></p>
          </div>
        </div>
      </div>
    );
  }
}