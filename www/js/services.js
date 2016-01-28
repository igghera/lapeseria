angular.module('starter.services', [])

.factory("Pesate", function($firebaseArray) {
  var itemsRef = new Firebase("https://grasso.firebaseio.com/items");
  return $firebaseArray(itemsRef);
})

;
