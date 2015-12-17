

angular.module("psFramework", ["psMenu", "psDashboard"]);


angular.module('psFramework').directive('psUserProfileSmall', function () {
    return {
        templateUrl: 'ext-modules/psFramework/psUserProfile/psUserProfileSmallTemplate.html'
    };
});


angular.module('psFramework').directive('psUserProfile', function () {
    return {
        templateUrl: 'ext-modules/psFramework/psUserProfile/psUserProfileTemplate.html'
    };
});
angular.module("psFramework").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/psFramework/psFrameworkTemplate.html","\r\n<div class=\"ps-title-bar\">\r\n    <div class=\"row\">\r\n        <div class=\"ps-logo-area col-sm-6\">\r\n            <img class=\"ps-icon\" ng-src=\" {{ iconFile }}\" />\r\n            <div class=\"ps-title-area\">\r\n                <p class=\"ps-logo-title\">{{ title }}</p>\r\n                <p class=\"ps-logo-subtitle\">{{ subtitle }}</p>\r\n            </div>\r\n\r\n            <div ng-if=\"isMenuButtonVisible\" ng-click=\"menuButtonClicked()\" \r\n                    class=\"ps-collapsed-menu pull-right\">\r\n                <button type=\"button\" class=\"btn ps-nav-button\">\r\n                    <i class=\"fa fa-bars\"></i>\r\n                </button>\r\n            </div>\r\n\r\n        </div>\r\n\r\n\r\n        <div class=\"ps-right-side-controls co-sm-6\">\r\n            <ps-user-profile-small></ps-user-profile-small>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"ps-menu-area\"\r\n     ng-show=\"isMenuVisible\"\r\n     ng-class=\"{\'ps-menu-area-vertical\': isMenuVertical, \'ps-menu-area-horizontal\': !isMenuVertical}\">\r\n    <ps-user-profile></ps-user-profile>\r\n    <ng-transclude></ng-transclude>\r\n</div>\r\n\r\n<div ng-view class=\"ps-view\" ng-class=\"{\'ps-view-full-width\': !isMenuVertical || !isMenuVisible}\"> \r\n\r\n</div>");
$templateCache.put("ext-modules/psFramework/psUserProfile/psUserProfileSmallTemplate.html","\n<div class=\"ps-user-profile-small pull-right\">\n    <img src=\"images/employee-don.png\" alt=\"user image\" />\n    <span>Don Morgan</span>\n    <button class=\"btn btn-default btn-sm\">\n        <i class=\"fa fa-chevron-down\"></i>\n    </button>\n</div>\n");
$templateCache.put("ext-modules/psFramework/psUserProfile/psUserProfileTemplate.html","\r\n<div class=\"ps-user-profile\" ng-if=\"isMenuVertical && !isMenuButtonVisible\">\r\n    <img src=\"images/employee-don.png\" alt=\"user image\" />\r\n    <div>\r\n        <p>Don</p>\r\n        <p>Morgan</p>\r\n        <button class=\"btn btn-default btn-sm\">\r\n            <i class=\"fa fa-chevron-down\"></i>\r\n        </button>\r\n    </div>\r\n</div>\r\n");}]);


angular.module("psFramework").directive("psFramework", function () {
    return {
        transclude: true,
        scope: {
            title: '@',
            subtitle: '@',
            iconFile: '@'
        },
        controller: "psFrameworkController",
        templateUrl: "ext-modules/psFramework/psFrameworkTemplate.html"
    };
});



angular.module("psFramework").controller("psFrameworkController",
    ['$scope', '$rootScope', '$window', '$timeout', '$location',
        function ($scope, $rootScope, $window, $timeout, $location) {

        $scope.isMenuVisible = true;
        $scope.isMenuButtonVisible = true;
        $scope.isMenuVertical = true;

        $scope.$on('ps-menu-item-selected-event', function (evt, data) {
            $scope.routeString = data.route;
            $location.path(data.route);
            checkWidth();
            broadcastMenuState();
        });

        $scope.$on('ps-menu-orientation-changed-event', function (evt, data) {
            $scope.isMenuVertical = data.isMenuVertical;
            $timeout(function () {
                $($window).trigger('resize');
            }, 0);
        })


        $($window).on('resize.psFramework', function () {
            $scope.$apply(function () {
                checkWidth();
                broadcastMenuState();
            });
        });

        $scope.$on("$destroy", function () {
            $($window).off("resize.psFramework");
        });

        var checkWidth = function () {
            var width = Math.max($($window).width(), $window.innerWidth);
            $scope.isMenuVisible = (width > 768);
            $scope.isMenuButtonVisible = !$scope.isMenuVisible;
        };

        $scope.menuButtonClicked = function () {
            $scope.isMenuVisible = !$scope.isMenuVisible;
            broadcastMenuState();
            //$scope.$apply();
        };

        var broadcastMenuState = function () {
            $rootScope.$broadcast('ps-menu-show',
                {
                    show: $scope.isMenuVisible
                });
        };


        $timeout(function () {
            checkWidth();
        }, 0);
    }]);


