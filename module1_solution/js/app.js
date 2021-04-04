(function () {
    'use strict'

    var LunchCheck = angular.module("LunchCheck", []);

    LunchCheck.controller("LunchCheckController", LunchCheckController);
    
    LunchCheckController.$inject = ['$scope'];
    
    function LunchCheckController($scope) {
        $scope.result = "";
        $scope.lunch = "";

        $scope.checkIfTooMuch = function() {
            const lunch = $scope.lunch;
            // Empty items are not considered
            const quant = (lunch == "") ? 0 : lunch.split(",").filter(x => notWhiteSpace(x)).length

            if (quant == 0)
                $scope.result = "Please, enter data first";
            else if (quant < 4)
                $scope.result = "Enjoy!";
            else
                $scope.result = "Too much!";
            
        }
        
        function notWhiteSpace(str) {
            if (str == "")
                return false;

            for (const c of str) {
                if (c != " ")
                    return true;
            }
            return false;
        }

    };
})();