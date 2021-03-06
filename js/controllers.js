app.controller("StatsController", function($scope, $rootScope) {
  $rootScope.chance = 0;
  $rootScope.reward = 0;
  $rootScope.successCalculator = function(thief, target) {
    var security = (((thief.explosives / 3) + (thief.marksmanship / 3) + (thief.charisma / 3)) /
    target.security)
    var accessibility =
    (((thief.driving / 2) + (thief.stealth  / 2)) / (10 - target.accessibility)) / 2;
    if (security > 1) {
      security = 1
    }
    if (accessibility > 1) {
      accessibility = 1
    }
    var chances = (security + accessibility) / 2
    console.log(chances);
    $rootScope.chance = chances;
    $rootScope.reward = (target.reward * 10000) * ((thief.safe_cracking / 10))
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

app.controller('BanksController', function($scope, $rootScope, $http){
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
    console.log(roll, chances);
    if (roll <= chances) {
      $rootScope.win = true;
      $rootScope.lose = false;
    } else {
      $rootScope.win = false;
      $rootScope.lose = true;
    }
    console.log($rootScope.win);
  }  
})
