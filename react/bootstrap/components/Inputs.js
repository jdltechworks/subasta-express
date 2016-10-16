import React from 'react';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import { Field } from 'redux-form';

export const END_POINT = () => {
  let api = '//localhost:8000/api'
  if(_.eq(process.env.NODE_ENV, 'production')) {
    api = '//subasta-jdltechworks.rhcloud.com/api';
  }
  return api;
}


/**
 * Must be binded inside a react render / component
 * @param  {object} fieldConfig configuration of the field that you declared in a react/redux form
 * @param  {string} field       name of the field
 * @return {react component}             return an html that is generated from react
 */
export const renderField = function(fieldConfig, field) {

  if(_.includes(['textarea', 'selectbox'], fieldConfig.tag)) {
    return ( 
      <Field key={field} name={field} component={(_field) => {
        let { meta, input } = _field;
        return (
        <div  className="form-group">
          <fieldConfig.tag {...input} className="form-control" placeholder={fieldConfig.label} />
          {meta.touched && meta.error ? <div>{meta.error}</div> : null}
        </div>
        );
      }} />
    );
  }
  if(_.eq(fieldConfig.type, 'file')) {
    const { uploadedFiles } = this.state;
    const { images, uploadImage } = this.props;
    return (
      <Field key={field} name={field} component={(_field) => {
        let { meta, input } = _field;
        return (<div className="form-group">
        <Dropzone name={field} multiple={true} onDrop={(file, e) => { 
          input.onChange('file');
          uploadImage(file);
        }} />
        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
        </div>);
      }} />
    );
  }
  return(
    <Field key={field} type={fieldConfig.type} name={field} component={TextField} label={fieldConfig.label} />
    );
};

export const Uploader = (field) => {
  let { array,
        name,
        uploadImage,
        images: { collection },
        input: 
        { 
          value,
          onChange
        }
      } = field;
      let wrap = _.chunk(_.clone(value), 12);
  return ( 
    <div>
      <Dropzone onDrop={(file, e) => {
        _.map(file, (_file, index) => {
          uploadImage(_file).then((images) => {
            let { fileName } = images;
            array.push(name, fileName);
          });
        });
      }} style={{ marginBottom: '2.5em', textAlign: 'center', background: '#f1f1f1', height: '120px', border: '1px solid #eee', width: '100%', display: 'block'}}>
      <span style={ {fontSize: '40px', color: '#ccc', lineHeight: '2.5'}  } className="glyphicon glyphicon-picture"></span>
      </Dropzone>
      <div className="container-fluid">
        {_.map(wrap, (row, key) => {
          return (<div className="row" key={key}>
          {_.map(row, (pic, index) => {
            let { host } = collection;
            if(host) {
              return( 
                <div className="col-md-1" key={index}>
                <div className="row">
                  <img 
                    style={{ width: '100.55px', height: '100.55px'}}
                    className="thumbnail img-responsive" src={`${host}/${pic}`} />
                </div>
                </div>
               );
            } else {
              return (<div key={index}></div>);
            }
          })}
          </div>);
        })}
      </div>
    </div>
  );
}

export const TextField = function(_field){
  let { meta, input, name } = _field;
  return (
    <div className="col-md-12">
      <div className="row">
        <div  className="form-group">
          <input {...input} className="form-control" placeholder={_.capitalize(name)}/>
          {meta.touched && meta.error ? <div>{meta.error}</div> : null}
        </div>
      </div>
    </div>
  );
}

export const TextArea = function(_field){
  let { meta, input, name } = _field;
  return (
    <div className="col-md-12">
      <div className="row">
        <div  className="form-group">
          <textarea {...input} rows="5" className="form-control" placeholder={_.capitalize(name)}/>
          {meta.touched && meta.error ? <div>{meta.error}</div> : null}
        </div>
      </div>
    </div>
  );
}

export const MultiTextFields = (_fields) => {
  let formFields = _.omit(_fields, ['images', 'name', 'names']);
  return (
    <div className="row">{
      _.map(formFields, (field, key) => {
      let { input, meta } = field;
      let { error, touched } = meta;
      let { name } = input;
      if(_.eq(key, 'minBid')) {
      return(
        <div className="col-md-4" key={key}>
          <div className="form-group">
            <input {...input} type="number" step="any" className="form-control" placeholder={_.capitalize(name)}/>
            {touched && error ? <div>{error}</div> : null}          
          </div>
        </div>
      );        
      } else {
        return(
          <div className="col-md-4" key={key}>
            <div className="form-group">
              <input {...input} className="form-control" placeholder={_.capitalize(name)}/>
              {touched && error ? <div>{error}</div> : null}          
            </div>
          </div>
        );
      }
  })}
  </div>);
}