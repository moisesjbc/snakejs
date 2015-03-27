var stage;
var CELL_SIZE = 20;
var canvasWidth, canvasHeight;
var snakeSize = 3;
var snake;

function init()
{
	stage = new createjs.Stage( "snakeCanvas" );

	snake = new Snake();
	snake.reset();
	
	canvasWidth = document.getElementById( "snakeCanvas" ).width;
	canvasHeight = document.getElementById( "snakeCanvas" ).height;

	createjs.Ticker.setFPS( 10 );
	createjs.Ticker.addEventListener( "tick", update );

	document.addEventListener( "keydown", handleKeyDown );

	createFood();
}


function update()
{
	snake.update( stage );
	stage.update();
}


function handleKeyDown( event )
{
	if( event.keyCode == 37 && snake.direction.label != 'right' ){
		snake.setDirection( 'left' );
	}else if( event.keyCode == 39 && snake.direction.label != 'left' ){
		snake.setDirection( 'right' );
	}else if( event.keyCode == 38 && snake.direction.label != 'down' ){
		snake.setDirection( 'up' );
	}else if( event.keyCode == 40 && snake.direction.label != 'up' ){
		snake.setDirection( 'down' );
	}
}


function createFood()
{
	var food = new createjs.Shape();
	food.graphics.beginFill( 'black' );
	food.graphics.drawRect( 0, 0, CELL_SIZE, CELL_SIZE );
	food.x = Math.floor( Math.random() * ( canvasWidth / CELL_SIZE ) ) * CELL_SIZE;
	food.y = Math.floor( Math.random() * ( canvasHeight / CELL_SIZE ) ) * CELL_SIZE;
	stage.addChild( food );
}
