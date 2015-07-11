(function() {
  'use strict';

  angular.module('tictactoe', [])
    .controller('MainController', MainController)
    .directive('t3Tile', tileDirective)
    .directive('t3Player', playerPaneDirective);


  function MainController($scope) {

    $scope.rounds = 1;
    $scope.winner = undefined;

    $scope.symbolsAvailable = [
      'fontawesome-star',
      'fontawesome-heart',
      'fontawesome-bolt',
      'fontawesome-cloud',
      'fontawesome-leaf'
    ];

    $scope.player1 = {
      id: 1,
      name: 'Player 1',
      score: 0,
      symbol: $scope.symbolsAvailable[2]
    };

    $scope.player2 = {
      id: 2,
      name: 'Player 2',
      score: 0,
      symbol: $scope.symbolsAvailable[3]
    };

    $scope.currentTurn = $scope.player1;

    $scope.action = function(player, tile) {

      // check if the tile is not yet marked out
      if(!angular.isDefined(tile.symbol)) {

        // use the symbol that the current player has
        tile.symbol = player.symbol;

        // end current player's turn
        if(player == $scope.player1) {
          $scope.currentTurn = $scope.player2;
        } else {
          $scope.currentTurn = $scope.player1;
        }

        $scope.moves++;

        // check if we have a winner!
        // returns:
        //  player1 object if player 1 wins
        //  player2 object if player 2 wins
        //  true if draw
        //  false if round is not yet over
        var result = tileCheck();

        if(result) {
          $scope.winner = result;
          if(result !== true) {
            result.score++;
          }
          $scope.rounds++;
        }

      }

    };

    $scope.nextRound = function() {
      if($scope.winner != $scope.player1) {
        $scope.currentTurn = $scope.player1;
      } else {
        $scope.currentTurn = $scope.player2;
      }
      $scope.winner = undefined;
      initializeGrid();
    }

    initializeGrid();

    // functions below should be moved to a service. avoid polluting controllers with logic.
    // for the sake of the exercise' simplicity, i avoided the use of services.

    function initializeGrid() {
      $scope.tiles = [];
      for(var i=0; i<9; i++) {
        var tile = {
          symbol: undefined
        };
        $scope.tiles.push(tile);
      }
    }

    function tileCheck() {
      var out = [], i=0, endFlag = true,
          winningPatterns = [
            // horizontal
            [0,1,2],
            [3,4,5],
            [6,7,8],
            // vertical
            [0,3,6],
            [1,4,7],
            [2,5,8],
            // diagonal
            [0,4,8],
            [2,4,6]
          ];

      for(i=0; i<$scope.tiles.length; i++) {
        var tile = $scope.tiles[i];
        if(tile.symbol == $scope.player1.symbol) {
          out.push(parseInt($scope.player1.id));
        } else if(tile.symbol == $scope.player2.symbol) {
          out.push(parseInt($scope.player2.id));
        } else {
          endFlag = false;
          out.push(undefined);
        }
      }

      for(i=0; i< winningPatterns.length; i++) {
        var result = extract(winningPatterns[i], out);
        if(result) {
          highlight(winningPatterns[i]);
          if($scope.player1.id == result) {
            return $scope.player1;
          } else {
            return $scope.player2;
          }
          return result;
        }
      }

      if(endFlag) return true;

      return false;
    }


    function extract(pattern, input) {
      if(input[pattern[0]] === input[pattern[1]] &&
         input[pattern[1]] === input[pattern[2]]) {
        return input[pattern[0]];
      }
      return false;
    }

    function highlight(pattern) {
      $scope.tiles[pattern[0]].highlight = true;
      $scope.tiles[pattern[1]].highlight = true;
      $scope.tiles[pattern[2]].highlight = true;
    }

  }

  function tileDirective() {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      template: '<div class="tile" ng-class="{ \'highlight\': data.highlight }"><i class="symbol" ng-class="data.symbol"></i></div>'
    }
  }

  function playerPaneDirective() {
    return {
      restrict: 'E',
      scope: {
        data: '=',
        turn: '='
      },
      template:
        '<div class="player-pane">' +
          '<div class="player-chip wobble" ng-class="{ \'turn\': turn }">' +
            '<p class="message">Your Turn</p>' +
            '<p class="player-name" ><i class="icon" ng-class="data.symbol"></i><input type="text" ng-model="data.name"></p>' +
            '<p>Score: {{ data.score }}</p>' +
          '</div>' +
        '</div>'
    }
  }

})();
