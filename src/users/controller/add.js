'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * add action
   * @return {Promise} []
   */
  addAction(){
    let data = 'users-model-add';
    this.success(data);
  }
}