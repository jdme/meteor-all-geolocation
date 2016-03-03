# All in one geolocation for Meteor JS
Package performs IP and device geolocation.
Provided methods for reactive or asynchronous getting current user location.

## Reactive location
For getting location from both (device and IP) sources, use method `getLocation`.
```
var location = AllGeo.getLocation();
```
You can speed up location detection by previously calling `AllGeo.init()` somewhere.

## Async location
Here are classic async methods `getLocationByNavigator` and `getLocationByIp`.
```
AllGeo.getLocationByNavigator(function(location){
  console.log('my device location', location);
});

AllGeo.getLocationByIp(function(location){
  console.log('my ip location', location);
});
```

## Result value
All methods return {lat,lng} object with coordinates.
```
{ lat: 0, lng: 0 }
```
