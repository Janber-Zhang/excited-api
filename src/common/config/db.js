'use strict';
/**
 * db config
 * @type {Object}
 */
 export default {
  type: 'mongo',
  log_sql: true,
  log_connect: true,
  adapter: {
    mongo: {
      prefix: 'think_',
      database: 'excited',
      encoding: 'utf8',
      nums_per_page: 10,
      log_sql: true,
      log_connect: true,
      cache: {
        on: true,
        type: '',
        timeout: 3600
      }
    }
  }
};