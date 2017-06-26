'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    let data = 'users-model';
    this.success(data);
  }
  addAction(){
    let data = 'users-model-add';
    this.success(data);
  }
}