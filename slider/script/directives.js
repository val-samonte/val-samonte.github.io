'use strict';

angular.module('sliderDemo')
  .directive('timeInput', function (timeUtility) {
    return {
      restrict: 'E',
      scope: {
        data: '=ngModel'
      },
      template:
        '<input type="number" class="time-input" ng-model="in_hour" min="0" max="23"> : ' +
        '<input type="number" class="time-input" ng-model="in_minute" min="0" max="59">',
      link: function (scope, elem, attr) {
        scope.in_hour = 0;
        scope.in_minute = 0;
        scope.$watch('data', function () {
          var time = timeUtility.toTime(scope.data);
          scope.in_hour = scope.out_hour = time.hours;
          scope.in_minute = scope.out_minute = time.minutes;
        });
        scope.$watch('in_hour', function () {
          if(scope.in_hour != scope.out_hour) {
            scope.data = timeUtility.toValue(scope.in_hour, scope.in_minute);
          }
        });
        scope.$watch('in_minute', function () {
          if(scope.in_minute != scope.out_minute) {
            scope.data = timeUtility.toValue(scope.in_hour, scope.in_minute);
          }
        });
      }
    }
  })
