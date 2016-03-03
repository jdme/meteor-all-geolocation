Package.describe({
	name: 'nekolski:all-geolocation',
	version: '0.0.1',
	summary: 'Detect geolocation by IP and client device geolocation',
	git: '',
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.2.1');
	api.use([
        'underscore',
        'reactive-var',
		'servicelocale:geoip'
	]);;
	api.addFiles([
        'all-geolocation.js'
    ]);
    api.export(['AllGeo']);
});
