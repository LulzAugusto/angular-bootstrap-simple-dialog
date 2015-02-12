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
         *                     title - string - modal title
         *                     message - string - modal message
         *                     confirmButton - string - confirmation button text
         *                     cancelButton - string - cancel button text
         *                     showCancel - boolean - flag that determines if the cancel button will appear
         *                     confirm - function() - callback to be executed on confirm
         *                     cancel - function() - callback to be executed on cancel
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
