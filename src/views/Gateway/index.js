import React from 'react';
import { connect } from 'react-redux';
import apiActions from '../../redux/api';
import gatewayActions from '../../redux/gateway';
import Validation from 'react-validation';


class Gateway extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originSchool: 'Diablo Valley College',
      destinationSchool: 'UC Berkeley',
    };
  }

  renderOptions = options => options.map(({ name, code }) => (
    <option key={Buffer.from(code, 'utf8').toString('base64')} value={name} dataCode={code}>
      {name}
    </option>));

  

    render() {
      const {
        originSchool,
        destinationSchool
      } = this.state;

      return (
        <div>
          <div className="prefecture-section__container">
            <label className="form__label" htmlFor="Prefecture">
              <IntlMsg id="checkout.shipping-address.prefecture" />&nbsp;
              <strong className="label__asterisk">*</strong>
            </label>
            <Validation.components.Select
              errorClassName="form__error-blurb"
              name="Origin School"
              containerClassName="container__text-field"
              validations={['required']}
              value={originSchool}
              onChange={this.handleOnChange}
              >
                <option value="">
                  <IntlMsg id="checkout.shipping-address.prefecture.choose" />
                </option>
                {
                  renderOptions(PrefectureConstants)
                };
              </Validation.components.Select>
            </div>
            <br/>
            <pre id="result" >

            </pre>
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
