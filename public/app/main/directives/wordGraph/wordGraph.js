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
                $scope.processed.push(word);

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
                    processed: '=',
                    height: '=',
                    width:'='
                },
                restrict: 'E',
                require: 'wordGraph',
                replace: true,
                controller: 'wordGraphController',
                link: function (scope, element, attr, wgController) {

                    var width = scope.width,
                        height = scope.height;

                    var fill = d3.scale.category20();



                    var svg = d3.select(element.find('svg')[0])
                        .attr("width", width)
                        .attr("height", height)
                        .on("mousemove", mousemove);

                    svg.append("rect")
                        .attr("width", width)
                        .attr("height", height);

                    var nodes = [],
                        links = [],
                        node = svg.selectAll(".node"),
                        link = svg.selectAll(".link");

                    var force = d3.layout.force()
                        .size([width, height])
                        .linkDistance(30)
                        .charge(-200)
                        .on("tick", tick);

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

                        link.exit().remove();

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

                        node.exit().remove();


                        //refresh the circle size
                        node.selectAll('.circle')
                            .attr('r', function (d) {
                                return Math.ceil(d.count / 5) * 5;
                            });

                        force.start();
                    }

                    scope.startProcess = function() {

                        var wordString = scope.sentence.replace(/\W+/g, " "),
                        wordStringArray = wordString.toLowerCase().split(' ');

                        //reset nodes and links
                        scope.processed = [];

                        nodes = [];
                        force.nodes(nodes);
                        links = [];
                        force.links(links);

                        wgController.addWords(wordStringArray, nodes, links);
                    };
                },
                templateUrl: 'app/main/directives/wordGraph/wordGraph.html'
            };
        }
        ]);
});