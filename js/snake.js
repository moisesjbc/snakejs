var snakeSize = 3;

function Snake(){
	this.body = [];
	
	this.reset = function(){
		this.tailIndex = 0;
		this.headIndex = snakeSize - 1;

		for( i = 0; i < this.body.length; i++ ){
			stage.removeChild( this.body[i] );
		}
		this.body = [];

		this.direction = new Direction( 'right' );
	
		for( i = 0; i < snakeSize; i++ ){
			this.body[i] = new createjs.Shape();
			this.body[i].graphics.beginFill("black");
			this.body[i].graphics.drawRect( 0, 0, CELL_SIZE, CELL_SIZE );
			stage.addChild( this.body[i] );
			this.body[i].x = i * CELL_SIZE;
			this.body[i].y = 0;
			this.direction.set( 'right' );
		}
	}

	
	this.update = function( stage, food ){
		var nextPos = {};
		nextPos.x = this.body[this.headIndex].x + this.direction.x * CELL_SIZE;
		nextPos.y = this.body[this.headIndex].y + this.direction.y * CELL_SIZE;

		// Check if snake bites itself
		for( var i = 0; i < this.body.length; i++ ){
			if( nextPos.x == this.body[i].x && 
			    nextPos.y == this.body[i].y ){
				this.reset();
				return;
			}
		}

		if( nextPos.x == food.x && nextPos.y == food.y ){
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
			
			food.reset();
		}else{
			this.body[this.tailIndex].x = nextPos.x;
			this.body[this.tailIndex].y = nextPos.y;
			
			this.headIndex = ( this.headIndex + 1 ) % this.body.length;
			this.tailIndex = ( this.tailIndex + 1 ) % this.body.length;
		}

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
