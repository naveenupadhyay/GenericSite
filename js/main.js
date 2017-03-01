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
    
    $scope.previousTestimonialClick = function(){
        event.preventDefault();
        var arrLength = $scope.data.testimonialImg1.length;
        var splicedImg = $scope.data.testimonialImg1.splice(0,0,$scope.data.testimonialImg1[$scope.data.testimonialImg1.length-1]);
        $scope.data.testimonialImg1.pop();
    }
    
    $scope.nextTestimonialClick = function(){
        event.preventDefault();
        var splicedImg = $scope.data.testimonialImg1.splice(0,1);
        $scope.data.testimonialImg1.push(splicedImg[0]);
    }
    
};