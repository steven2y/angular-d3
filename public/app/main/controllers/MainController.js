define([
    'angular',
    'app/boot',
    '../directives/wordGraph/wordGraph'
], function (angular) {
    return angular.module('main')
        .controller('MainController', function ($scope) {
            $scope.words = {
                sentence:'',
                processed:''
            };


            $scope.sentencePreview = [];
            $scope.sentenceStats = [];

            $scope.$watchCollection('words.processed', function(newVal, oldVal){
                $scope.sentencePreview = newVal.slice(-7);
                $scope.sentenceStats = sentenceStats(newVal);
            });

            var sentenceStats = function(sentence) {
                var results = {};
                angular.forEach(sentence, function(word){
                    if(!angular.isDefined(results[word])){
                        results[word] = 0 ;
                    }
                    results[word]++;
                });

                results = $.map(results, function(count, word){
                    return {word: word, count:count};
                });

                return results;
            }


        });
});