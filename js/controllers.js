app.controller("StatsController", function($scope, $rootScope) {
  $rootScope.chance = 0;
  $rootScope.successCalculator = function(thief, target) {
    var chances = (((thief.explosives / 3)+(thief.marksmanship / 3) + (thief.charisma / 3)) / target.security) + (((thief.driving / 2) + (thief.stealth  / 2)) / (10 - target.accessibility)) / 2;
    if (chances > 1) {
      chances = 1;
      $rootScope.chance = chances;
    } else {
      $rootScope.chance = chances;
    }
  };
  $rootScope.thief = {
    name: "",
    description: "",
    image: "",
    explosives: 0,
    safe_cracking: 0,
    marksmanship: 0,
    stealth: 0,
    charisma: 0,
    driving: 0
  }
  $rootScope.target = {
    image: "",
    name: "",
    description: "",
    security: 0,
    reward: 0,
    accessibility: 0
  }

})

app.controller('ThievesController', function($scope, $rootScope, $http){
  $http.get('https://bankjobapi.herokuapp.com/thieves').then(function(data){
    $scope.thieves = data.data;
    console.log('thieves', data.data);
  });
  $scope.selectThief = function(thief) {
    console.log("selectThief");
    $rootScope.thief = thief;
    $rootScope.successCalculator($rootScope.thief, $rootScope.target)
  }
});

app.controller('BanksController', function($scope, $http){
  $http.get('https://bankjobapi.herokuapp.com/banks').then(function(data){
    $scope.banks = data.data;
    console.log('banks', data.data);
  });
  $scope.selectTarget = function(target) {
    console.log("selectTarget");
    $rootScope.target = target;
    $rootScope.successCalculator($rootScope.thief, $rootScope.target);
  }
});

app.controller('playGame', function($scope, $rootScope){
  $scope.robBank = function(chances) {
    var roll = Math.random()
    if (roll <= chances) {
      $rootScope.win = true;
    } else {
      $rootScope.win = false;
    }
  }
  $rootScope.win = null;
})
