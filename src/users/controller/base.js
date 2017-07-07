'use strict';

export default class extends think.controller.base {
  /**
   * 用户信息验证
   */
  async __before(){
  	let http = this.http;
    let current_user_id = this.post('current_user_id') || this.get('current_user_id');
  	if(http.controller === 'user' && ['login','add','checkexist'].indexOf(http.action) > -1){
      return;   
    }
    if(!current_user_id){
    	return this.fail(1111, 'need login');
    }
    return
  }
}