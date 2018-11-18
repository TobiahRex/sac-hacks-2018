/* eslint-disable jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectValidation from 'react-validation/build/select';
import apiActions from '../../redux/api';
import gatewayActions from '../../redux/gateway';

const { arrayOf, any, shape, string, number, bool, func } = PropTypes;

class Gateway extends React.Component {
  static propTypes = {
    showNotification: func.isRequired,
    courses: arrayOf(any),
    origins: arrayOf(string),
    destinations: arrayOf(string),
    majors: arrayOf(string),
    apiStatus: shape({
      error: string,
      count: number,
      fetching: bool
    }).isRequired,
    redux: shape({
      fetching: func.isRequired,
      getOrigins: func.isRequired,
      getDestinations: func.isRequired,
      getCourses: func.isRequired
    }).isRequired
  };
  static defaultProps = {
    courses: [],
    origins: [],
    destinations: [],
    majors: [],
  };
  constructor(props) {
    super(props);

    this.state = {
      originSchool: 'Diablo Valley College',
      // destinationSchool: 'UC Berkeley',
    };
  }

  renderOptions = options => options.map(({ name, code }) => (
    <option key={Buffer.from(code, 'utf8').toString('base64')} value={name} dataCode={code}>
      {name}
    </option>));

  render() {
    const {
      originSchool,
      // destinationSchool
    } = this.state;

    const {
      courses,
      origins: originSchools,
      destinations: destinationSchools,
      majors: destinationMajors,
    } = this.props;

    return (
      <div>
        <div className="prefecture-section__container">
          <label className="form__label" htmlFor="Prefecture">
            Your Current College
            <strong className="label__asterisk">*</strong>
          </label>
          <SelectValidation
            errorClassName="form__error-blurb"
            name="Origin School"
            containerClassName="container__text-field"
            validations={['required']}
            value={originSchool}
            onChange={this.handleOnChange}
          >
            <option value="">Choose A College</option>
            {this.renderOptions(originSchools)};
          </SelectValidation>
        </div>
        <br />
        <div className="prefecture-section__container">
          <label className="form__label" htmlFor="Prefecture">
            Your Transfer University
            <strong className="label__asterisk">*</strong>
          </label>
          <SelectValidation
            errorClassName="form__error-blurb"
            name="Origin School"
            containerClassName="container__text-field"
            validations={['required']}
            value={originSchool}
            onChange={this.handleOnChange}
          >
            <option value="">Choose A University</option>
            {this.renderOptions(originSchools)};
          </SelectValidation>
        </div>
        <br />
        <div className="prefecture-section__container">
          <label className="form__label" htmlFor="Prefecture">
            Your Desired Major
            <strong className="label__asterisk">*</strong>
          </label>
          <SelectValidation
            errorClassName="form__error-blurb"
            name="Origin School"
            containerClassName="container__text-field"
            validations={['required']}
            value={originSchool}
            onChange={this.handleOnChange}
          >
            <option value="">Choose A Major</option>
            {this.renderOptions(originSchools)};
          </SelectValidation>
        </div>
        <br />
        <pre id="result">{courses}</pre>
      </div>
    );
  }
}

export default connect(
  ({ api: apiStatus }) => ({
    apiStatus,
  }),
  dispatch => ({
    redux: {
      fetching: () => dispatch(apiActions.fetching()),
      getOrigins: () => dispatch(gatewayActions.getOrigins()),
      getDestinations: origin => dispatch(gatewayActions.getDestinations(origin)),
      getCourses: (codes) => dispatch(gatewayActions.getCourses(codes.origin, codes.destination, codes.gpa)),
    },
  })
)(Gateway);
/*
Control Flow:
1. call getOrigins,
2. saga calls the api.
3. saga calls getOriginsSuccess
4. call getDestinations,
5. saga calls the api.
6. saga calls getDestinationsSuccess
7. call getCourses
8. saga calls api.
9. saga calls getCoursesSuccess
10. redirect page.

*/
