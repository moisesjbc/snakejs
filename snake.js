var stage;
var CELL_SIZE = 20;
var snakeHead;
var direction = { label:'right', x:1, y:0 };
var canvasWidth, canvasHeight;

function init()
{
	stage = new createjs.Stage( "snakeCanvas" );

	snakeHead = new createjs.Shape();
	snakeHead.graphics.beginFill("black");
	snakeHead.graphics.drawRect( 0, 0, CELL_SIZE, CELL_SIZE );
	snakeHead.x = 0;
	snakeHead.y = 0;
	stage.addChild( snakeHead );

	canvasWidth = document.getElementById( "snakeCanvas" ).width;
	canvasHeight = document.getElementById( "snakeCanvas" ).height;

	createjs.Ticker.setFPS( 5 );
	createjs.Ticker.addEventListener( "tick", update );

	document.addEventListener( "keydown", handleKeyDown );
}


function update()
{
	snakeHead.x += direction.x * CELL_SIZE;
	snakeHead.y += direction.y * CELL_SIZE;

	if( snakeHead.x < 0 || 
	    snakeHead.x > canvasWidth ||
	    snakeHead.y < 0 ||
	    snakeHead.y > canvasHeight ){
		snakeHead.x = 0;
		snakeHead.y = 0;
		direction.label = 'right';
		direction.x = 1;
		direction.y = 0;
	}

	stage.update();
}


function handleKeyDown( event )
{
	if( event.keyCode == 37 && direction.label != 'right' ){
		direction.label = 'left';
		direction.x = -1;
		direction.y = 0;
	}else if( event.keyCode == 39 && direction.label != 'left' ){
		direction.label = 'right';
		direction.x = 1;
		direction.y = 0;
	}else if( event.keyCode == 38 && direction.label != 'down' ){
		direction.label = 'up';
		direction.x = 0;
		direction.y = -1;
	}else if( event.keyCode == 40 && direction.label != 'up' ){
		direction.label = 'down';
		direction.x = 0;
		direction.y = 1;
	}
}
