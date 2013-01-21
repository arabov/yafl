/**
 * Created with JetBrains WebStorm.
 * User: dev
 * Date: 06.12.12
 * Time: 13:34
 * To change this template use File | Settings | File Templates.
 */

var _ = require('../lib/return.js');

exports.checkType = function(test) {
	var array = _.return([1,2,3,4,5])
		, obj = _.return({a:1,b:2,c:3,d:4,e:5})
		, number = _.return(666)
		, list = _.return('[1..5]')
		;

	test.equal(array._type, 0);
	test.equal(obj._type, 1);
	test.equal(number._type, 3);
	test.equal(list._type, 2);

	test.done();
};

exports.checkNextValue = function(test) {
	var array = _.return([1,2,3,4,5])
		, obj = _.return({a:2,b:4,c:6,d:8,e:10})
		, number = _.return(666)
		, list = _.return('[2..5]')
		;

	array.init(); obj.init(); number.init(2); list.init();

	array.next(); obj.next(); number.next(); list.next();

	test.equal(array.value(), 2);
	test.equal(obj.value(), 4);
	test.equal(number.value(), 668);
	test.equal(list.value(), 3);

	test.done();
};

exports.checkForEach = function(test) {
	var array = _.return([1,2,3,4,5])
		, obj = _.return({a:6,b:7,c:8,d:9,e:10})
		, list = _.return('[11..15]')
		;

	var resArr = [];

	array.forEach(function(a) {
		resArr.push(a);
	});
	obj.forEach(function(a) {
		resArr.push(a);
	});
	list.forEach(function(a) {
		resArr.push(a);
	});

	test.deepEqual(resArr, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);

	test.done();
};

exports.checkFoldNow = function(test) {
	var array = _.return([1,2,3,4,5])
		, obj = _.return({a:6,b:7,c:8,d:9,e:10})
		, list = _.return('[11..15]')
		;

	var sum = function(a,b) {
		return a+b;
	};

	test.deepEqual(array.foldlNow(sum, 0), [1,3,6,10,15]);
	test.deepEqual(obj.foldlNow(sum, 1), [7,14,22,31,41]);
	test.deepEqual(list.foldlNow(sum, 10), [21,33,46,60,75]);

	test.deepEqual(array.foldrNow(sum, 0), [0,5,9,12,14,15]);
	test.deepEqual(obj.foldrNow(sum, 1), [1,11,20,28,35,41]);
	test.deepEqual(list.foldrNow(sum, 10), [10,25,39,52,64,75]);

	test.done();
};

exports.checkMapNow = function(test) {
	var array = _.return([1,2,3,4,5])
		, obj = _.return({a:6,b:7,c:8,d:9,e:10})
		, list = _.return('[11..15]')
		;

	var mult = function(a) {
			return a*a;
	};

	test.deepEqual(array.mapNow(mult), [1,4,9,16,25]);
	test.deepEqual(obj.mapNow(mult), [36,49,64,81,100]);
	test.deepEqual(list.mapNow(mult), [121,144,169,196,225]);

	test.done();
};

exports.checkFilterNow = function(test) {
	var array = _.return([1,2,3,4,5])
		, obj = _.return({a:1,b:2,c:3,d:4,e:5})
		, list = _.return('[1..5]')
		;

	var filterFunc = function (a) {
		return a > 4;
	};

	test.deepEqual(array.filterNow(filterFunc), [5]);
	test.deepEqual(obj.filterNow(filterFunc), [5]);
	test.deepEqual(list.filterNow(filterFunc), [5]);

	test.done();
};

exports.checkToArr = function(test) {
	var array = _.return([1,2,3,4,5])
		, obj = _.return({a:6,b:7,c:8,d:9,e:10})
		, list = _.return('[11..15]')
		;

	test.deepEqual(array.toArray(), [1,2,3,4,5]);
	test.deepEqual(obj.toArray(), [6,7,8,9,10]);
	test.deepEqual(list.toArray(), [11,12,13,14,15]);

	test.done();
};

exports.checkSort = function(test) {
	var array = _.return([42,23,4,8,16,15])
		, obj = _.return({a:99,b:97,c:100,d:9,e:17})
		;

	var sortFunc = function(a,b) {
		return a-b;
	};

	test.deepEqual(array.sort(sortFunc), [4,8,15,16,23,42]);
	test.deepEqual(obj.sort(sortFunc), [9,17,97,99,100]);

	test.done();
};

exports.checkDistinct = function(test) {
	var array = _.return([42,23,4,8,16,15,43,23,16,15,8,4]);
	test.deepEqual(array.distinct(), [42,23,4,8,16,15,43]);

	test.done();
};

exports.checkLazys = function(test) {
	var array = _.return([1,2,3,4,5])
		, obj = _.return({a:6,b:7,c:8,d:9,e:10})
		//, list = _.return('[11..15]')
		;

	test.deepEqual(
		array.filter(
			function(a) {
				return a >= 3;
			}
		).map(
			function(a) {
				return a*a;
			}
		).toArray(), [9,16,25]
	);

	test.deepEqual(
		obj.foldl(
			function(a,b) {
				return a+b;
			}, 0
		).filter(
			function(a) {
				return a % 2 == 0;
			}
		).toArray(1), [6]
	);

	test.deepEqual(
		_.return([1,2,3,4,5]).zipWith(
			function(a,b){return [a,b];}
			, _.return({a:6,b:7,c:8,d:9,e:10})
		).toArray(), [[1,6],[2,7],[3,8],[4,9],[5,10]]
	);

	test.deepEqual(
		_.return([1,2,3,4,5]).zipWith(
			function(a,b){return [a,b];}
			, _.return({a:6,b:7,c:8,d:9,e:10})
		).toArray(), [[1,6],[2,7],[3,8],[4,9],[5,10]]
	);

	test.deepEqual(
		_.return([5,4,3,2,1]).zip(_.return('[1,-2..]')).toArray(), [[5,1],[4,-1],[3,-3 ],[2,-5],[1,-7]]
	);

	test.done();
};

exports.checkSequence = function(test) {
	var seq1 = _.return('[1..]');
	test.deepEqual(seq1.toArray(3), [1,2,3]);
	var seq2 = _.return('[1,-1..-5]');
	test.deepEqual(seq2.toArray(), [1,0,-1,-2,-3,-4,-5]);
	var seq3 = _.return('[1..5]');
	test.deepEqual(seq3.toArray(), [1,2,3,4,5]);
	test.done();
};