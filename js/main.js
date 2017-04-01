var mainModule = angular.module('mainModule', ['ui.bootstrap']);


mainModule.controller('MainController', MainController);

function MainController($scope,$http,$modal) {
    $http.get('data/main.json').then(function(data) {
        console.log(data.data);
        $scope.data = data.data;
        init();
    },
    function(error){
        console.log(error);
    });
    
   function init(){
       $scope.activeArrows = $scope.data.testimonialImg1.length > 0 ? true : false;
   }
    
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

    $scope.open = function () {
        console.log('opening pop up');
        var modalInstance = $modal.open({
            templateUrl: 'Popup.html',
            controller: 'PopupCont',
        });
    }
    
};

angular.module('mainModule').controller('PopupCont', PopupController);

function PopupController($scope,$http,$modalInstance) {
    $http.get('data/main.json').then(function(data) {
        $scope.data = data.data;
    },
    function(error){
        console.log(error);
    });

    $scope.showSuccessMessage = "false";
    $scope.close = function () {
        console.log('submitting and closing form!');
        $scope.showSuccessMessage = "true";
        // $modalInstance.dismiss('cancel');
    };
};