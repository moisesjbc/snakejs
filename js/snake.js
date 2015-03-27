var stage;
var CELL_SIZE = 20;
var snake = [];
var direction = new Direction( 'right' );
var canvasWidth, canvasHeight;
var snakeSize = 3;
var snakeTailIndex;
var snakeHeadIndex;

function init()
{
	stage = new createjs.Stage( "snakeCanvas" );

	for( i = 0; i < snakeSize; i++ ){
		snake[i] = new createjs.Shape();
		snake[i].graphics.beginFill("black");
		snake[i].graphics.drawRect( 0, 0, CELL_SIZE, CELL_SIZE );
		stage.addChild( snake[i] );
	}
	resetSnake();
	
	canvasWidth = document.getElementById( "snakeCanvas" ).width;
	canvasHeight = document.getElementById( "snakeCanvas" ).height;

	createjs.Ticker.setFPS( 5 );
	createjs.Ticker.addEventListener( "tick", update );

	document.addEventListener( "keydown", handleKeyDown );
}


function resetSnake()
{
	snakeTailIndex = 0;
	snakeHeadIndex = snakeSize - 1;
	for( i = 0; i < snakeSize; i++ ){
		snake[i].x = i * CELL_SIZE;
		snake[i].y = 0;
		direction.set( 'right' );
	}
}


function update()
{
	snake[snakeTailIndex].x = snake[snakeHeadIndex].x + direction.x * CELL_SIZE;
	snake[snakeTailIndex].y = snake[snakeHeadIndex].y + direction.y * CELL_SIZE;

	snakeHeadIndex = ( snakeHeadIndex + 1 ) % snakeSize;
	snakeTailIndex = ( snakeTailIndex + 1 ) % snakeSize;
	
	if( snake[snakeHeadIndex].x < 0 || 
	    snake[snakeHeadIndex].x > canvasWidth ||
	    snake[snakeHeadIndex].y < 0 ||
	    snake[snakeHeadIndex].y > canvasHeight ){
		resetSnake();
	}

	stage.update();
}


function handleKeyDown( event )
{
	if( event.keyCode == 37 && direction.label != 'right' ){
		direction.set( 'left' );
	}else if( event.keyCode == 39 && direction.label != 'left' ){
		direction.set( 'right' );
	}else if( event.keyCode == 38 && direction.label != 'down' ){
		direction.set( 'up' );
	}else if( event.keyCode == 40 && direction.label != 'up' ){
		direction.set( 'down' );
	}
}
