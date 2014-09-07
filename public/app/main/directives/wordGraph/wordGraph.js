define([
    'angular',
    'app/boot',
    'd3'
], function (angular) {
    'use strict';
    return angular.module('main.directives')
        .controller('wordGraphController', ['$scope', '$timeout', function ($scope, $timeout) {

            this.addWords = function (words, nodes, links) {
                var tick = function (words, count) {
                    if (count < words.length) {
                        this.addWord(words[count], words[count - 1], nodes, links);
                        count++;
                        $timeout(function () {
                            console.log('hehe');
                            tick(words, count++);
                        }, 500);
                    }
                }.bind(this);
                tick(words, 0);
            };

            //append a word node will create a a new node if the word does not exist
            //otherwise it will find the current one
            this.appendWordNode = function(word, nodes) {
                var node = nodes.filter(function (node) {
                    return word == node.word;
                });

                if (node.length == 0) {
                    node = {x: 0, y: 0, word: word, count: 0};
                    nodes.push(node);
                } else {
                    node = node[0];
                }

                return node;
            }

            this.addWord = function(word, previousWord, nodes, links) {

                var node = this.appendWordNode(word, nodes);

                node.count++;
                if (previousWord) {
                    nodes.forEach(function (target) {
                        if (previousWord == target.word && word != previousWord) {
                            links.push({source: node, target: target});
                        }
                    });
                }
                $scope.render();
            };


        }])
        .directive('wordGraph', ['$timeout', function ($timeout) {
            return {
                scope: {
                    sentence: '=',
                    processed: '='
                },
                restrict: 'E',
                require: 'wordGraph',
                replace: true,
                controller: 'wordGraphController',
                link: function (scope, element, attr, wgController) {
                    var wordString = scope.sentence;

                    wordString = wordString.replace(/\W+/g, " ");
                    scope.words = wordString.toLowerCase();
                    var wordStringArray = wordString.toLowerCase().split(' ');

                    var width = 800,
                        height = 600;

                    var fill = d3.scale.category20();

                    var force = d3.layout.force()
                        .size([width, height])
                        .linkDistance(30)
                        .charge(-200)
                        .on("tick", tick);

                    var svg = d3.select(element.find('svg')[0])
                        .attr("width", width)
                        .attr("height", height)
                        .on("mousemove", mousemove);

                    svg.append("rect")
                        .attr("width", width)
                        .attr("height", height);

                    var nodes = force.nodes(),
                        links = force.links(),
                        node = svg.selectAll(".node"),
                        link = svg.selectAll(".link");

                    var cursor = svg.append("circle")
                        .attr("r", 30)
                        .attr("transform", "translate(-100,-100)")
                        .attr("class", "cursor");


                    function mousemove() {
                        cursor.attr("transform", "translate(" + d3.mouse(this) + ")");
                    }




                    function tick() {
                        //update locations
                        link.attr("x1", function (d) {
                            return d.source.x;
                        })
                            .attr("y1", function (d) {
                                return d.source.y;
                            })
                            .attr("x2", function (d) {
                                return d.target.x;
                            })
                            .attr("y2", function (d) {
                                return d.target.y;
                            });

                        node.attr("transform", function (d, i) {
                            return "translate(" + d.x + "," + d.y + ")";
                        });
                    }

                    scope.render = function() {
                        link = link.data(links);

                        link.enter().insert("line", ".node")
                            .attr("class", "link");

                        node = node.data(nodes);


                        var containers = node.enter()
                            .append("g")
                            .attr("class", "node")
                            .call(force.drag);


                        containers.append("circle")
                            .attr("r", 1)
                            .attr("class", "circle")
                            .attr("fill", function (d) {
                                return fill(d.word.length);
                            });

                        containers.append('text')
                            .attr("class", "label")
                            .attr('text-anchor', 'middle')
                            .text(function (d) {
                                return d.word;
                            });


                        //refresh the circle size
                        node.selectAll('.circle')
                            .attr('r', function (d) {
                                return Math.ceil(d.count / 5) * 5;
                            });

                        force.start();
                    }

                    wgController.addWords(wordStringArray, nodes, links);

                },
                templateUrl: 'app/main/directives/wordGraph/wordGraph.html'
            };
        }
        ]);
});