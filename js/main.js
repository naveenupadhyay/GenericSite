var mainModule = angular.module('mainModule', []);


mainModule.controller('MainController', MainController);

function MainController($scope,$http) {
    $http.get('data/main.json').then(function(data) {
        console.log(data.data);
        $scope.data = data.data;
    },
    function(error){
        console.log(error);
    });
    
}