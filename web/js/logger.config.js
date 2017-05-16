(function () {
    'use strict';

    angular.module('loggerapp')
        .config(loggerConfiguration);

    loggerConfiguration.$inject = ["$provide", "$logProvider"];

    function loggerConfiguration($provide, $logProvider) {
        $logProvider.debugEnabled(true);
        $provide.decorator('$log', logDecorator);

        logDecorator.$inject = ["$delegate"];
        function logDecorator($delegate) {
            // Save the original $log.debug()
            var debugFn = $delegate.debug;

            $delegate.debug = function () {
                var args = [].slice.call(arguments),
                    now = moment().format('LTS');

                // Prepend timestamp
                args[0] = supplant("{0} - {1}", [now, args[0]]) + stackTrace();

                // Call the original with the output prepended with formatted timestamp
                debugFn.apply(null, args);
            };

            return $delegate;
        }



        function stackTrace() {
            var err = new Error();
            Error.stackTraceLimit = 1;
            return err.stack;
        }

        function supplant(template, values, pattern) {
            pattern = pattern || /\{([^\{\}]*)\}/g;
            return template.replace(pattern, function (a, b) {
                var p = b.split('.'),
                    r = values;
                try {
                    for (var s in p) { r = r[p[s]]; }
                } catch (e) {
                    r = a;
                }
                return (typeof r === 'string' || typeof r === 'number') ? r : a;
            });
        }

    }
}());