var _ = require('underscore');

(function() {

	var root = this;
	var TYPE_ARRAY = 0, TYPE_OBJECT = 1, TYPE_LIST = 2, TYPE_NUMBER = 3;

	/**
	 * Monad constructor
	 * @param {*} obj - object to wrap
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

	/**
	 * Initialization
	 * @param {Number} [n] - number for multiplication in Number object
	 */
	Monad.prototype.init = function(n) {
		switch (this._type) {
			case TYPE_ARRAY: case TYPE_OBJECT:
			this._pointer = 0;
			break;
			case TYPE_LIST:
				if (this._fstNum > this._lstNum) {
					throw new Error("first number is not less that second : " + this._fstNum + ' > ' + this._lstNum);
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
				throw new Error("there is no method 'init' for type: " + this._type);
		}
	};

	/**
	 * Get element
	 * @return {*}
	 */
	Monad.prototype.value = function() {
		switch (this._type) {
			case TYPE_ARRAY:
				if (this._pointer !== null) {
					if (this._pointer >= 0 && this._wrapped.length > this._pointer) {
						return this._wrapped[this._pointer];
					} else {
						throw new Error("pointer is out of range");
					}
				} else {
					throw new Error("pointer is null");
				}
				break;
			case TYPE_OBJECT:
				if (this._pointer !== null) {
					if (this._pointer >= 0 && Object.keys(this._wrapped).length > this._pointer) {
						return this._wrapped[Object.keys(this._wrapped)[this._pointer]];
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
					return (this._wrapped + this._pointer * this._mult);
				} else {
					throw new Error("pointer is null");
				}
				break;
			default:
				throw new Error("there is no method 'value' for type: " + this._type);
		}
	};

	/**
	 * Set next position
	 * @return {*}
	 */
	Monad.prototype.next = function() {
		switch (this._type) {
			case TYPE_ARRAY:
				if (this._pointer !== null) {
					this._pointer += 1;
					if (this._pointer >= this._wrapped.length) {
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
					if (this._pointer >= Object.keys(this._wrapped).length) {
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
				throw new Error("there is no method 'next' for type: " + this._type);
		}
	};

	/**
	 * ForEach function
	 * @param {Function} func - function for elements
	 */
	Monad.prototype.forEach = function(func) {
		this.init();
		while (this._pointer !== null) {
			func(this.value());
			this.next();
		}
	};

	/**
	 * Fold function left to right
	 * @param {Function} func - function
	 * @param {Number} acc - accumulator
	 * @return {Array}
	 */
	Monad.prototype.foldlNow = function(func, acc) {
		var result = [];
		this.init();
		while (this._pointer !== null) {
			acc = func(acc, this.value());
			result.push(acc);
			this.next();
		}
		return result;
	};

	/**
	 * Fold function right to left
	 * @param {Function} func - function
	 * @param {Number} acc - accumulator
	 * @return {Array}
	 */
	Monad.prototype.foldrNow = function(func, acc) {
		var result = [];
		this.init();
		var rec = function(obj) {
			if (obj._pointer !== null) {
				var o = obj.value();
				obj.next();
				var fun = func(o, rec(obj));
				result.push(fun);
				return fun;
			} else {
				result.push(acc);
				return acc;
			}
		};
		rec(this);
		return result;
	};

	/**
	 * Map
	 * @param {Function} func - map function
	 * @return {Array}
	 */
	Monad.prototype.mapNow = function(func) {
		var result = [];
		this.init();
		while (this._pointer !== null) {
			result.push(func(this.value()));
			this.next();
		}
		return result;
	};

	/**
	 * Filter
	 * @param {Function} func - filter function
	 * @return {Array}
	 */
	Monad.prototype.filterNow = function(func) {
		var result = [];
		this.init();
		while (this._pointer !== null) {
			if (func(this.value())) result.push(this.value());
			this.next();
		}
		return result;
	};

	/**
	 * Prepare a list of lazy functions
	 * @param {String} what - name of lazy function
	 * @param {Function} func - lazy function
	 * @return {Monad}
	 */
	Monad.prototype.lazies = function(what, func) {
		this._lazy.push({what: what, func: func});
		return this;
	};

	/**
	 * Lazy map
	 * @param {Function} func - map function
	 * @return {Monad}
	 */
	Monad.prototype.map = function(func) {
		return this.lazies('map', func);
	};

	/**
	 * Lazy filter
	 * @param {Function} func - filter function
	 * @return {Monad}
	 */
	Monad.prototype.filter = function(func) {
		return this.lazies('filter', func);
	};

	/**
	 * Lazy fold function left to right
	 * @param {Function} func - function
	 * @param {Number} acc - accumulator
	 * @return {Monad}
	 */
	Monad.prototype.foldl = function(func, acc) {
		return this.lazies('foldl', [func, acc]);
	};

	/**
	 * Lazy fold function right to left
	 * @param {Function} func - function
	 * @param {Number} acc - accumulator
	 * @return {Monad}
	 */
	Monad.prototype.foldr = function(func, acc) {
		return this.lazies('foldr', [func, acc]);
	};

	/**
	 * Sort function
	 * @param {Function} [func] - sort function
	 * @return {Array}
	 */
	Monad.prototype.sort = function(func) {
		this.init();
		var arr = this.toArray();
		arr.sort(func);
		return arr;
	};

	/**
	 * Produces a duplicate-free version of the array
	 * @param {Boolean} [isSorted] - true if array is sorted
	 * @param {Function} [iterator] - if you want to compute unique items based on a transformation
	 * @return {Array}
	 */
	Monad.prototype.distinct = function(isSorted, iterator) {
		this.init();
		switch (this._type) {
			case TYPE_ARRAY:
				return _.uniq(this._wrapped, isSorted, iterator);
				break;
			default :
				throw new Error("there is no method 'distinct' for type: " + this._type);
				break;
		}
	};

	/**
	 * Returns array out of other types
	 * @param {Number} [count] - amount of elements
	 * @return {Array}
	 */
	Monad.prototype.toArray = function(count) {
		var result = []
			,self = this;

		this.init();
		while (self._pointer !== null && (count === undefined || result.length < count)) {
			var val = this.value();
			if (this._lazy.length > 0) {
				this._lazy.forEach(function(funcObj) {
					if (val !== null) {
						switch(funcObj.what) {
							case 'map': val = funcObj.func(val);
								break;
							case 'filter': if (!funcObj.func(val)) {val = null}
								break;
							case 'foldl':
								val = funcObj.func[1] = funcObj.func[0](funcObj.func[1], val);
								break;
							default :
								break;
						}
					}
				});
			}
			if (val !== null) result.push(val);
			self.next();
		}
		return result;
	};

	/**
	 * Returns Monad
	 * @return {Monad}
	 */
	Monad.prototype.check = function() {
		return this;
	};

	/**
	 * Wrap object to monad
	 * @param obj - object to wrap
	 * @return {Monad}
	 */
	_.return = function(obj) {
		return new Monad(obj);
	};

	exports = module.exports = _;

}).call(this);