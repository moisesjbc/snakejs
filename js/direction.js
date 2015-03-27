function Direction( label )
{
	this.set = function( label )
	{
		switch( label ){
			case 'right':
				this.label = 'right';
				this.x = 1;
				this.y = 0;
			break;
			case 'left':
				this.label = 'left';
				this.x = -1;
				this.y = 0;
			break;
			case 'up':
				this.label = 'up';
				this.x = 0;
				this.y = -1;
			break;
			case 'down':
				this.label = 'down';
				this.x = 0;
				this.y = 1;
			break;
		}
	}
	this.set( label );
}
