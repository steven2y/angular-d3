
require.config({
    paths: {
        jquery: 'vendor/jquery/dist/jquery',
        angular: 'vendor/angular/angular',
        'angular-route': 'vendor/angular-route/angular-route',
        d3: 'vendor/d3/d3'
    },
    shim: {
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular'],
            exports: 'ngRoute'
        }
    }
});
require([
    'angular',
    'angular-route',
    'app/boot',
    'app/route'
], function (angular) {
    angular.bootstrap(document, ['myApp']);
});