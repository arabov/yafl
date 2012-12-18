#YAFL
Yet another functional library similar to LINQ

#Quick examples
```javascript
var regions = _.return({74: "Челябинск", 75: "Забайкальский край", 76: "Ярославль", 77: "Москва", 78: "Санкт-Петербург"});
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
    	).toArray());
```
returns - "Москва!"