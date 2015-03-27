var stage;
var CELL_SIZE = 20;
var canvasWidth, canvasHeight;
var snakeSize = 3;
var snake;

function Snake(){
	this.body = [];
	this.direction = new Direction( 'right' );

	for( i = 0; i < snakeSize; i++ ){
		this.body[i] = new createjs.Shape();
		this.body[i].graphics.beginFill("black");
		this.body[i].graphics.drawRect( 0, 0, CELL_SIZE, CELL_SIZE );
		stage.addChild( this.body[i] );
	}
	
	this.reset = function(){
		this.tailIndex = 0;
		this.headIndex = snakeSize - 1;
		for( i = 0; i < snakeSize; i++ ){
			this.body[i].x = i * CELL_SIZE;
			this.body[i].y = 0;
			this.direction.set( 'right' );
		}
	}

	
	this.update = function( stage ){
		this.body[this.tailIndex].x = this.body[this.headIndex].x + this.direction.x * CELL_SIZE;
		this.body[this.tailIndex].y = this.body[this.headIndex].y + this.direction.y * CELL_SIZE;

		this.headIndex = ( this.headIndex + 1 ) % snakeSize;
		this.tailIndex = ( this.tailIndex + 1 ) % snakeSize;
	
		if( this.body[this.headIndex].x < 0 || 
		    this.body[this.headIndex].x > canvasWidth ||
		    this.body[this.headIndex].y < 0 ||
		    this.body[this.headIndex].y > canvasHeight ){
			this.reset();
		}
	}


	this.setDirection = function( label ){
		this.direction.set( label );
	}
}

function init()
{
	stage = new createjs.Stage( "snakeCanvas" );

	snake = new Snake();
	snake.reset();
	
	canvasWidth = document.getElementById( "snakeCanvas" ).width;
	canvasHeight = document.getElementById( "snakeCanvas" ).height;

	createjs.Ticker.setFPS( 5 );
	createjs.Ticker.addEventListener( "tick", update );

	document.addEventListener( "keydown", handleKeyDown );
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
