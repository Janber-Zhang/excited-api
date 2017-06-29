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
    	await this.session('userInfo',user);
    	this.success({userInfo:user,result:true});
    } else {
    	this.fail(1001, 'this account is exist');                     //该账号已被注册
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
  async loginAction(){
  	let param = this.post();
  	let usersModel = this.model('users');
  	let data_exist = await usersModel.where({account: param.account, password: param.password}).find();
  	if (!think.isEmpty(data_exist)) {
  		await this.session('userInfo',data_exist);
  		this.success({result: true});
  	} else {
  		this.success({result: false});
  	}
  }
  /**
   * 登出
   *
   */
  async logoutAction(){
    let usersModel = this.model('users');
    await this.session();
    console.log(this.session('userInfo'))
    this.success({result: true});
  }
  /**
   * 获取用户信息
   *
   */
  async getuserinfoAction(){
    let usersModel = this.model('users');
    let session_ = await this.session('userInfo');
    let userInfo = await usersModel.where({account: session_.account}).find();
    this.success({data: userInfo});
    
  }
  /**
   * 编辑用户信息
   *
   */
  async updateAction(){
    let param = this.post();
    let usersModel = this.model('users'),
        condiction = {_id: param._id},
        new_info = {
          nickname   : param.nickname, 
          user_id    : param._id,
          avatar     : param.avatar || [],
          sex        : param.sex,
          introduction:param.introduction
        }
    await usersModel.where(condiction).update(new_info);
    this.success({data: true});
  }

}