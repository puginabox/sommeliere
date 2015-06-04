
(function () {
    "use strict";
    var app = angular.module("cellar",
           ["common.services",
            "ngRoute",
            "classResourceMock"]);

    app.config(["$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "app/welcomeView.html"
                    })
                    .when("/classList", {
                        templateUrl: "app/classes/classListView.html",
                        controller: "ClassListCtrl as vm"
                    })
                    .when("/classEdit/:classId", {
                        templateUrl: "app/classes/classEditView.html",
                        controller: "ClassEditCtrl as vm",
                        resolve: {
                            selectedClass: function (classResource, $route) {
                                var classId = $route.current.params.classId;
                                return classResource.get({ classId: classId }).$promise;
                            }
                        }
                    })
                    .otherwise({
                        redirectTo: "/"
                    })
            }]);
}());