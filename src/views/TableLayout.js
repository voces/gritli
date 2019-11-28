
import { html, LitElement } from "../lib/lit-element.min.js";
import query from "../query.js";
import "./Table.js";

const tryParseInt = str => isNaN( str ) ? str : parseInt( str );

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
			{ name: "Name", columnType: "string" },
			{ name: "Datatype", columnType: "number" },
			{ name: "Length/Set", columnType: "number" },
			{ name: "Unsigned", columnType: "number" },
			{ name: "Allow NULL", columnType: "number" },
			{ name: "Default", columnType: "number" },
			{ name: "Comment", columnType: "string" },
		];

	}

	constructor() {

		super();
		this.columns = [];

	}

	async firstUpdated() {

		const columns = await query( `SHOW COLUMNS FROM \`${this.table}\`;` )
			.then( r => r.results[ 0 ].rows );

		this.columns = columns.map( ( c, i ) => ( {
			index: i,
			name: c.COLUMNS_Field,
			datatype: c.COLUMNS_Type.split( "(" )[ 0 ],
			length: tryParseInt( c.COLUMNS_Type.match( /\((\d+)/ )[ 1 ] ),
			unsigned: "TODO",
			null: c.COLUMNS_Null !== "NO",
			default: c.COLUMNS_Default || c.COLUMNS_Extra,
			comment: "TODO",
		} ) );

	}

	render() {

		return html`
			<gritli-table .data=${{ rows: this.columns, fields: this.constructor.fields }}></gritli-table>
		`;

	}

} );
