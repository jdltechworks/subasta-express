import _ from 'lodash';
import { reduxForm } from 'redux-form';
import { LOGIN } from '../fields/login';
import { END_POINT, renderField } from '../helpers';
import React, { Component, PropTypes } from 'react';


const validate = (values) => {
  const errors = {};
  _.each(LOGIN, (type, field) => {
    if(!values[field]) {
      errors[field] = `${field} is blank`; 
    }
  });

  return errors;
}

@reduxForm({
  form:'login',
  validate
})


export default class Login extends Component {
  submitLogin(props) {
    console.log(props);
  }
  render() {
    let { handleSubmit } = this.props;
    return (
      <section className="login clearfix" style={{ paddingTop: '10%' }}>
        <div className="col-md-4 col-md-offset-4">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <form onSubmit={handleSubmit((props) => {this.submitLogin(props)})}>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3>Log in to your account</h3>
                </div>
                <div className="panel-body">
                <br />
                {_.map(LOGIN,renderField.bind(this))}
                <button className="btn btn-info">Login</button>
                </div>
                <br />
                <div className="panel-footer text-right">
                  <h4>New to Subasta? <a href="#">Sign-up</a></h4>
                </div>
              </div>
            </form>
          </div>
        </div>
        </div>
      </section>
      )
  }
}