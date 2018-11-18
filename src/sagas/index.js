import { takeLatest } from 'redux-saga/effects';
import API from '../services/API';

// ----- Sagas ----- //
// import GetAllThings from './ThingSagas/GetAllThings';
// import CreateThing from './ThingSagas/CreateThing';
// import EditThing from './ThingSagas/EditThing';
// import RemoveThing from './ThingSagas/RemoveThing';
import GetOriginCodes from './GatewaySagas/getOriginCodes';
import GetDestinationCodes from './GatewaySagas/getDestinationCodes';

// ----- Types ----- //
import { GatewayTypes } from '../redux/gateway';

const api = API.createAPI();

export default function* rootSaga() {
  yield [
    takeLatest(GatewayTypes.GET_ORIGIN_CODES, GetOriginCodes, api),
    takeLatest(GatewayTypes.GET_DESTINATION_CODES, GetDestinationCodes, api),
    // takeLatest(ThingTypes.REMOVE_THING, RemoveThing, api),
    // takeLatest(ThingTypes.EDIT_THING, EditThing, api)
  ];
}
