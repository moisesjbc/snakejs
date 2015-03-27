var stage;
var CELL_SIZE = 20;

function init()
{
	stage = new createjs.Stage( "snakeCanvas" );

	var snakeHead = new createjs.Shape();
	snakeHead.graphics.beginFill("black").drawRect( 0, 0, CELL_SIZE, CELL_SIZE );
	snakeHead.x = 0;
	snakeHead.y = 0;
	stage.addChild( snakeHead );

	stage.update();
}
