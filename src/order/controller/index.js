'use strict';

import Base from './base.js';

export default class extends Base {
  indexAction(){
    let data = 'order-model';
    this.success(data);
  }
  /**
   * saveOrder
   * 保存菜单
   */
  async saveorderAction(){
    let param    = this.post();
    let orderModel = this.model('order');
    if (!param.date || !param.data) {
      this.fail(1001, 'some params is needed');  
    }
    let params = {
      date      : param.date,
      data      : param.data,
      type      : param.type || 'test'
    };
    let insertId = await orderModel.add(params)
    this.success({result: true, data: insertId})
  }
  /**
   * getAppRecord Action 获取应用数据记录
   * @return {Promise} []
   */
  async getallAction(){
  	let orderModel = this.model('order');
    let param    = this.get();
    let query_str = {};
    if (param.date) {
      query_str.date = param.date;
    }
    if (param.type) {
      query_str.type = param.type;
    }
  	let data = await orderModel.where(query_str).select();
  	this.success({result:true,data: data});
  }
}