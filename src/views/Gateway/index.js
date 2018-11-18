/* eslint-disable jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import apiActions from '../../redux/api';
import gatewayActions from '../../redux/gateway';

const { arrayOf, any, shape, string, number, bool, func } = PropTypes;

class Gateway extends React.Component {
  static propTypes = {
    showNotification: func.isRequired,
    courses: arrayOf(any),
    origins: arrayOf(
      shape({
        code: string,
        name: string,
      })
    ),
    destinations: arrayOf(
      shape({
        code: string,
        name: string,
      })
    ),
    majors: arrayOf(
      shape({
        code: string,
        name: string,
      })
    ),
    apiStatus: shape({
      error: string,
      count: number,
      fetching: bool
    }).isRequired,
    redux: shape({
      fetching: func.isRequired,
      getOriginCodes: func.isRequired,
      getDestinationCodes: func.isRequired,
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
      origin: '',
      destination: '',
      major: '',
      // destinationSchool: 'UC Berkeley',
    };
  }

  renderOptions = options => options.map(({ name, code }, i) => (
    <option key={Buffer.from(`${code}${i}`, 'utf8').toString('base64')} value={code}>
      {name}
    </option>));

    handleOnChange = e => {
      const caller = e.target.name;
      const callerValue = e.target.value;
      const { redux } = this.props;
      const { origin, destination, major } = this.state;
      let apiQuery = () => {};

      switch (caller) {
        case 'origin': apiQuery = () => redux.getDestinationCodes(callerValue); break;
        case 'destination': apiQuery = () => redux.getMajorCodes(origin, destination); break;
        case 'major': apiQuery = () => redux.getCourses(origin, destination, major); break;
        default: break;
      }

      this.setState({
        [e.target.name]: e.target.value,
      }, () => {
        apiQuery();
      });
    };

    render() {
      const {
        origin,
        destination,
        major,
        // courses
        // destinationSchool
      } = this.state;

      const {
        courses,
        origins,
        destinations,
        majors,
      } = this.props;

      return (
        <div>
          <div>
            <DropdownButton
              bsStyle="primary"
              title="Your Current College"
              key="origin-cologe-button"
              id="dropdown-basic-origin"
            >
              <MenuItem eventKey="1">Action</MenuItem>
              <MenuItem eventKey="2">Another action</MenuItem>
              <MenuItem eventKey="3" active>
                Active Item
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">Separated link</MenuItem>
            </DropdownButton>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
                <option value="select">select</option>
                <option value="other">...</option>
              </FormControl>
            </FormGroup>
          </div>
          <div className="prefecture-section__container">
            <label className="form__label" htmlFor="Prefecture">
              Your Current College
              <strong className="label__asterisk">*</strong>
            </label>
            <select
              name="origin"
              onChange={this.handleOnChange}
            >
              <option value="">Choose A College</option>
              {origins.length ? this.renderOptions(origins) : ''};
            </select>
          </div>
          <br />
          <div className="prefecture-section__container">
            <label className="form__label" htmlFor="Prefecture">
              Your Transfer University
              <strong className="label__asterisk">*</strong>
            </label>
            <select
              name="destination"
              onChange={this.handleOnChange}
            >
              <option value="">Choose A University</option>
              {destinations.length ? this.renderOptions(destinations) : ''};
            </select>
          </div>
          <br />
          <div className="prefecture-section__container">
            <label className="form__label" htmlFor="Prefecture">
              Your Desired Major
              <strong className="label__asterisk">*</strong>
            </label>
            <br />
            <select
              name="major"
              onChange={this.handleOnChange}
            >
              <option value="">Choose A Major</option>
              {majors.length ? this.renderOptions(majors) : ''};
            </select>
          </div>
          <br />
          <pre id="result">
            Origin: {origin}
            <br />
            Destination: {destination}
            <br />
            Major: {major}
            <br />
            Courses: {courses}
          </pre>
        </div>
      );
    }
}

export default connect(
  ({ api: apiStatus, gateway }) => ({
    apiStatus,
    origins: [...gateway.origins],
    destinations: [...gateway.destinations],
    majors: [...gateway.majors],
  }),
  dispatch => ({
    redux: {
      fetching: () => dispatch(apiActions.fetching()),
      getOriginCodes: () => dispatch(gatewayActions.getOriginCodes()),
      getDestinationCodes: origin => dispatch(gatewayActions.getDestinationCodes(origin)),
      getMajorCodes: (origin, destination) => dispatch(gatewayActions.getMajorCodes(origin, destination)),
      getCourses: (codes) => dispatch(gatewayActions.getCourses(codes.origin, codes.destination, codes.gpa)),
    },
  })
)(Gateway);
/*
Control Flow:
1. call getOrigins,
2. saga calls the api.
3. saga calls getOriginsSuccess
4. call getdestinations,
5. saga calls the api.
6. saga calls getDestinationsSuccess
7. call getCourses
8. saga calls api.
9. saga calls getCoursesSuccess
10. redirect page.

*/
