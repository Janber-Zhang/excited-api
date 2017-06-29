'use strict';

export default class extends think.controller.base {
  /**
   * 登录验证
   */
  async __before(){
  	let http = this.http;
  	if(http.controller === 'user' && ['login','add','checkexist'].indexOf(http.action) > -1){
      return;   
    }
    let userInfo = await this.session('userInfo');
    console.log(userInfo);
    if(think.isEmpty(userInfo)){
      console.log('need login')
    	return this.fail(1111, 'need login');
    }
    return
  }
}