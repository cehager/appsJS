"use strict";

angular.module('app').config(['$routeProvider', function ($routeProvider) {
    
    var routes = [
        {
            url: '/dashboard',
            config: {
                template: '<wwa-dashboard></wwa-dashboard>'
            }
        },
        {
            url: '/guides',
            config: {
                template: '<wwa-guides></wwa-guides>'
            }
        },
        {
            url: '/locations',
            config: {
                template: '<wwa-locations></wwa-locations>'
            }
        }
    ];

    routes.forEach(function (route) {
        $routeProvider.when(route.url, route.config);
    });

    $routeProvider.otherwise({ redirectTo: '/dashboard' });
}]);

