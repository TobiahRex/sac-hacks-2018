import React from 'react';
import { connect } from 'react-redux';
import apiActions from '../../redux/api';
import gatewayActions from '../../redux/gateway';


class Gateway extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originSchool: 'Diablo Valley College',
      destinationSchool: 'UC Berkeley',
    };
  }

  render() {
    const {
      originSchool,
      destinationSchool
    } = this.state;

    return (
      <pre>
        Origin School: {originSchool} <br />
        destination School: {destinationSchool}
      </pre>
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
