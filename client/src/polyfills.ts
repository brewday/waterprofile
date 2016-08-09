import 'core-js/es6';
import 'core-js/es7/reflect';
import 'ts-helpers';
require('zone.js/dist/zone');

if (IS_DEV) {
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
