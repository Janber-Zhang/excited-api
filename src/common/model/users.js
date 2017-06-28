'use strict';
/**
 * model
 */
export default class extends think.model.mongo {
	addUser(user) {
		const default_ = {
			nickname      :    '',
			account       :    '',
			password      :    '',
			avatar        :    [],
			introduction  :    '这个人很懒，什么也没写。。。',
		}
		let USER = {};
		Object.assign(USER, default_, user);
        let ret  = this.add(USER);
        return USER;
    }
}