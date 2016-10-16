import _ from 'lodash';
import { FIELDS } from '../components/fields/Auction';
import { connect } from 'react-redux';
import { reduxForm, Fields, Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { END_POINT, renderField, Uploader, TextField, MultiTextFields, TextArea } from '../components/Inputs';
import React, { Component, PropTypes } from 'react';
import * as actionCreators from '../actions/ImageActions';


const validate = (values) => {
  const errors = {};
  _.each(FIELDS, (type, field) => {
    if(!values[field]) {
      errors[field] = `${field} is blank`;
    }
  });

  return errors;
}

@connect((state) => {
  return {
    images: state.Images
  };
}, dispatch => (bindActionCreators(actionCreators, dispatch)))

@reduxForm({
  form: 'new-auction',
  validate
})

export default class AddAuction extends Component {
  submitAuction(props) {
    let body = new FormData();
    let { images } = props;
    _.each(props, (value, key) => {
      body.append(key, value);
    });

    fetch(`${END_POINT()}/auction`, {
      method: 'POST',
      body,
    })
      .then((res) => {
        return res.json();
      })
      .then(body => console.log(body))
      .catch(err => console.log(err));

  }
  render() {
    let { props } = this;
    let { handleSubmit, pristine, submitting, reset } = props;
    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <form onSubmit={handleSubmit((props) => { this.submitAuction(props) } )}>
            <Field name="images" component={Uploader} {...props} />
            <Field name="name" component={ TextField } {...props}/>
            <Fields names={['minBid', 'startDate', 'endDate']} component={MultiTextFields} />
            <Field name="description" component={ TextArea } {...props}/>
            <button className="btn btn-default btn-block" disabled={submitting}>Create</button>
          </form>
        </div>
      </div>
    );
  }
}
