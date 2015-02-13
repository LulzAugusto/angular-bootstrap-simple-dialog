(function() {
    'use strict';

    angular
        .module('lz.simple-dialog', ['lz.simple-dialog.tpls']);
})();

angular.module("lz.simple-dialog.tpls", []).run(["$templateCache", function($templateCache) {$templateCache.put("template.html","<header class=\"modal-header\">\n    <button class=\"close\" type=\"button\" ng-click=\"dialog.cancel()\"><span class=\"glyphicon glyphicon-remove\" ></span></button>\n    <h3 class=\"modal-title\">{{dialog.title}}</h3>\n</header>\n<main class=\"modal-body\">\n    <p>{{dialog.message}}</p>\n</main>\n<footer class=\"modal-footer\">\n    <button ng-if=\"dialog.showCancel\" class=\"btn btn-default\" ng-click=\"dialog.cancel()\">{{dialog.cancelButton}}</button>\n    <button class=\"btn btn-primary\" ng-click=\"dialog.confirm()\">{{dialog.confirmButton}}</button>\n</footer>\n");}]);
(function() {
    'use strict';

    angular
        .module('lz.simple-dialog')
        .controller(SimpleDialogController);

    SimpleDialogController.$inject = ['$modalInstance', 'options'];

    /* @ngInject */
    function SimpleDialogController($modalInstance, options) {
        var vm = this;

        vm.confirm = confirm;
        vm.cancel = cancel;
        vm.message = data.message;
        vm.title = data.title;
        vm.confirmButton = data.confirmButton || 'Ok';
        vm.cancelButton = data.cancelButton || 'Cancel';
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
        .factory(SimpleDialog);

    SimpleDialog.$inject = ['$modal'];

    /* @ngInject */
    function SimpleDialog($modal) {
        var service = {
            show: show
        };
        return service;

        ////////////////

        /**
         * Shows up a Bootstrap modal
         * @param  Object options Configuration object for the modal. It has the following properties
         *                            title - string - modal title
         *                            message - string - modal message
         *                            confirmButton - string - confirmation button text
         *                            cancelButton - string - cancel button text
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
                            title: data.title,
                            message: data.message,
                            confirmButton: data.confirmButton,
                            cancelButton: data.cancelButton,
                            showCancel: data.showCancel
                        };
                    }
                }
            });

            modal.result
                .then(data.confirm)
                .catch(data.cancel);
        }
    }
})();
