define([
    'angular',
    'app/boot',
    'd3'
], function (angular) {
    'use strict';
    return angular.module('main.directives')
        .controller('wordBubblesController', ['$scope', function($scope){



        }])
        .directive('wordBubbles', [function () {
            return {
                scope: {},
                restrict: 'E',
                replace: true,
                controller: 'wordBubblesController',
                link: function (scope, element) {
                    var data = [32, 57, 112, 293];

                    d3.select(element[0])
                        .attr('width','800px')
                        .attr('height','100px')
                      .selectAll('circle')
                      .data(data)
                      .enter().append('circle')
                        .attr("cy", 60)
                        .attr("cx", function(d, i) { return i * 100 + 30; })
                        .attr("r", function(d) { return Math.sqrt(d); });



                },
                templateUrl: 'app/main/directives/wordBubbles/wordBubbles.html'
            };
        }
    ]);
});