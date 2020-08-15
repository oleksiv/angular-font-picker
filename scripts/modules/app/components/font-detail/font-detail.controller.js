'use strict';

export default function FontDetailController($scope, font) {
    $scope.font = font;
    $scope.content = 'Almost before we knew it, we had left the ground.';
    $scope.fontSize = 40;

    $scope.style = function () {
        return {'font-size': $scope.fontSize};
    }
}
