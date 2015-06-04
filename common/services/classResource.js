(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("classResource",
        ["$resource",
            classResource]);

    function classResource($resource) {
        return $resource("/api/classes/:classId/:className");
    }
}());
