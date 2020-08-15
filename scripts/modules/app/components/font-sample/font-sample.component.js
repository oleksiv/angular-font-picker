'use strict';

import app from "../../app.module.js";

export default app.component('fontSample', {
    templateUrl: 'scripts/modules/app/components/font-sample/font-sample.component.html',
    bindings: {
        font: '<',
        variant: '<',
        content: '<',
        fontSize: '<',
    },
    controller: ['$scope', function ($scope) {
        $scope.style = {};

        this.$onInit = function () {
            // Load font from remote url
            const fontFace = new FontFace($scope.getCurrentFontVariantUniqueName(), `url(${$scope.getCurrentVariantFile()})`);
            // Add font to the document
            fontFace.load().then((loadedFont) => {
                document.fonts.add(loadedFont);
            });
            // Apply styling to the component
            $scope.updateStyling();
        };

        this.$onChanges = function () {
            // Update style property when bound variables change
            $scope.updateStyling();
        }

        $scope.getCurrentVariantFile = function () {
            return $scope.replaceUnsecureProtocol($scope.$ctrl.font.files[$scope.$ctrl.variant]);
        }

        $scope.replaceUnsecureProtocol = function(str) {
            return str.replace('http://', 'https://');
        }

        $scope.getCurrentFontVariantUniqueName = function () {
            return $scope.$ctrl.font.family + $scope.$ctrl.variant;
        }

        $scope.updateStyling = function () {
            $scope.style = {
                'font-family': $scope.getCurrentFontVariantUniqueName(),
                'font-size': $scope.$ctrl.fontSize + 'px'
            };
        }
    }]
});
