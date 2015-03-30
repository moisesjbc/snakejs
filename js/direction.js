"use strict";
function Direction( label )
{
	this.set = function( label )
	{
		switch( label ){
			case 'right':
				if( this.label != 'left' ){
					this.label = 'right';
					this.x = 1;
					this.y = 0;
				}
			break;
			case 'left':
				if( this.label != 'right' ){
					this.label = 'left';
					this.x = -1;
					this.y = 0;
				}
			break;
			case 'up':
				if( this.label != 'down' ){
					this.label = 'up';
					this.x = 0;
					this.y = -1;
				}
			break;
			case 'down':
				if( this.label != 'up' ){
					this.label = 'down';
					this.x = 0;
					this.y = 1;
				}
			break;
		}
	}
	this.set( label );
}
