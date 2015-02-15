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
