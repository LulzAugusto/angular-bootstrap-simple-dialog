(function(){
	'use strict';

	angular.module('demo', [
		'ui.bootstrap',
		'lz.simple-dialog'
	])
	.controller('DemoCtrl', ['$scope', 'SimpleDialog', function($scope, SimpleDialog){
		$scope.click = function() {
			SimpleDialog.show({
				title: 'Demo',
				message: 'This is a demo dialog!'
			});
		};
	}]);
})();
