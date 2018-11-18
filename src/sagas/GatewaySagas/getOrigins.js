import { call, put } from 'redux-saga/effects';
import gatewayActions from '../../redux/gateway';
import apiActions from '../../redux/api';

export default function* create(api, { origin }) {
  const response = yield call(() => api.getOrigins(origin));

  if (response.ok) {
    yield [
      put(gatewayActions.getOriginsSuccess(response.data)),
      put(apiActions.apiSuccess()),
    ];
  } else {
    yield put(apiActions.apiFail(response.problem));
  }
}