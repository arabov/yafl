#YAFL
Yet another functional library similar to LINQ


##Examples

```javascript
// Fold
_.return('[1..5]').foldl(function(a,b) {
	return a*b;
}, 1).toArray()
/* returns: [ 1, 2, 6, 24, 120 ] */

_.return([1,2,3,4,5]).foldrNow(function(a,b) {
	return a+b;
}, 0);
/* returns: [ 0, 5, 9, 12, 14, 15 ] */


// Map and filter
var regions = _.return({
	74: "Челябинск",
	75: "Забайкальский край",
	76: "Ярославль",
	77: "Москва",
	78: "Санкт-Петербург"
});

regions.filter(
	function(a) {
		if (a == 'Москва') {
			return true;
		} else {
			return false;
		}
	}
).map(
	function(a) {
		return a + '!';
	}
).toArray().toString();
/* returns: Москва! */


// Zip
var data = [
	"Максим Чуркин"
	, "Вера Аминова"
	, "Дарья Грекова"
	, "Иван Демкович"
	, "Денис Дубленых"
	, "Алексей Королев"
	, "Дмитрий Зонин"
	, "Дмитрий Карпов"
	, "Вадим Шакуро"
	, "Кирилл Корнюхин"
	, "Александр Чегодаев"
	, "Павел Скрипниченко"
];
var rndPoints = _.return('[1,1..]').map(function(a){return _.random(1,100);});

_.return(data).zipWith(
	function(name, pos) {
		return pos + ') ' + name;
	}
	, _.return('[1,1..]')
)
	.zipWith(
	function(item, points) {
		return item + ' - ' + points + ' points'
	}
	, rndPoints
)
	.toArray().join('\n');
/* returns:
 1) Максим Чуркин - 47 points
 2) Вера Аминова - 14 points
 3) Дарья Грекова - 3 points
 4) Иван Демкович - 6 points
 5) Денис Дубленых - 79 points
 6) Алексей Королев - 66 points
 7) Дмитрий Зонин - 14 points
 8) Дмитрий Карпов - 42 points
 9) Вадим Шакуро - 44 points
 10) Кирилл Корнюхин - 2 points
 11) Александр Чегодаев - 57 points
 12) Павел Скрипниченко - 18 points
 */
```