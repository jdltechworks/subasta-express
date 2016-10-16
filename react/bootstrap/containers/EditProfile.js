import _ from 'lodash';
import { USERFIELDS } from '../fields/user';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { END_POINT, renderField } from '../helpers';
import React, { Component, PropTypes } from 'react';
import * as actionCreators from '../actions/ImageActions';

const validate = (values) => {
  const errors = {};
  _.each(USERFIELDS, (type, field) => {
    if(!values[field]) {
      errors[field] = `${field} is blank`; 
    }
  });

  return errors;
}

@reduxForm({
  form: 'edit-profile',
  validate
})

export default class EditProfile extends Component {
  state = {
    files: [],
    uploadedFiles: []
  };
  componentDidUpdate() {
    let { uploadedFiles } = this.state;
    let { images: { payload } } = this.props;
    for(var i in payload) {
      uploadedFiles.push(payload[i]);
    }
    
    //uploadedFiles.push()
  }  
  render() {
    console.log("userfields = " + USERFIELDS);
    return(
      <form>
        <div className="panel panel-default">
          <div class="panel-heading"><h3>Edit Profile</h3></div>
          <div class="panel-body">
            {_.map(USERFIELDS, renderField.bind(this))}
            <button className="btn btn-info btn-block">Submit</button>
            <button type="button" className="btn btn-info btn-block" >Clear Values</button>
          </div>
        </div>
      </form>
      );
  }
}