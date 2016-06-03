import JSONAPIAdapter from 'ember-data/adapters/json-api';
import config from '../config/environment';

console.log(config);

export default JSONAPIAdapter.extend({
  namespace: 'api/v1',
  host: config.API_HOST
});
