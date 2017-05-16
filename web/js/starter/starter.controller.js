(function () {
    'use strict';

    angular.module('loggerapp')
        .controller('LoggerCtrl', LoggerCtrl);

    LoggerCtrl.$inject = ['$scope', 'logger']; 

    function LoggerCtrl($scope, logger) {
        var vm = $scope;
        vm.title = "Hello";
        
        vm.sayDebug = function () {
            logger.debug('User Details :: ', vm.user);
        };

        vm.sayError = function () {
            logger.error('Say Error!', vm.user);
        };
        vm.sayInfo = function () {
            logger.info('Say Info!', vm.user);
        };
        vm.sayWarn = function () {
            logger.warn('Say Warn!', vm.user);
        };

    }

}());