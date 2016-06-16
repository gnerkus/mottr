export function initialize (container, app) {
  app.inject('controller', 'variables', 'service:variables');
}

export default {
  name: 'game',
  initialize: initialize
};
