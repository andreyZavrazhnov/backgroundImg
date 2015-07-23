describe('hero -', function () {
    'use strict';

    var element2,
        element1,
        $scope,
        $compile,
        template2,
        template1,
        $timeout,
        ctrl2,
        ctrl1,

        html2 = '<img class="img-responsive ng-scope" data-ng-src="" alt="Caribbean" err-src="http://img.allw.mn/content/ll/zu/wmvmvnli54f5d0180c441942510624.jpg" />',
        html1 = '<img class="img-responsive ng-scope" data-ng-src="http://photos.cntraveler.com/2014/07/31/53da8980dcd5888e145bacdd_2-moorea-opunohu-bay.jpg"  alt="Caribbean" err-src="http://img.allw.mn/content/ll/zu/wmvmvnli54f5d0180c441942510624.jpg" />';

    beforeEach(module('hero'));
    beforeEach(inject(function (_$rootScope_, _$compile_, _$timeout_) {
        $compile = _$compile_;
        $timeout = _$timeout_;
        $scope = _$rootScope_.$new();
        element2 = angular.element(html2);
        element1 = angular.element(html1);
        template2 = $compile(element2)($scope);
        template1 = $compile(element1)($scope);
        ctrl2 = element2.controller('errSrc');
        ctrl1 = element1.controller('errSrc');
        $scope.$apply();
    }));

    describe('Hero Directive is available', function () {

        it('should show that controller of the directive is available', function () {
            expect(ctrl2).toBeDefined();
        });

        it('should show that controller of the directive is available', function () {
            expect(ctrl1).toBeDefined();
        });

        describe('Testing source path for panarama image is empty', function () {

            it('should show that fallback image occurs if source path for panarama image is empty', function () {
                expect(element2.attr('src')).toBe('http://img.allw.mn/content/ll/zu/wmvmvnli54f5d0180c441942510624.jpg');
            });

            it('should show that there was an event if source path for panarama image is empty', function () {
                spyOn($scope, '$emit');
                $timeout.flush();
                expect($scope.$emit).toHaveBeenCalledWith('emptySrc', true);
            });
        });

        describe('Testing if an error occurs', function () {
            it('should show that error occurs', function () {
                spyOn($scope, '$emit');
                element1.triggerHandler('error');
                expect($scope.$emit).toHaveBeenCalledWith('errorSrc', true);
            });
        });
    });
});
