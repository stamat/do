/* do.js v0.0 */

"use strict";

var d0 = {};

//TODO: write all, merge with ivarize, comment each function and document it

/*==== POLYFILLS ====*/

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

if (!Array.prototype.min) {
    Array.prototype.min = function() {
        var min = null;

        for (var i = 0; i < this.length; i++) {
            if (min === null) {
                min = this[i];
                continue;
            }

            if (this[i] < min) {
                min = this[i];
            }
        }

        return min;
    };
}

if (!Array.prototype.max) {
    Array.prototype.max = function() {
        var max = null;

        for (var i = 0; i < this.length; i++) {
            if (max === null) {
                max = this[i];
                continue;
            }

            if (this[i] > max) {
                max = this[i];
            }
        }

        return max;
    };
}

/*==== UTILS ====*/

//Thanks to perfectionkills.com <http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/>
d0.getClass = function(val) {
	return Object.prototype.toString.call(val)
		.match(/^\[object\s(.*)\]$/)[1];
};

d0.whatis = function(val) {

	if (val === undefined)
		return 'undefined';
	if (val === null)
		return 'null';

	var type = typeof val;

	if (type === 'object')
		type = d0.getClass(val).toLowerCase();

	if (type === 'number') {
		if (val.toString().indexOf('.') > 0)
			return 'float';
		else
			return 'integer';
	}

	return type;
};

d0.types = {
	'undefined': -1,
	'null': 0,
	'boolean': 1,
	'integer': 2,
	'float': 3,
	'string': 4,
	'array': 5,
	'object': 6,
	'function': 7,
	'regexp': 8,
	'date': 9
}

d0.clone = function(o) {
	var res = null;
	var type = d0.types[d0.whatis(o)];
	if(type === 6) {
		res = d0._cloneObject(o);
    } else if(type === 5) {
    	res = d0._cloneArray(o);
    } else {
    	res = o;
    }
    return res;
};

d0._cloneObject = function(o) {
	var res = {};
	for(var i in o) {
		res[i] = d0.clone(o[i]);
	}
	return res;
};

d0._cloneArray = function(a) {
	var res = [];
	for(var i = 0; i < a.length; i++) {
		res[i] = d0.clone(a[i]);
	}
	return res;
};

/*==== BROWSER ====*/

d0.setCookie = function(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

d0.getCookie = function(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

d0.eraseCookie = function(name) {
    do.setCookie(name, "", null , null , null, 1);
}

d0.getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

d0.getHash = function() {
    var hash = window.location.hash;

    if (hash) {
        var hash_value = hash.replace('#', '');
        if (hash_value === '') {
            return null;
        }

        return hash_value;
    }
    return null;
}

d0.isIOS = function() {
	//https://stackoverflow.com/questions/9038625/detect-if-device-is-ios/9039885#9039885
	return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

/*==== STRINGS ====*/

d0.slug = function(s) {
	s = s.trim().toLowerCase();
	s = s.replace(/[\/\\]/ig, '-');
	s = s.replace(/[^a-z0-9\s_-]/ig, '');
	return s.replace(/[\s\uFEFF\xA0]+/ig, '-');
}

d0.decorateWithZeros = function(v, z) {
    var zeros = '';
    var zorig = z;

    var vz = v+'';
    var joint = '.';

    if (vz.indexOf('.') > -1) {
        var pts = vz.split('.');

        if (pts[1]) {
            z = z - pts[1].length;
        }
        joint = '';

        if (pts[1].length > zorig) {
            pts[1] = pts[1].substr(0, zorig);
            v = pts[0] + '.' + pts[1];
        }
    }

    for (var i = 0; i < z; i++) {
        zeros += '0';
    }

    if (zeros.length) {
        v = v+joint+zeros;
    }

    return v;
}
