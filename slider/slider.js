angular.module('vds.slider',[])

  .directive('vdsSlider', function ($window) {
    return {
      scope: {
        step: '=',
        width: '=',
        measures: '=',
        data: '=ngModel',
      },
      replace: true,
      template:
        '<ul class="vds-slider" style="width: {{ width }}px; display: inline-block;" ng-mousemove="onMousemove($event)">' +
          '<li class="vds-hairline" ng-repeat="hair in measures[0].points" style="left: {{ hair*width }}px;">|</li>' +
          '<vds-stop-marker ng-repeat="marker in data" ng-model="marker" root-width="width" root-mouse-x="mouseX"></vds-stop-marker>' +
        '</ul>',
      link: function (scope, elem, attr, ctrl) {

        scope.width = elem[0].clientWidth;
        scope.onMousemove = function(e) {
          var bound = elem[0].getBoundingClientRect(), posx = e.pageX - bound.left;
          posx = Math.floor(posx/scope.step) * scope.step;
          if(posx >= bound.width) {
            posx = bound.width-1;
          } else if(posx < 0) {
            posx = 0;
          }
          scope.mouseX = posx;
        }

      }
    };
  })

  .directive('vdsStopMarker', function () {
    return {
      scope: {
        data: '=ngModel',
        rootWidth: '=',
        rootMouseX: '='
      },
      replace: true,
      template:
        '<li class="vds-stop-marker" style="left: {{ pos = (dragging? (data.val = rootMouseX / rootWidth) : data.val) * rootWidth }}px">' +
          '<button data-toggle="tooltip" data-placement="top" title="{{data.label}}" type="button" ng-mousedown="dragging = true" ng-mouseup="dragging = false"></button><div class="vds-pin"></div>'+
        '</li>',
      link: function (scope, elem, attr, ctrl) {
        elem.tooltip();
      }
    };
  })



