(function () {
    'use strict';

    angular.module('loggerapp')
        .factory('logger', logger);

    logger.$inject = ['$log'];

    function logger($log) {

        var service = {
            debug: debug,
            error: error,
            info: info,
            warn: warn,
            log: $log.log
        };

        return service;

        function debug(message, data) {
            $log.debug('Debug: ' + message, data);
        }

        function error(message, data) {
            $log.error('Error: ' + message, data);
        }
        function info(message, data) {
            $log.info('Info: ' + message, data);
        }
        function warn(message, data) {
            $log.warn('Warn: ' + message, data);
        }


    }

}());