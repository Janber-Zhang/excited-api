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
    	this.success({result:true,user:user});                    //注册成功，返回用户信息
    } else {
    	this.fail(1001, 'this account is exist');                 //该账号已被注册
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
  		this.success({result: true,user:data_exist});
  	} else {
  		this.success({result: false});
  	}
  }
  /**
   * 获取用户信息
   *
   */
  async getuserinfoAction(){
    let usersModel = this.model('users');
    let user_id = this.get('current_user_id')
    let userInfo = await usersModel.where({_id: user_id}).find();
    this.success({user: userInfo});
    
  }
  /**
   * 编辑用户信息
   *
   */
  async updateAction(){
    let param = this.post(),
        user = JSON.parse(param.user);
        console.log(user)
        console.log('####')
    let usersModel = this.model('users'),
        condiction = {_id: user._id},
        new_info = {
          nickname   : user.nickname, 
          user_id    : user._id,
          avatar     : user.avatar || [],
          sex        : user.sex,
          introduction:user.introduction
        }
        console.log(new_info)
        console.log(condiction)
    await usersModel.where(condiction).update(new_info);
    this.success({result: true});
  }

}