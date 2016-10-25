function CheckerQuestionController($scope, $element, $attrs) {
  var ctrl = this;

  var original = [
    {color: 'white'},
    {color: 'white'},
    {color: 'white'},
    {color: ''},
    {color: 'black'},
    {color: 'black'},
    {color: 'black'}
  ];

  var swapArrayElements = function(indexA, indexB){
    var temp = ctrl.layout[indexA];
    ctrl.layout[indexA] = ctrl.layout[indexB];
    ctrl.layout[indexB] = temp;
  };

  var tryMakeMove = function(excludeIndex, index, spacesToAdd){

    var canMove = (index != excludeIndex && ctrl.layout[index + spacesToAdd].color === '');

    if (canMove){
      swapArrayElements(index, index + spacesToAdd);
      ctrl.moveCount++;
    }

    return canMove;
  };

  ctrl.$onInit = function(){
    ctrl.reset();
  };

  ctrl.reset = function(){
    ctrl.moveCount = 0;
    ctrl.layout = angular.copy(original);
  };

  ctrl.move = function(index){

    if (ctrl.layout[index].color == 'black'
      && (
        tryMakeMove(0, index, -1)
        || (index != 0 && tryMakeMove(1, index, -2))
      )
    ) {
      return;
    }

    if (ctrl.layout[index].color == 'white'
      && (
        tryMakeMove(6, index, 1)
        || index != 6 && tryMakeMove(5, index, 2)
      ))
      return;
  };
}

angular.module('mathQuestions',[])
  .component('checkerQuestion', {
    templateUrl: 'checker-question/checker-question.html',
    controller: CheckerQuestionController
  });