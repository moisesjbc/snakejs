"use strict";
function positionOccupied( pos, occupiedPositions )
{
	for( var i = 0; i < occupiedPositions.length; i++ ){
		if( pos.x == occupiedPositions[i].x &&
		 pos.y == occupiedPositions[i].y ){
			return true;
		}
	}
	return false;
}


function findFirstFreePosition( startPos, occupiedPositions )
{
	var currentPos = {x:startPos.x, y:startPos.y};

	// Search in the same row (next columns)
	for( ; currentPos.x < canvasWidth; currentPos.x += CELL_SIZE ){
		if( !positionOccupied( currentPos, occupiedPositions ) ){
			return currentPos;
		}
	}

	// Search in following rows.
	currentPos.y += CELL_SIZE;
	for( ; currentPos.y < canvasHeight; currentPos.y += CELL_SIZE ){
		for( currentPos.x = 0; currentPos.x < canvasWidth; currentPos.x += CELL_SIZE ){
			if( !positionOccupied( currentPos, occupiedPositions ) ){
				return currentPos;
			}
		}
	}

	// Search in previous rows.
	for( currentPos.y = 0; currentPos.y < startPos.y; currentPos.y += CELL_SIZE ){
		for( currentPos.x = 0; currentPos.x < canvasWidth; currentPos.x += CELL_SIZE ){
			if( !positionOccupied( currentPos, occupiedPositions ) ){
				return currentPos;
			}
		}
	}

	// Search in the same row (previous columns)
	for( currentPos.x = 0; currentPos.x < startPos.x; currentPos.x += CELL_SIZE ){
		if( !positionOccupied( currentPos, occupiedPositions ) ){
			return currentPos;
		}
	}	

	return null;
}


function Food( stage )
{
	this.stage = stage;

	this.reset = function( occupiedPositions = [] ){
		if( this.cell != undefined ){
			this.stage.removeChild( this.cell );
			delete this.cell;
		}
		this.cell = new createjs.Shape();
		this.cell.graphics.beginFill( 'black' );
		this.cell.graphics.drawRect( 0, 0, CELL_SIZE, CELL_SIZE );

		var newPos = {};
		newPos.x = Math.floor( Math.random() * ( canvasWidth / CELL_SIZE ) ) * CELL_SIZE;
		newPos.y = Math.floor( Math.random() * ( canvasHeight / CELL_SIZE ) ) * CELL_SIZE;

		newPos = findFirstFreePosition( newPos, occupiedPositions );
		
		this.x = this.cell.x = newPos.x;
		this.y = this.cell.y = newPos.y;

		this.stage.addChild( this.cell );
	};

	this.reset();
}
