import _ from 'lodash';
import Dropzone from 'react-dropzone';
import { bindActionCreators } from 'redux';
import { domOnlyProps, END_POINT } from '../helpers';
import { Field, reduxForm } from 'redux-form';
import React, { Component, PropTypes } from 'react';

const FIELDS = {
  file: {
    type: 'Dropzone',
    label: 'upload label'
  }
};

const validate = (values) => {
  const errors = {};
  _.each(FIELDS, (type, field) => {
    if(!values[field]) {
      errors[field] = `${field} is blank`;
    }
  });

  return errors;
}

const renderField = (props) => {
  console.log(props);
  let noLabel = () => {
    let newProps = _.cloneDeep(props);

    delete newProps.label;

    return newProps;
  }


  let noType = _.omit(noLabel(), ['type', 'meta']);

  return (
      <div className="form-group">
        <label>{props.label}</label>
        <Dropzone onDrop={(data, e) => { props.input.onChange(data) }} multiple={true} {...domOnlyProps(noType)} />
        <div>{props.touched ? props.error : ''}</div>
      </div>
  );

};

const outputField = (fieldConfig, field) => {
  return <Field key={field} name={field} component={renderField} {...fieldConfig} />
};

@reduxForm({
  form: 'file-upload',
  fields: _.keys(FIELDS),
  validate
})

class Uploader extends React.Component {
  state = {
    files: []
  };
  upload(props){
    let { files } = this.state;
    console.log(props.file);
    for( var key in props.file) {
      files.push(props.file[key]);
    }
    this.setState({files});
  }
  render() {
    let { handleSubmit } = this.props;
    return(
      <div className="updloader">
        <form onSubmit={handleSubmit((props)=>{this.upload(props)})}>
          {_.map(FIELDS, outputField.bind(this))}
          <button className="btn btn-info">Uploader</button>
        </form>
        {this.props.children}
      </div>
    );
  }
}

export default Uploader;
