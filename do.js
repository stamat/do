/* do.js v0.0 */

"use strict";

var do = {};

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

/*==== MISC ====*/

do.setCookie = function(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

do.getCookie = function(cname) {
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

do.eraseCookie = function(name) {
    do.setCookie(name, "", null , null , null, 1);
}

do.getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

do.getHash = function() {
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

/*==== STRINGS ====*/

do.slug = function(s) {
	s = s.trim().toLowerCase();
	s = s.replace(/[^a-z0-9\s_-]/ig, '');
	return s.replace(/[\s\uFEFF\xA0]+/ig, '-');
}

do.decorateWithZeros = function(v, z) {
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
