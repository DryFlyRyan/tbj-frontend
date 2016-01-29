app.controller('ThievesController', ['$scope', '$http', function($scope, $http){
  $http.get('https://bankjobapi.herokuapp.com/thieves').then(function(data){
    $scope.thieves = data.data;
    console.log('thieves', data.data);
  });
}]);

app.controller('BanksController', ['$scope', '$http', function($scope, $http){
  $http.get('https://bankjobapi.herokuapp.com/banks').then(function(data){
    $scope.banks = data.data;
    console.log('banks', data.data);
  });
}]);

app.controller('StatsController', ['$scope', function($scope){

}]);
