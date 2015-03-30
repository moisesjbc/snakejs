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
	if( !snake.update( stage, food ) ){
		snake.reset();
		food.reset();
	}
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
}


function testFindFirstFreePosition()
{
	var occupiedPositions = [{x:0, y:0}];
	var startPos = {x:0, y:0};

	var expectedPos = {x:CELL_SIZE, y:0};
	var returnedPos = findFirstFreePosition( startPos, occupiedPositions );
	checkReturnedPos( returnedPos, expectedPos );

	occupiedPositions.push( {x:CELL_SIZE, y:0} );
	var expectedPos = {x:CELL_SIZE*2, y:0};
	var returnedPos = findFirstFreePosition( startPos, occupiedPositions );
	checkReturnedPos( returnedPos, expectedPos );
	
	
	{
		var occupiedPositions = [{x:(canvasWidth-CELL_SIZE), y:CELL_SIZE}];
		var startPos = occupiedPositions[0];
		var expectedPos = {x:0, y:CELL_SIZE*2};
		var returnedPos = findFirstFreePosition( startPos, occupiedPositions );
		checkReturnedPos( returnedPos, expectedPos );
	}


	{
		var occupiedPositions = [{x:(canvasWidth-CELL_SIZE), y:canvasWidth-CELL_SIZE}];
		var startPos = occupiedPositions[0];
		var expectedPos = {x:0, y:0};
		var returnedPos = findFirstFreePosition( startPos, occupiedPositions );
		checkReturnedPos( returnedPos, expectedPos );
	}


	{
		var occupiedPositions = [];
		var startPos = {x:3*CELL_SIZE, y:3*CELL_SIZE };
		var expectedPos = {x:2*CELL_SIZE, y:3*CELL_SIZE};
		
		for( var x = 0; x < canvasWidth; x += CELL_SIZE ){
			for( var y = 0; y < canvasHeight; y += CELL_SIZE ){
				if( x != expectedPos.x || y != expectedPos.y ){
					occupiedPositions.push( {x:x, y:y} );
				}
			}
		}
		var returnedPos = findFirstFreePosition( startPos, occupiedPositions );
		checkReturnedPos( returnedPos, expectedPos );
	}

	alert( 'testFindFirstFreePosition - OK' );
}


function checkReturnedPos( returnedPos, expectedPos )
{
	if( returnedPos == null || returnedPos.x != expectedPos.x || returnedPos.y != expectedPos.y ){
		alert( 'returnedPos != expectedPos' );
		debugger;
		return;
	}
}


function runTests()
{
	testFindFirstFreePosition();
}
