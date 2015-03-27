var stage;
var CELL_SIZE = 20;
var snakeHead;
var direction = { x:1, y:0 };

function init()
{
	stage = new createjs.Stage( "snakeCanvas" );

	snakeHead = new createjs.Shape();
	snakeHead.graphics.beginFill("black");
	snakeHead.graphics.drawRect( 0, 0, CELL_SIZE, CELL_SIZE );
	snakeHead.x = 0;
	snakeHead.y = 0;
	stage.addChild( snakeHead );

	createjs.Ticker.setFPS( 5 );
	createjs.Ticker.addEventListener( "tick", update );
}


function update()
{
	snakeHead.x += direction.x * CELL_SIZE;
	snakeHead.y += direction.y * CELL_SIZE;
	stage.update();
}
