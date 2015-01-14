angular.module('wayfinder', ['ngRoute', 'LocalStorageModule'])


  .controller('MainCtrl', function($scope, $routeParams, mapData) {

    mapData.checkGalleryData();

    $scope.currentFloor = 1;

    $scope.changeFloor = function(floorNo) {
      if(floorNo == 1) {
        TweenMax.to('.floors .first', 1, { top: 0, autoAlpha: 1, delay: 1, ease: Back.easeOut });
        TweenMax.to('.floors .second', 1, { top: -100, autoAlpha: 0, delay: 0.25, ease: Back.easeIn });
        $scope.currentFloor = 1;
      } else if(floorNo == 2) {
        TweenMax.to('.floors .first', 1, { top: 100, autoAlpha: 0, delay: 0.25, ease: Back.easeIn });
        TweenMax.to('.floors .second', 1, { top: 0, autoAlpha: 1, delay: 1, ease: Back.easeOut });
        $scope.currentFloor = 2;
      }
    }

    $scope.galleryBtnClick = function(galleryIndex, event) {
      var oldFloor = $scope.currentFloor;
      TweenMax.from(event.target, 0.5, { scaleX: 1.2, scaleY: 1.2, ease: Back.easeOut });
      if($scope.currentFloor == 1) {
        switch(galleryIndex) {
          case 1:

            break;
          case 2:

            break;
          case 3:
            $scope.changeFloor(2);
            break;
          case 4:
            $scope.changeFloor(2);
            break;
        }
      } else if($scope.currentFloor == 2) {
        switch(galleryIndex) {
          case 1:
            $scope.changeFloor(1);
            break;
          case 2:
            $scope.changeFloor(1);
            break;
          case 3:

            break;
          case 4:

            break;
        }
      }
      $scope.showGallery(galleryIndex, oldFloor);
    }

    $scope.showGallery = function(galleryIndex, floor) {

      $scope.gallery = mapData.getGalleryData(galleryIndex);

      var indeces = ['i','ii','iii','iv'], i=0, delay = 0.5;
      if(floor != $scope.currentFloor) {
        delay += 1;
      }
      for(i; i<indeces.length; i++) {
        TweenMax.to('.'+indeces[i], 0.25, { delay: delay + (i*0.1), autoAlpha:0 });
      }
      TweenMax.to('.back', 0.35, { delay: 1, autoAlpha: 1 });
      TweenMax.to('.fade', 0.35, { delay: 0.3 + delay, autoAlpha: 1 });
      TweenMax.to('.info', 0.35, { delay: 0.5 + delay, autoAlpha: 1 });
    }

    $scope.hideGallery = function() {
      var indeces = ['i','ii','iii','iv'], i=0;
      for(i; i<indeces.length; i++) {
        TweenMax.to('.'+indeces[i], 0.25, { delay: (i*0.1), autoAlpha:1 });
      }
      TweenMax.to('.back', 0.35, { delay: 0.35, autoAlpha: 0 });
      TweenMax.to('.fade', 0.35, { delay: 0.1, autoAlpha: 0 });
      TweenMax.to('.info', 0.35, { autoAlpha: 0 });
    }

    $scope.back = function() {
      TweenMax.from('.back', 0.5, { scaleX: 1.2, scaleY: 1.2, ease: Back.easeOut });
      $scope.hideGallery();
    }

    $scope.selected = undefined;
    $scope.itemClick = function(item) {
      $scope.selected = item;
    }
    /*
    $scope.stageClick = function(evt) {
      if($scope.selected) {
        $scope.selected.x = evt.x;
        $scope.selected.y = evt.y;
        mapData.updateGalleryData($scope.gallery.id, $scope.gallery);
      }
    }
    window.exportMap = mapData.exportMap;
    */
  })

  .controller('DebugCtrl', function($scope, $routeParams) {

  })

  .config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'view/main.html',
      controller: 'MainCtrl'
    })
    .when('/debug', {
      templateUrl: 'view/debug.html',
      controller: 'DebugCtrl'
    });

  })


