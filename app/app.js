var myTeamApp = angular.module('myTeamApp', ['ngRoute', 'ngAnimate']);

myTeamApp.config(['$routeProvider', function($routeProvider){

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'TeamController'
    })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
        .when('/contact-success', {
          templateUrl: 'views/contact-success.html',
          controller: 'ContactCtrl'
        })
    .when('/teams', {
        templateUrl: 'views/teams.html',
        controller: 'TeamController'
    }).otherwise({
        redirectTo: '/home'
    });

}]);

myTeamApp.directive('randomTeam' , [function(){

    return {
      restrict: 'E',
      scope: {
          teams: '=',
          title: '='
      },

        templateUrl: 'views/random.html',
        controller: function($scope){
            $scope.random = Math.floor(Math.random()*4);
      }
    };


}]);


myTeamApp.controller('TeamController', ['$scope', '$http', function($scope, $http){


  $scope.removeTeam = function(team){
    var removedTeam = $scope.teams.indexOf(team);
    $scope.teams.splice(removedTeam, 1);
  };

    $scope.addTeam = function(){
      $scope.teams.push({
        name:  $scope.newTeam.name,
        color: $scope.newTeam.color,
        price: parseInt($scope.newTeam.price)
      });

      $scope.newTeam.name = "";
      $scope.newTeam.color = "";
      $scope.newTeam.price = "";

    };

      $scope.removeAll = function(){
            $scope.teams =  [];
      };


    $http.get('data/teams.json').success(function(data){
      $scope.teams = data;
    });

}]);

myTeamApp.controller('ContactCtrl', ['$scope', '$location', function($scope, $location){

      $scope.sendMessage = function(){
              $location.path('/contact-success');
      };


}]);
