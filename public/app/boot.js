define([
    'angular',
    './main/main'
], function (angular) {

    angular.module('myApp', [
        'main',
        'ngRoute'
    ]);
});