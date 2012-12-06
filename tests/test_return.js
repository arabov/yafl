/**
 * Created with JetBrains WebStorm.
 * User: dev
 * Date: 06.12.12
 * Time: 13:34
 * To change this template use File | Settings | File Templates.
 */

var _ = require('../lib/return.js');
/*
exports.lol = function(test) {
	var a = 1;
	var b = _.return(a).lol()
	test.equal(b, 'lol!', 'lolled!');
	test.done();
};
*/

exports.check = function(test) {
	var array = _.return([1,2,3,4,5]);
	var obj = _.return({a:1,b:2,c:3,d:4,e:5});
	var number = _.return(666);
	var list = _.return('[1..5]');
	console.log(array);
	test.equal(array._type, 0);
	console.log(obj);
	test.equal(obj._type, 1);
	console.log(number);
	test.equal(number._type, 3);
	console.log(list);
	test.equal(list._type, 2);
	test.done();
};

