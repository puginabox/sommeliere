
(function () {
    "use strict";
    angular
        .module("cellar")
        .controller("ClassListCtrl",
                    ["classResource",
                        ClassListCtrl]);

    function ClassListCtrl(classResource) {
        var vm = this;

        vm.classes = [];

        classResource.query(function(data) {
            vm.classes = data;
        });
    }
}());
