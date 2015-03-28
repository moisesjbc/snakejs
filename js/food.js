function Food( stage )
{
	this.stage = stage;

	this.reset = function(){
		if( this.cell != undefined ){
			this.stage.removeChild( this.cell );
			delete this.cell;
		}
		this.cell = new createjs.Shape();
		this.cell.graphics.beginFill( 'black' );
		this.cell.graphics.drawRect( 0, 0, CELL_SIZE, CELL_SIZE );
		this.x = this.cell.x = Math.floor( Math.random() * ( canvasWidth / CELL_SIZE ) ) * CELL_SIZE;
		this.y = this.cell.y = Math.floor( Math.random() * ( canvasHeight / CELL_SIZE ) ) * CELL_SIZE;
		this.stage.addChild( this.cell );
	};
	this.reset();
}
