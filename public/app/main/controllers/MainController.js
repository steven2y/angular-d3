define([
    'angular',
    'app/boot',
    '../directives/wordGraph/wordGraph'
], function (angular) {
    return angular.module('main')
        .controller('MainController', function ($scope) {
            $scope.words = {
                sentence: 'The Royal The The The The The The The The The The Proclamation of 1763 created the Province of Quebec out of New France, and annexed Cape Breton Island to Nova Scotia.[15] St. Johns Island (now Prince Edward Island) became a separate colony in 1769.[42] To avert conflict in Quebec, the British passed the Quebec Act of 1774, expanding Quebecs territory to the Great Lakes and Ohio Valley. It re-established the French language, Catholic faith, and French civil law there. This angered many residents of the Thirteen Colonies, fuelling anti-British sentiment in the years prior to the 1775 outbreak of the American Revolution.[15]',
                processed:''
            };
        });
});