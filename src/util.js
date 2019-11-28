
export const styleMap = obj => Object.entries( obj )
	.filter( ( [ , value ] ) => value !== null && value !== undefined )
	.map( ( [ name, value ] ) =>
		`${name.replace( /([A-Z])/g, v => `-${v.toLowerCase()}` )}: ${value};` )
	.join( " " );

export const classMap = obj => Object.entries( obj )
	.filter( ( [ , value ] ) => value )
	.map( ( [ name ] ) => name.replace( /([A-Z])/g, v => `-${v.toLowerCase()}` ) )
	.join( " " );

export const dispatch = ( target, name, detail ) =>
	target.dispatchEvent( new CustomEvent( name, { detail, composed: true } ) );

export const dispatcher = ( target, name, fnOrDetail ) =>
	e => target.dispatchEvent( new CustomEvent(
		name,
		{
			composed: true,
			detail: typeof fnOrDetail === "function" ? fnOrDetail( e ) : fnOrDetail,
		}
	) );
