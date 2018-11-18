import React from 'react';

class Gateway extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originSchool: '',
      destinationSchool: '',
    }
  }

  render() {
    return (
      <h1>
        Hi from Gateway
      </h1>
    )
  }
};

export default Gateway;
