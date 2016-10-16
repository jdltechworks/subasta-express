import React, { Component } from 'react';
import { render } from 'react-dom';
import Root from './bootstrap';
import eq from 'lodash/eq';
render(<Root />, document.getElementById('app'));

if(eq(process.env.NODE_ENV, 'development')) {
  module.hot.accept();
}