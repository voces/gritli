
import { html, LitElement } from "../lib/lit-element.min.js";
import query from "../drivers/web.js";
import "./Table.js";

const numDef = str => str.match( /^(int)\((\d+)\)( unsigned)?$/ );
const strDef = str => str.match( /^(varchar)\((\d+)\)$/ );
const enumDef = str => str.match( /^enum\(.*\)$/ ) && [ ...str.matchAll( /'([^']*)*'/g ) ].map( r => r[ 1 ] );

const columnDef = str => {

	const enumMatch = enumDef( str );
	if ( enumMatch )
		return { type: "enum", set: enumMatch };

	const numMatch = numDef( str );
	if ( numMatch )
		return { type: numMatch[ 1 ], length: numMatch[ 2 ], unsigned: !! numMatch[ 3 ] };

	const strMatch = strDef( str );
	if ( strMatch )
		return { type: strMatch[ 1 ], length: strMatch[ 2 ] };

	throw new Error( `Unknown column type ${str}` );

};

customElements.define( "gritli-table-layout", class extends LitElement {

	static get properties() {

		return {
			table: { type: String },
			columns: { type: Array },
		};

	}

	static get fields() {

		return [
			{ name: "#", columnType: "number" },
			{ name: "Name", columnType: "string", persisted: true },
			{ name: "Datatype", columnType: "string", persisted: true },
			{ name: "Length/Set", columnType: "string", persisted: true },
			{ name: "Unsigned", columnType: "boolean", persisted: true },
			{ name: "Allow NULL", columnType: "boolean", persisted: true },
			{ name: "Default", columnType: "string", persisted: true },
			{ name: "Comment", columnType: "string", persisted: true },
			{ name: "Collation", columnType: "string", persisted: true },
		];

	}

	constructor() {

		super();
		this.columns = [];

	}

	async firstUpdated() {

		const columns = await query( `SHOW FULL COLUMNS FROM \`${this.table}\`;` )
			.then( r => r.results[ 0 ].rows );

		this.columns = columns.map( ( c, i ) => {

			const def = columnDef( c.COLUMNS_Type );
			return {
				index: i,
				name: c.COLUMNS_Field,
				datatype: def.type,
				lengthOrSet: def.length || def.set && def.set.map( v => `'${v}'` ).join( "," ),
				unsigned: !! def.unsigned,
				null: c.COLUMNS_Null !== "NO",
				default: c.COLUMNS_Default || c.COLUMNS_Extra,
				comment: c.COLUMNS_Comment,
				collation: enumDef.COLUMNS_Collation,
			};

		} );

	}

	render() {

		return html`

			<gritli-table
				.data=${{ rows: this.columns, fields: this.constructor.fields }}
				.editable=${true}
			></gritli-table>
		`;

	}

} );
