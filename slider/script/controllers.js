'use strict';

angular.module('sliderDemo')
  .controller('DemoCtrl', function($scope, timeEntry, timeUtility) {

    $scope.timeSliderWidth = 400;

    $scope.measures = [
      { label: 'Hour', step: timeUtility.minuteToFraction(60), points: [] },
      { label: 'Quarter', step: timeUtility.minuteToFraction(15), points: [] }
    ];

    // populate hairlines
    for(var i=0; i<$scope.measures.length; i++) {
      $scope.measures[i].points = [];
      for(var j=0; j<1; j+= $scope.measures[i].step) {
        console.log();
        $scope.measures[i].points.push(j);
      }
    }

    $scope.zoomIndex = 0;

    $scope.zoomPoints = [
      { multiplier: 1, step: timeUtility.minuteToFraction(15) },
      { multiplier: 1.4, step: timeUtility.minuteToFraction(10) },
      { multiplier: 1.8, step: timeUtility.minuteToFraction(5) },
      { multiplier: 2.2, step: timeUtility.minuteToFraction(1) }
    ];

    $scope.zoomOn = function (delta) {
      $scope.zoomIndex += delta;
      if($scope.zoomIndex<0) {
        $scope.zoomIndex = 0;
      } else if($scope.zoomIndex >= $scope.zoomPoints.length) {
        $scope.zoomIndex = $scope.zoomPoints.length - 1;
      }
      $scope.zoom = $scope.zoomPoints[$scope.zoomIndex].multiplier * $scope.timeSliderWidth;
      $scope.step = $scope.zoomPoints[$scope.zoomIndex].step * $scope.zoom;
    };

    $scope.onSliderScroll = function (event, delta) {
      $scope.zoomOn(delta);
      event.preventDefault();
    };

    $scope.zoomOn(0);

    $scope.minDate = new Date();

    $scope.datePick = new Date();

    $scope.entryTypes = [
      timeEntry.newType('Clock in', 'start', 'log'),
      timeEntry.newType('Clock out', 'end', 'log'),
      timeEntry.newType('Start break', 'start', 'break'),
      timeEntry.newType('End break', 'end', 'break')
    ];

    timeEntry.setDate( $scope.datePick );

    $scope.entries = timeEntry.getEntries;

    $scope.newTimeHour = 0;

    $scope.newTimeMin = 0;

    $scope.createEntry = function () {
      if(typeof $scope.newType != 'undefined') {
        if(!($scope.newType.getData().group == 'break' && typeof $scope.newReason == 'undefined')) {
          timeEntry.setDate( $scope.datePick );
          timeEntry.create( $scope.newType, timeUtility.toValue($scope.newTimeHour, $scope.newTimeMin), $scope.newReason );
          $scope.newTimeHour = 0;
          $scope.newTimeMin = 0;
          $scope.newReason = undefined;
        } else {
          alert('Please provide your reason for taking a break.');
        }
      } else {
        alert('Please select entry type.');
      }
    };

    $scope.removeEntry = function (entry) {
      timeEntry.remove(entry);
    }

  })
