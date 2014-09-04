define([
    'angular',
    'app/boot',
    '../directives/wordBubbles/wordBubbles'
], function (angular) {
    return angular.module('main')
        .controller('MainController', function ($scope) {
            $scope.greeting = 'Hello World';
        });
});