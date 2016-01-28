angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $firebaseObject, $firebaseArray, $timeout) {

  var itemsRef = new Firebase("https://grasso.firebaseio.com/items");

  $scope.pesateArray = $firebaseArray(itemsRef);



  // create a query for the most recent 25 messages on the server
  itemsRef.orderByChild("timestamp").limitToLast(30).on('value', function(snap) {

    // The updated data
    var pesate = snap.val();

    var pesoArray = [];
    var fatArray = [];
    var labels = [];

    for(var k in pesate) {
      var pesata = pesate[k];

      pesoArray.push(pesata.peso);
      fatArray.push(pesata.fat);

      var readableDate = new Date(pesata.date).getDate() + '/' + (new Date(pesata.date).getMonth() + 1)

      labels.push(readableDate);
    }

    $timeout(function() {
      $scope.pesoArray = pesoArray;
      $scope.fatArray = fatArray;
      $scope.labels = labels;
      $scope.series = ['Peso', 'Fat'];
      $scope.data = [
        $scope.pesoArray,
        $scope.fatArray
      ];
    }, 0);

  });

  $scope.addItem = function(p, f, w, m, b) {
    if (p && f && w && m && b) {
      $scope.pesateArray.$add({
        date: Date.now(),
        peso: p,
        fat: f,
        water: w,
        muscle: m,
        bone: b
      });
    }
  };
})









.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
