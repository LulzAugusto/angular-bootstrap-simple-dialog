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
