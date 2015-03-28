var stage;
var CELL_SIZE = 20;
var canvasWidth, canvasHeight;
var snake;
var food;

function init()
{
	stage = new createjs.Stage( "snakeCanvas" );

	snake = new Snake();
	snake.reset();
	
	canvasWidth = document.getElementById( "snakeCanvas" ).width;
	canvasHeight = document.getElementById( "snakeCanvas" ).height;

	createFood();

	createjs.Ticker.setFPS( 10 );
	createjs.Ticker.addEventListener( "tick", update );

	document.addEventListener( "keydown", handleKeyDown );	
}


function update()
{
	snake.update( stage, food );
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
	food = new Food( stage );
	alert( food.x );
}
