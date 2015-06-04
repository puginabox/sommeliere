(function () {
    "use strict";

    angular
        .module("cellar")
        .controller("ClassEditCtrl",
        ["selectedClass",
            "$location",
            ClassEditCtrl]);

    function ClassEditCtrl(selectedClass, $location) {
        var vm = this;

        vm.class = selectedClass;
        vm.title = "";

        if (vm.class && vm.class.classId) {
            vm.title = "Edit: " + vm.class.className;
        }
        else {
            vm.title = "New Bottle";
        }

        vm.cancelEntry = function (control, event) {
            if (event.keyCode == 27) {
                control.$rollbackViewValue();
            }
        };

        vm.submit = function () {
                vm.class.$save();
                $location.path("/classList");
        };

        vm.cancel = function () {
            $location.path("/classList");
        };
    }
}());
