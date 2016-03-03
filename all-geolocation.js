if (Meteor.isServer) {
	Meteor.methods({
		getLocationByIp: function () {
			var ip = this.connection.clientAddress;
			if (!ip || !GeoIP) return false;
			var geo = GeoIP.lookup(ip);
			if (geo) {
				return _.object(['lat','lng'], geo.ll);
			}
			return null;
		}
	});
}

var location = new ReactiveVar({lat: 0, lng: 0});

AllGeo = {
	init: _.once(function () {
		var navigatorLocated = false;
		this.getLocationByIp(function (pos) {
			if (!navigatorLocated) {
				location.set(pos);
			}
		});
		this.getLocationByNavigator(function (pos) {
			location.set(pos);
			navigatorLocated = true;
		});
	}),
	changeLocation: function (pos) {
		location.set(pos);
	},
	getLocation: function () {
		this.init();
		return location.get();
	},
	// Получаем широту и долготу пользователя по ip
	_ipgeolocation: null,
	getLocationByIp: function (callback) {
        var self = this;
        if (self._ipgeolocation) {
            callback.call(null, self._ipgeolocation);
        } else {
            Meteor.call('getLocationByIp', function (error, pos) {
                if (pos) {
                    self._ipgeolocation = pos;
                    callback.call(null, pos);
                }
            });
        }
    },
	// Получаем широту и долготу пользователя с помощью HTML5 geolocation
    getLocationByNavigator: function (callback) {
        if (navigator.geolocation) {
        	navigator.geolocation.getCurrentPosition(function(position) {
        		var pos = {
        			lat: position.coords.latitude,
        			lng: position.coords.longitude
        		};
                callback.call(null, pos);
        	});
        }
    }
};
