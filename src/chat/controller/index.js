'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * 保存聊天记录
   * @return {Promise} []
   */
   async storemsgAction(){
   	let param    = this.post();
   	let chatMsgModel = this.model('chat');
   	let params = {
   		user_id : param.current_user_id,
   		user    : JSON.parse(param.user),
   		msg     : param.msg,
   		room_id : param.room_id,
   		created : +(new Date()) 
   	}
   	let insertId = await chatMsgModel.add(params);
   	this.success({result:true,data: 'SUCCESS'});   
   }

  /**
   *
   *
   */
   async getmsgAction(){
   	let param        = this.get();
   	let chatMsgModel = this.model('chat');
   	let room_id      = param.room_id;
   	let msgList      = await chatMsgModel.where({room_id: room_id}).select();
   	this.success({result:true,data: msgList});
   }
 }