angular.module("psMenu", ["ngAnimate"]);
angular.module("psMenu").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/psMenu/psMenuGroupTemplate.html","<li class=\"ps-selectable-item\" ng-click=\"clicked()\" ng-class=\"{\'ps-item-horizontal\': !isVertical()}\">\r\n    <div class=\"ps-noselect\">\r\n        <i class=\"fa {{icon}} ps-menu-icon\"></i>\r\n        {{label}}\r\n        <i ng-if=\"isVertical()\" \r\n           class=\"fa fa-chevron-left ps-group-indicator-left\" \r\n           ng-class=\"{\'fa-rotate-270\': isOpen}\"></i>\r\n    </div>\r\n</li>\r\n<div ng-show=\"isOpen\" class=\"ps-subitem-section ps-fade-in-animation\" ng-class=\"{\'ps-popup-menu\': !isVertical()}\">\r\n    <ul ng-transclude></ul>\r\n</div>\r\n");
$templateCache.put("ext-modules/psMenu/psMenuItemTemplate.html","<li class=\"ps-selectable-item\" ng-class=\"{\'ps-item-horizontal\': !isVertical()}\">\r\n  <div class=\"ps-noselect\">\r\n      <i class=\"fa {{icon}} ps-menu-icon\"></i>\r\n      {{label}}\r\n  </div>\r\n    <i ng-if=\"isActive() && isVertical()\" class=\"fa fa-2x fa-caret-left ps-menu-active-indicator\"></i>\r\n</li>");
$templateCache.put("ext-modules/psMenu/psMenuTemplate.html","<div> \r\n    <ul class=\"ps-menu\" ng-transclude></ul>\r\n    <a ng-class=\"{\'ps-layout-button-horizontal\': !isVertical}\"\r\n       class=\"btn ps-menu-layout-button\" ng-click=\"toggleMenuOrientation()\">\r\n        <i class=\"fa\"\r\n           ng-class=\"{\'fa-chevron-up\': isVertical, \'fa-chevron-left\': !isVertical}\" ></i>\r\n    </a>\r\n</div>");}]);


angular.module('psMenu').directive('psMenuItem', function () {
    return {
        require: '^psMenu',
        scope: {
            label: '@',
            icon: '@',
            route: '@'
        },
        templateUrl: 'ext-modules/psMenu/psMenuItemTemplate.html',
        controller: 'psMenuController',
        link: function (scope, el, attr, ctrl) {

            scope.isActive = function () {
                return el === ctrl.getActiveElement();
            };

            scope.isVertical = function () {
                return ctrl.isVertical() || el.parents('.ps-subitem-section').length > 0;
            };

            el.on('click', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                scope.$apply(function () {
                    ctrl.setActiveElement(el);
                    ctrl.setRoute(scope.route);
                });
            });
        }
    }
});


angular.module('psMenu').directive('psMenuGroup', function () {
    return {
        require: '^psMenu',
        transclude: true,
        scope: {
            label: '@',
            icon: '@'
        },
        templateUrl: 'ext-modules/psMenu/psMenuGroupTemplate.html',
        link: function (scope, el, attr, ctrl) {
            scope.isOpen = false;
            scope.closeMenu = function () {
                scope.isOpen = false;
            };

            scope.clicked = function () {
                scope.isOpen = !scope.isOpen;

                if (el.parents('.ps-subitem-section').length == 0)
                    scope.setSubmenuPosition();

                ctrl.setOpenMenuScope(scope);
            };

            scope.isVertical = function () {
                return ctrl.isVertical() || el.parents('.ps-subitem-section').length > 0;
            };

            scope.setSubmenuPosition = function () {
                var pos = el.offset();
                $('body .ps-subitem-section').css({ 'left': pos.left + 20, 'top': 36 });
            };
        }
    };
});


angular.module('psMenu').directive('psMenu', function () {
    return {
        transclude: true,
        scope: {

        },
        templateUrl: 'ext-modules/psMenu/psMenuTemplate.html',
        controller: 'psMenuController',
        link: function (scope, el, attr) {

        }
    }
});


