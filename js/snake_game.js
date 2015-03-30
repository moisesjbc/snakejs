"use strict";
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

	food = new Food( stage );

	createjs.Ticker.setFPS( 10 );
	createjs.Ticker.addEventListener( "tick", update );

	document.addEventListener( "keydown", handleKeyDown );
}


function update( event )
{
	if( !event.paused ){
		if( !snake.update( stage, food ) || victory() ){
			var msg;
			if( victory() ){
				msg = 'Victory!';
			}else{
				msg = 'Game over';
			}
			createjs.Ticker.paused = true;
			alert( msg );
			snake.reset();
			food.reset();
			createjs.Ticker.paused = false;
		}
		stage.update();
	}
}


function handleKeyDown( event )
{
	if( event.keyCode === 37 ){
		snake.setDirection( 'left' );
	}else if( event.keyCode === 39 ){
		snake.setDirection( 'right' );
	}else if( event.keyCode === 38 ){
		snake.setDirection( 'up' );
	}else if( event.keyCode === 40 ){
		snake.setDirection( 'down' );
	}
}


function victory()
{
	return (snake.body.length >= ( (canvasWidth / CELL_SIZE) * (canvasHeight / CELL_SIZE) ) );
}
