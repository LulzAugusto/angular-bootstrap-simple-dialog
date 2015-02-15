(function() {
    'use strict';

    angular
        .module('lz.simple-dialog', ['lz.simple-dialog.tpls']);
})();

angular.module("lz.simple-dialog.tpls", []).run(["$templateCache", function($templateCache) {$templateCache.put("template.html","<header class=\"modal-header\">\n    <button class=\"close\" type=\"button\" ng-click=\"dialog.cancel()\"><span class=\"glyphicon glyphicon-remove\" ></span></button>\n    <h3 class=\"modal-title\">{{dialog.title}}</h3>\n</header>\n<main class=\"modal-body\">\n    <p>{{dialog.message}}</p>\n</main>\n<footer class=\"modal-footer\">\n    <button ng-if=\"dialog.showCancel\" class=\"btn btn-default\" ng-click=\"dialog.cancel()\">{{dialog.secondaryButton}}</button>\n    <button class=\"btn btn-primary\" ng-click=\"dialog.confirm()\">{{dialog.primaryButton}}</button>\n</footer>\n");}]);
(function() {
    'use strict';

    angular
        .module('lz.simple-dialog')
        .controller('SimpleDialogController', SimpleDialogController);

    SimpleDialogController.$inject = ['$modalInstance', 'data'];

    /* @ngInject */
    function SimpleDialogController($modalInstance, data) {
        var vm = this;

        vm.confirm = confirm;
        vm.cancel = cancel;
        vm.message = data.message;
        vm.title = data.title;
        vm.primaryButton = data.primaryButton || 'Ok';
        vm.secondaryButton = data.secondaryButton || 'Cancel';
        vm.showCancel = data.showCancel || false;

        function confirm() {
            $modalInstance.close();
        }

        function cancel(){
            $modalInstance.dismiss();
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('lz.simple-dialog')
        .factory('SimpleDialog', SimpleDialog);

    SimpleDialog.$inject = ['$modal'];

    /* @ngInject */
    function SimpleDialog($modal) {
        var service = {
            show: show
        };
        return service;

        /**
         * TODO: A decent docs
         * Shows up a Bootstrap modal
         * @param  Object options Configuration object for the modal. It has the following properties
         *                            title - string - modal title
         *                            message - string - modal message
         *                            primaryButton - string - primary button button text content
         *                            secondaryButton - string - secondary button text content
         *                            showCancel - boolean - flag that determines if the cancel button will appear
         *                            confirm - function() - callback to be executed on confirm
         *                            cancel - function() - callback to be executed on cancel
         *                        It also accepts the following ui-bootstrap options:
         *                            backdrop
         *                            size
         */
        function show(options) {
            var modal = $modal.open({
                templateUrl: 'template.html',
                controller: 'SimpleDialogController',
                controllerAs: 'dialog',
                backdrop: options.backdrop || true,
                size: options.size || 'md',
                resolve: {
                    data: function() {
                        return {
                            title: options.title,
                            message: options.message,
                            primaryButton: options.primaryButton,
                            secondaryButton: options.secondaryButton,
                            showCancel: options.showCancel
                        };
                    }
                }
            });

            modal.result
                .then(options.confirm)
                .catch(options.cancel);
        }
    }
})();
