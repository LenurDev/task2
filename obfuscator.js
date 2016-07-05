/**
 * @param {Array} data – массив CSS классов
 */
module.exports = function (arrayElements) {

	var alphabet = 'abcdefghijklmnopqrstuvwxyz';
	var alphabetLength = alphabet.length;
	var objObfuscator = {};

	function countRepeatItems(arr) {
		var data = {};

		for (var i=0; i < arr.length; i++) {
			var prop = arr[i];
			if (prop in data) {
				data[prop]++;
			} else {
				data[prop] = 1;
			}
		}

		return data;
	};

	function sort(obj) {
		var keys = Object.keys(obj).sort(function(a, b) {
			return obj[b] -obj[a];
		});

		return keys;
	};

	function generate(i, limit) {
		var div = Math.floor(i/limit);
		var mod = i % limit;

		return (div>0 ? generate(div - 1, limit) : []).concat(mod);
	};

	var objItems = countRepeatItems(arrayElements);
	var sortArr  = sort(objItems);

	for (var i=0; i < sortArr.length; i++) {
		var name = sortArr[i];
		var result = generate(i, alphabetLength);
		var str = '';

		for(var j=0; j < result.length; j++) {
			var index = result[j];
			str = str + alphabet[index];
		}

		objObfuscator[name] = str;
	}

	return objObfuscator;
};