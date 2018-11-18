/* eslint-disable jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';
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

  renderOptions = (source, options) => options.map(({ name, code }, i) => (
    <MenuItem
      key={Buffer.from(`${code}${i}`, 'utf8').toString('base64')}
      onClick={() => this.handleOnChange({
        state: {
          [source]: code,
          [`${source}Name`]: name,
        },
        source,
      })}
    >
      {name}
    </MenuItem>));

    // {/* <option key={Buffer.from(`${code}${i}`, 'utf8').toString('base64')} value={code}>
    //   {name}
    // </option>)); */}
  // renderOptions = options => options.map(({ name, code }, i) => (
  //   <option key={Buffer.from(`${code}${i}`, 'utf8').toString('base64')} value={code}>
  //     {name}
  //   </option>));

    handleOnChange = ({ state, source }) => {
      const { redux } = this.props;
      const { origin, destination } = this.state;

      let apiQuery = () => {};

      switch (source) {
        case 'origin': apiQuery = () => redux.getDestinationCodes(state.origin); break;
        case 'destination': apiQuery = () => redux.getMajorCodes(origin, state.destination); break;
        case 'major': apiQuery = () => redux.getCourses(origin, destination, state.major); break;
        default: break;
      }

      this.setState(state, () => {
        apiQuery();
      });
    };

    render() {
      const {
        origin,
        originName,
        destination,
        destinationName,
        major,
        majorName,
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
        <div style={{
          width: '100%',
          minHeight: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
            <h3>My Current School</h3>
            <DropdownButton
              bsStyle="primary"
              bsSize="large"
              title={originName || 'Choose College'}
              key="origin-cologe-button"
              id="dropdown-basic-origin"
            >
              {origins.length ? this.renderOptions('origin', origins) : ''};
            </DropdownButton>
          </div>
          <br />
          <div style={{
            marginTop: 80,
            display: 'flex',
            justifyContent: 'space-around',
            width: '80%',
          }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 190,
            }}
            >
              <h3>I know where I want to transfer</h3>
              <DropdownButton
                bsStyle="primary"
                bsSize="large"
                title={destinationName || 'Choose University'}
                key="origin-cologe-button"
                id="dropdown-basic-origin"
              >
                {destinations.length ? this.renderOptions('destination', destinations) : ''};
              </DropdownButton>
              <p>Choose a transfer school to show a list of majors</p>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 190,
            }}
            >
              <h3>I know what I want to study</h3>
              <DropdownButton
                bsStyle="primary"
                bsSize="large"
                title={majorName || 'Choose A Major'}
                key="origin-cologe-button"
                id="dropdown-basic-origin"
              >
                {majors.length ? this.renderOptions('major', majors) : ''};
              </DropdownButton>
              <p>
                Choose a major to show a list of Universities
              </p>
            </div>
          </div>
          <br />
          <br />
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