angular.module('psMenu').controller('psMenuController',
    ['$scope', '$rootScope', function ($scope, $rootScope) {

        $scope.showMenu = true;
        $scope.isVertical = true;
        $scope.openMenuScope = null;

        this.getActiveElement = function () {
            return $scope.activeElement;
        };

        this.setActiveElement = function (el) {
            $scope.activeElement = el;
        };

        this.isVertical = function () {
            return $scope.isVertical;
        };

        this.setRoute = function (route) {
            $rootScope.$broadcast('ps-menu-item-selected-event', {route: route});
        };

        this.setOpenMenuScope = function (scope) {
            $scope.openMenuScope = scope;
        }

        $scope.toggleMenuOrientation = function () {
            if ($scope.openMenuScope)
                $scope.openMenuScope.closeMenu();

            $scope.isVertical = !$scope.isVertical;

            $rootScope.$broadcast('ps-menu-orientation-changed-event',
                 { isMenuVertical: $scope.isVertical });
        };

        angular.element(document).bind('click', function (e) {
            if ($scope.openMenuScope && !$scope.isVertical) {
                if ($(e.target).parent().hasClass('ps-selectable-item'))
                    return;
                $scope.$apply(function () {
                    $scope.openMenuScope.closeMenu();
                });
                e.preventDefault();
                e.stopPropagation();
            };
        });

        $scope.$on('ps-menu-show', function (evt, data) {
            $scope.showMenu = data.show;
        });
      }
    ]);


angular.module("psDashboard", ["gridster", "ui.bootstrap"]);
angular.module("psDashboard").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/psDashboard/psDashboardTemplate.html","\r\n<div class=\"ps-dashboard-header\">\r\n    {{title}}\r\n    <div class=\"ps-dashboard-controls\">\r\n\r\n        <div class=\"dropdown\">\r\n            <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-expanded=\"true\">\r\n                <i class=\"fa fs-plus\"></i>\r\n                   Add Widgets\r\n                <span class=\"caret\"></span>\r\n            </button>\r\n            <ul class=\"dropdown-menu\" role=\"menu\" aria-lebelledby=\"dropdownMenu\">\r\n                <li ng-repeat=\"widget in widgetDefinitions\">\r\n                    <a role=\"menuitem\" ng-click=\"addNewWidget(widget)\">{{widget.title}}</a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div gridster=\"gridsterOpts\">\r\n    <ul>\r\n        <li gridster-item=\"item\" ng-repeat=\"item in widgets\">\r\n            <ps-widget-body>\r\n\r\n            </ps-widget-body>\r\n        </li>\r\n    </ul>\r\n</div>");
$templateCache.put("ext-modules/psDashboard/psWidgetBodyTemplate.html","\r\n<div class=\"ps-widget-body\">\r\n    <div class=\"ps-widget-menu-area btn-group\">\r\n        <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n            <i class=\"fa fa-bars\" ng-click=\"iconClicked()\" />\r\n        </a>\r\n        <ul class=\"dropdown-menu\" role=\"menu\">\r\n            <li ng-click=\"close()\"><i class=\"fa fa-2x fa-close\" ng-click=\"iconClicked()\"/></li>\r\n            <li ng-click=\"settings()\"><i class=\"fa fa-2x fa-gear\" ng-click=\"iconClicked()\"/></li>\r\n        </ul>\r\n    </div>\r\n</div>");}]);


angular.module('psDashboard').directive('psWidgetBody',
    ['$compile', '$modal',
        function ($compile, $modal) {
            return {
                templateUrl: 'ext-modules/psDashboard/psWidgetBodyTemplate.html',
                link: function (scope, element, attr) {
                    var newElement = angular.element(scope.item.template);
                    element.append(newElement);
                    $compile(newElement)(scope);

                    scope.close = function () {
                        scope.widgets.splice(scope.widgets.indexOf(scope.item), 1);
                    }

                    scope.settings = function () {
                        var options = {
                            templateUrl: scope.item.widgetSettings.templateUrl,
                            controller: scope.item.widgetSettings.controller,
                            scope: scope
                        };
                        $modal.open(options);
                    };

                    scope.iconClicked = function () {
                        //this is an empty function used by ng-click so icon clicks are not
                        //intercepted by widgets
                    };
                }
            }
        }
    ])


angular.module('psDashboard').directive('psDashboard', function () {
    return {
        templateUrl: 'ext-modules/psDashboard/psDashboardTemplate.html',
        link: function (scope, element, attrs) {
            scope.addNewWidget = function (widget) {
                var newWidget = angular.copy(widget.settings);
                scope.widgets.push(newWidget);
            }
        }
    };
});