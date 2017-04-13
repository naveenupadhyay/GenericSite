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
            templateUrl: 'popup.html',
            controller: 'PopupCont',
        });
    }
    
};

angular.module('mainModule').controller('PopupCont', PopupController);

function PopupController($scope,$http,$modalInstance) {
    $http.get('data/main.json').then(function(data) {
        $scope.data = data.data;
        console.log($scope.data);
    },
    function(error){
        console.log(error);
    });

    $scope.showSuccessMessage = "false";
    $scope.formSubmissionMessage = "";
    $scope.form = {};
    $scope.close = function () {
        if(validateForm($scope.form))
        {
            $http({
                method: 'GET',
                url: encodeURI("http://localhost:8090/create?email=" + $scope.form.email + "&name=" + $scope.form.fname + " " + $scope.form.lname  + "&phone=" + $scope.form.phone),
                data: {},
                transformResponse: function (data, headersGetter, status) {
                    return {data: data};
                }
            }).then(function (success){
                console.log(success);
                $scope.formSubmissionMessage = $scope.data.successMessage;
                $scope.form = {};
           },function (error){
                console.log(error);
                $scope.formSubmissionMessage = $scope.data.networkFailureMessage;
           });
        } else {
            $scope.formSubmissionMessage = $scope.data.validationFailureMessage;
        }

        $scope.showSuccessMessage = "true";
        // $modalInstance.dismiss('cancel');
    };

    var validateForm = function(form) {
        var emailRegex = /\S+@\S+\.\S+/;
        if(form.fname == undefined || form.lname == undefined || form.email == undefined || form.phone == undefined)
            return false;
        if(!emailRegex.test(form.email))
            return false;
        if(isNaN(form.phone) || form.phone.length!=10)
            return false;
        return true;
    };
};