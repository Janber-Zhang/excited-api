'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * addRecord Action 添加用户应用信息
   * @return {Promise} []
   */
  async addrecordAction(){
    let param    = this.post();
  	let appModel = this.model('smartapps');
  	let userModel= this.model('users');
  	let ownerObj = await userModel.where({_id: param.current_user_id}).find();
    let app_name = param.app_name;
    let owner_id = param.current_user_id;
    delete param['current_user_id'];
    delete param['app_name'];
  	let params = {
  		app_name  : app_name,
  		owner     : owner_id,
  		nickname  : ownerObj.nickname,
  		created   : +(new Date()),
      data      : param
  	};
  	let insertId = await appModel.add(params)
  	this.success({result:true,data: 'SUCCESS'});   
  }
  /**
   * getAppRecord Action 获取应用数据记录
   * @return {Promise} []
   */
  async getapprecordAction(){
  	let param = this.get();
  	let appModel = this.model('smartapps');
  	let data = await appModel.where({app_name: param.app_name}).select();
  	let data_new = {};
    // 扫雷特殊处理
  	if (param.app_name == 'mineSweeper'){
  		data.forEach(function(item){
  			data_new[item.data.type] = data_new[item.data.type] || {dataList:[],myOrder: false};
  			data_new[item.data.type]['dataList'].push(item);
  		});
  		for (let i in data_new) {
  			let foundMyId = false;
  			data_new[i]['dataList'].sort(function(left, right){
  				return left.data.mine_record<right.data.mine_record?-1:1
  			});
  			data_new[i]['dataList'].forEach(function(item, index){
  				if (item.owner == param.current_user_id && !foundMyId) {
  					data_new[i].myOrder = index+1;
  					foundMyId = true;
  				}
  			});
  			data_new[i].counts = data_new[i]['dataList'].length;
  			if (data_new[i]['dataList'].length>10) {
  				data_new[i]['dataList'].length = 10;
  			}
  		}
  		if(!data_new['Lower']){
  			data_new['Lower'] = {dataList:[],myOrder: false,counts:0}
  		}
  		if(!data_new['Middle']){
  			data_new['Middle'] = {dataList:[],myOrder: false,counts:0}
  		}
  		if(!data_new['High']){
  			data_new['High'] = {dataList:[],myOrder: false,counts:0}
  		}
  	} else {
      data_new.dataList = data;
    }
  	this.success({result:true,data: data_new});
  }
}