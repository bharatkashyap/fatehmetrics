(function () {
    "use strict";

    angular
        .module("app", [])
        .controller("main", Controller);

    function Controller($scope, UserService) {

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                $scope.user = user;
            });

            UserService.getData().then(function (response) {
              $scope.data = response.data;
              $scope.time = response.time;

            })

            }

        }


})();
