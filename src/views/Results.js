
import { html, LitElement } from "../lib/lit-element.min.js";
import query from "../drivers/web.js";
import "./Table.js";
import "./Tabs.js";

const formatSqlValue = v => {

	if ( typeof v === "string" ) return `'${v.replace( /'/g, "\\'" )}'`;
	if ( v === null ) return "NULL";
	return v;

};

customElements.define( "gritli-results", class extends LitElement {

	static get properties() {

		return {
			results: { type: Array },
			query: { type: String },
		};

	}

	constructor() {

		super();
		this.results = [];

	}

	// todo: use a unique key to do updates instead
	handleRowChange = async ( { detail: { row, changes } } ) => {

		const table = Object.keys( row )[ 0 ].split( "_" )[ 0 ];
		const where = Object.entries( row )
			.filter( ( [ key ] ) => key !== "__changes" )
			.map( ( [ key, value ] ) => `\`${key.split( "_" ).slice( 1 ).join( "_" )}\` = ${formatSqlValue( value )}` )
			.join( " and " );
		const { results: [ { rows: [ { _count: count } ] } ] } = await query( `SELECT COUNT(*) count FROM \`${table}\` WHERE ${where};` );

		if ( count === 1 ) {

			const updates = Object.entries( changes )
				.map( ( [ key, value ] ) => `\`${key.split( "_" ).slice( 1 ).join( "_" )}\` = ${formatSqlValue( value )}` );
			const columns = Object.keys( row )
				.filter( column => column !== "__changes" )
				.map( column => `\`${column.split( "_" ).slice( 1 ).join( "_" )}\`` )
				.join( ", " );
			const { results: [ , { rows: [ updatedRow ] } ] } = await query( [
				`UPDATE ${table} SET ${updates.join( ", " )} WHERE ${where};`,
				`SELECT ${columns} FROM ${table} WHERE ${updates.join( " and " )} LIMIT 1;`,
			].join( "\n" ) );

			Object.assign( row, updatedRow );
			// Trigger a refresh on the table
			this.results[ 0 ] = { ...this.results[ 0 ] };
			this.requestUpdate();

			return;

		}

		alert( "This would change multiple rows!" );

	}

	handleRowNew = async ( { detail: { row } } ) => {

		const table = Object.keys( this.results[ 0 ].rows[ 0 ] )[ 0 ].split( "_" )[ 0 ];
		const setColumns = Object.keys( row ).map( f => `\`${f}\`` ).join( ", " );
		const values = Object.values( row ).map( formatSqlValue ).join( ", " );
		const allColumns = this.results[ 0 ].fields
			.map( column => `\`${column.name}\`` )
			.join( ", " );

		const { results: [ { modifications: { insertId } } ] } =
			await query( `INSERT INTO \`${table}\` (${setColumns}) VALUES (${values})` );

		if ( typeof insertId === "number" ) {

			const primaryKey = this.results[ 0 ].fields.find( f => f.flags.includes( "AUTO_INCREMENT_FLAG" ) ).name;
			const { results: [ { rows: [ newRow ] } ] } =
				await query( `SELECT ${allColumns} FROM ${table} WHERE \`${primaryKey}\` = ${insertId};` );

			this.results[ 0 ].rows.push( newRow );
			this.results[ 0 ] = { ...this.results[ 0 ] };
			this.requestUpdate();

		}

	}

	render() {

		if ( ! this.results || this.results.length === 0 ) return;

		if ( this.results.length > 1 )
			return html`
				<gritli-tabs
					.tabs=${this.results.map( ( r, i ) => ( { title: `Results #${i + 1}`, content: html`
						<gritli-table
							.data=${r}
							.editable=${true}
							@rowchange=${this.handleRowChange}
							@rownew=${this.handleRowNew}
						></gritli-table>
					` } ) )}
				><gritli-tabs/>
			`;

		return html`
			<gritli-table
				.data=${this.results[ 0 ]}
				.editable=${true}
				@rowchange=${this.handleRowChange}
				@rownew=${this.handleRowNew}
			></gritli-table>`;

	}

} );
