angular.module('hero', [])

    .directive('errSrc', function ($timeout) {
        'use strict';
        return {
            restrict: 'A',
            scope: true,
            controller: function ($scope, $element, $attrs) {
                var error = false;
                $element.bind('error', function () {
                    if ($attrs.src !== $attrs.errSrc) {
                        error = true;
                        $attrs.$set('src', $attrs.errSrc);
                        $scope.$emit('errorSrc', error);
                    }
                });

                if ($attrs.ngSrc === '' || $attrs.src === undefined || $attrs.src === null) {
                    error = true;
                    $attrs.$set('src', $attrs.errSrc);
                    $timeout(function () {
                        $scope.$emit('emptySrc', error);
                    }, 1);

                }
            }
        };
    });