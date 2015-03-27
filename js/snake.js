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
