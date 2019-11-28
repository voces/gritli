
let connection = undefined;
export let queryPrehook = r => r;
export let queryPosthook = r => r;

export const setConnection = newConnection => connection = newConnection;

export const setQueryPrehook = fn => queryPrehook = fn;
export const setQueryPosthook = fn => queryPosthook = fn;

export default async ( passedConnection, query ) => {

	if ( ! query ) {

		query = passedConnection;
		passedConnection = connection;

	} else connection = passedConnection;

	query = queryPrehook( query );

	const config = encodeURIComponent( JSON.stringify( connection ) );
	query = encodeURIComponent( query );
	return await fetch( `http://localhost:3000/?config=${config}&query=${query}` )
		.then( r => r.json() )
		.then( results => queryPosthook( results ) );

};
