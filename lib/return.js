/**
 * Created with JetBrains WebStorm.
 * User: dev
 * Date: 06.12.12
 * Time: 12:54
 * To change this template use File | Settings | File Templates.
 */

var _ = require('underscore');

(function() {

	var root = this;
	var TYPE_ARRAY = 0, TYPE_OBJECT = 1, TYPE_LIST = 2, TYPE_NUMBER = 3;

	/**
	 * Monad constructor
	 * @param {*} obj object to wrap
	 * @constructor
	 */
	var Monad = function(obj) {
		this._wrapped = obj;
		this._pointer = null;
		this._lazy = [];
		switch (true) {
			case (_.isArray(obj)):
				this._type = TYPE_ARRAY;
				break;
			case (_.isObject(obj)):
				this._type = TYPE_OBJECT;
				break;
			case (_.isNumber(obj)):
				this._type = TYPE_NUMBER;
				this._mult = 1;
				break;
			case (_.isString(obj)):
				var body = this._wrapped.split('..');
				var fstNum = parseInt(body[0].substring(1, body[0].length));
				var sndNum = parseInt(body[1].substring(0, body[1].length-1));
				this._fstNum = fstNum;
				this._lstNum = sndNum;
				this._type = TYPE_LIST;
				break;
			default:
				throw new Error(obj + ': this object does not supported');
		}
	};

	Monad.prototype.init = function() {
		switch (this._type) {
			case TYPE_ARRAY: case TYPE_OBJECT:
			this._pointer = 0;
			break;
			case TYPE_LIST:
				if (this._fstNum > this._lstNum) {
					throw new Error("first number is less that second : " + this._fstNum + ' < ' + this._lstNum);
				}
				this._pointer = 0;
				break;
			case TYPE_NUMBER:
				this._pointer = 0;
				if (n) {
					this._mult = n;
				} else {
					this._mult = 1;
				}
				break;
			default:
				throw new Error("there is no method init for type: " + this._type);
		}
	};

	Monad.prototype.value = function() {
		switch (this._type) {
			case TYPE_ARRAY:
				if (this._pointer !== null) {
					if (this._pointer >= 0 && this._body.length > this._pointer) {
						return this._body[this._pointer];
					} else {
						throw new Error("pointer is out of range");
					}
				} else {
					throw new Error("pointer is null");
				}
				break;
			case TYPE_OBJECT:
				if (this._pointer !== null) {
					if (this._pointer >= 0 && Object.keys(this._body).length > this._pointer) {
						return this._body[Object.keys(this._body)[this._pointer]];
					} else {
						throw new Error("pointer is out of range");
					}

				} else {
					throw new Error("pointer is null");
				}
				break;
			case TYPE_LIST:
				if (this._pointer !== null) {
					if (this._pointer >= 0 && this._lstNum > this._pointer) {
						return this._fstNum + this._pointer;
					}
				} else {
					throw new Error("pointer is null");
				}
				break;
			case TYPE_NUMBER:
				if (this._pointer !== null) {
					return (this._body + this._pointer * this._mult);
				}
				break;
			default:
				throw new Error("there is no method value for type: " + this._type);
		}
	};

	Monad.prototype.next = function() {
		switch (this._type) {
			case TYPE_ARRAY:
				if (this._pointer !== null) {
					this._pointer += 1;
					if (this._pointer >= this._body.length) {
						this._pointer = null;
					}
					return this._pointer;
				} else {
					throw new Error("pointer is null");
				}
				break;
			case TYPE_OBJECT:
				if (this._pointer !== null) {
					this._pointer += 1;
					if (this._pointer >= Object.keys(this._body).length) {
						this._pointer = null;
					}
					return this._pointer;
				} else {
					throw new Error("pointer is null");
				}
				break;
			case TYPE_LIST:
				if (this._pointer !== null) {
					this._pointer += 1;
					if (this._pointer + this._fstNum - 1 >= this._lstNum) {
						this._pointer = null;
					}
					return this._pointer;
				} else {
					throw new Error("pointer is null");
				}
			case TYPE_NUMBER:
				if (this._pointer !== null) {
					this._pointer += 1;
					return this._pointer;
				} else {
					throw new Error("pointer is null");
				}
			default:
				throw new Error("there is no method next for type: " + this._type);
		}
	};

	Monad.prototype.forEach = function(func) {
		this.init();
		while (this._pointer !== null) {
			func(this.value());
			this.next();
		}
	};

	Monad.prototype.foldl = function(func, acc) {
		this.init();
		while (this._pointer !== null) {
			acc = func(acc, this.value());
			this.next();
		}
		return acc;
	};

	Monad.prototype.foldr = function(func, acc) {
		this.init();
		var rec = function(obj) {
			if (obj._pointer !== null) {
				var o = obj.value();
				obj.next();
				return func(o, rec(obj));
			} else {
				return acc;
			}
		}
		return rec(this);
	};

	Monad.prototype.mapNow = function(func) {
		var result = [];
		this.init();
		while (this._pointer !== null) {
			result.push(func(this.value()));
			this.next();
		}
		return result;
	};

	Monad.prototype.map = function(func) {
		this.init();
		this._lazy.push(func);
	};

	Monad.prototype.toArray = function() {
		var result = [];
		this.init();
		if (this._lazy.length === 0) {
			while (this._pointer !== null) {
				result.push(this.value());
				this.next();
			}
		} else {
			this._lazy.forEach(function(func) {

			});
		}
		return result;
	};

	Monad.prototype.check = function() {
		return this;
	};










	/**
	 * Wrap object to monad
	 * @param obj object to wrap
	 * @return {Monad}
	 */
	_.return = function(obj) {
		return new Monad(obj);
	};

	exports = module.exports = _;
	/*
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = _;
		}
	} else {
		if (root._) {
			_ = root._;
		} else {
			root._ = _ = {};
		}
	}
	*/
}).call(this);