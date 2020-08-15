'use strict';

import app from "../../app.module.js";
import FontDetailController from "../font-detail/font-detail.controller.js";

export default app.component('fontCard', {
    templateUrl: 'scripts/modules/app/components/font-card/font-card.component.html',
    bindings: {
        font: '=',
        fontSize: '<',
        content: '<',
    },
    controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {
        $scope.style = {};

        this.$onInit = function () {
            // Load font from remote url
            const fontFace = new FontFace($scope.$ctrl.font.family, `url(${$scope.replaceUnsecureProtocol($scope.$ctrl.font.files.regular)})`);
            fontFace.load().then((loadedFont) => {
                document.fonts.add(loadedFont);
            });
            // Apply styling to the component
            $scope.style = {'font-size': $scope.$ctrl.fontSize + 'px', 'font-family': $scope.$ctrl.font.family};
        };

        this.$onChanges = function () {
            $scope.style = {...$scope.style, 'font-size': $scope.$ctrl.fontSize + 'px'}
        }

        $scope.replaceUnsecureProtocol = function (str) {
            return str.replace('http://', 'https://');
        }

        $scope.showDialog = function (ev) {
            $mdDialog.show({
                locals: {font: $scope.$ctrl.font},
                controller: FontDetailController,
                templateUrl: `scripts/modules/app/components/font-detail/font-detail.component.html`,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true,
            }).then(function (answer) {
                console.log('font picked');
            }, function () {
                console.log('font picker error');
            });
        };
    }]
})
