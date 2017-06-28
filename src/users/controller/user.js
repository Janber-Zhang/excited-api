'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * 注册用户
   * 
   */
  async addAction(){
  	let param = this.post();
  	let usersModel = this.model('users');
  	if (!param.account || !param.password || !param.nickname) {       //注册信息不全，返回错误信息
  		this.fail(1000, 'someInfo required is not exist');
  		return
  	}
    let data_exist = await usersModel.where({account: param.account}).find();
    if(think.isEmpty(data_exist)){
    	let user = await usersModel.addUser(param);
    	this.session('userInfo',user);
    	this.success({userInfo:user,result:true});
    } else {
    	this.fail(1001, 'this account is exist');                    //该账号已被注册
    }
  }
  /**
   * 检测帐号是否已存在
   *
   */
  async checkexistAction(){
  	let account = this.get('account');
  	let usersModel = this.model('users');
  	let data_exist = await usersModel.where({account: account}).find();
  	if (think.isEmpty(data_exist)) {
  		this.success({result: true});
  	} else {
  		this.success({result: false});
  	}
  }
  /**
   * 登录
   *
   */
  async loginAction(http){
  	console.log(http.session('userInfo'));
  	let param = this.post();
  	let usersModel = this.model('users');
  	let data_exist = await usersModel.where({account: param.account, password: param.password}).find();
  	if (!think.isEmpty(data_exist)) {
  		console.log(data_exist)
  		await http.session('userInfo', data_exist);
  		this.success({result: true});
  	} else {
  		this.success({result: false});
  	}
  }

}