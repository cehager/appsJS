"use strict";

angular.module('app').directive('wwaDashboard', [function () {
    return {
        scope: {

        },
        template: '<ps-dashboard></ps-dashboard>',
        link: function (scope) {
            scope.title = 'This is the Dashboard Header';

            scope.gridsterOpts = {
                columns: 12,
                margins: [20, 20],
                outerMargin: false,
                pushing: true,
                floating: false,
                swapping: true
            };

            scope.widgets = [
                {
                    title: "first",
                    sizeX: 3,
                    sizeY: 3,
                    minSizeX: 2,
                    minSizeY: 2,
                    row: 0,
                    col: 0,
                    template: '<wwa-temperature></wwa-temperature',
                    widgetSettings: {
                        id: 1000
                    }
                },
                {
                    title: "third",
                    sizeX: 5,
                    sizeY: 3,
                    row: 3,
                    col: 0,
                    template: '<wwa-inventory></wwa-inventory',
                    widgetSettings: {
                        id: 1002
                    }
                  },
                  {
                    title: "Second",
                    sizeX: 5,
                    sizeY: 3,
                    row: 1,
                    col: 5,
                    template: '<wwa-employee></wwa-employee',
                    widgetSettings: {
                        id: 5001
                    }
                }

            ];
        }
    }
}]);