"use strict";
var snakeStartSize = 3;

function Snake(){
	this.body = [];
	
	this.reset = function(){
		this.tailIndex = 0;
		this.headIndex = snakeStartSize - 1;

		for( var i = 0; i < this.body.length; i++ ){
			stage.removeChild( this.body[i] );
		}
		this.body = [];

		this.direction = new Direction( 'right' );
	
		for( i = 0; i < snakeStartSize; i++ ){
			this.body[i] = new createjs.Shape();
			this.body[i].graphics.beginFill("black");
			this.body[i].graphics.drawRect( 0, 0, CELL_SIZE, CELL_SIZE );
			stage.addChild( this.body[i] );
			this.body[i].x = i * CELL_SIZE;
			this.body[i].y = 0;
			this.direction.set( 'right' );
		}
		document.getElementById( 'snakeScore' ).innerHTML =
			'Score: ' + (this.body.length - snakeStartSize);
	}

	
	this.update = function( stage, food ){
		var nextPos = {};
		nextPos.x = this.body[this.headIndex].x + this.direction.x * CELL_SIZE;
		nextPos.y = this.body[this.headIndex].y + this.direction.y * CELL_SIZE;

		// Check if snake bites itself
		for( var i = 0; i < this.body.length; i++ ){
			if( nextPos.x === this.body[i].x && 
			    nextPos.y === this.body[i].y ){
				return false;
			}
		}

		if( nextPos.x === food.x && nextPos.y === food.y ){
			var newBodyCell = new createjs.Shape();
			newBodyCell.graphics.beginFill("black");
			newBodyCell.graphics.drawRect( 0, 0, CELL_SIZE, CELL_SIZE );
			newBodyCell.x = nextPos.x;
			newBodyCell.y = nextPos.y;
			stage.addChild( newBodyCell );

			this.body.splice( this.headIndex + 1, 0, newBodyCell );

			if( this.tailIndex > this.headIndex ){
				this.tailIndex++;
			}
			this.headIndex++;

			document.getElementById( 'snakeScore' ).innerHTML =
			'Score: ' + (this.body.length - snakeStartSize);
			
			food.reset( this.body );
		}else{
			this.body[this.tailIndex].x = nextPos.x;
			this.body[this.tailIndex].y = nextPos.y;
			
			this.headIndex = ( this.headIndex + 1 ) % this.body.length;
			this.tailIndex = ( this.tailIndex + 1 ) % this.body.length;
		}

		if( this.body[this.headIndex].x < 0 || 
		    this.body[this.headIndex].x >= canvasWidth ||
		    this.body[this.headIndex].y < 0 ||
		    this.body[this.headIndex].y >= canvasHeight ){
			return false;
		}

		return true;
	}


	this.setDirection = function( label ){
		this.direction.set( label );
	}
}
