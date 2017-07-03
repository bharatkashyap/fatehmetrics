(function () {
    "use strict";

    angular
        .module("app")
        .factory("UserService", Service);

    function Service($http) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.getData = getData;

        return service;

        function GetCurrent()
        {
          return $http.get("/api/users/current").then(function(response)
          {
            return response.data;
          });
        }

        function getData()
        {
          return $http.get("/api/data/read").then(function(response)
          {
            return response.data;
          });
        }

        }



})();
