
import { css, html, LitElement } from "../lib/lit-element.min.js";
import query from "../query.js";
import "./DivisibleArea.js";
import "./Panel.js";
import "./Results.js";
import "./Workspace.js";
import "./Log.js";
import "./TableLayout.js";

const isQueryTitle = title => title.match( /^# Query #\d+$/ );
const isQueryDocument = document => isQueryTitle( document.title );

const saveDocuments = documents =>
	localStorage.setItem(
		"queries",
		JSON.stringify( documents.filter( isQueryDocument ) )
	);

const documentSave = ( browser, document ) => async content => {

	document.content = content;

	saveDocuments( browser.documents );

	const results = await query( content ).catch( err => err );
	if ( ! ( results instanceof Error ) && results.results )
		browser.handleResult( results, content );

};
const createQueryDocument = ( index, browser, content = "" ) => ( {
	title: `# Query #${index}`,
	content,
	save( content ) {

		return documentSave( browser, this )( content );

	},
} );

// only used in the browser, handles panes
customElements.define( "gritli-browser", class extends LitElement {

	static get styles() {

		return css`
			:host {
				display: block;
				height: 100%;
				background-color: var(--gritli-background-color, #1e1e1e);
				color: var(----gritli-color, #ccc);
			}
		`;

	}

	static get properties() {

		return {
			documents: Array,
			selectedDocument: Number,
			connections: Array,
			results: Array,
			query: String,
		};

	}

	constructor() {

		super();
		const queriesItem = localStorage.getItem( "queries" );
		try {

			const documents = JSON.parse( queriesItem )
				.map( q => Object.assign( q, { save: documentSave( this, q ) } ) );
			this.documents = documents.length ? documents : [ createQueryDocument( 1, this ) ];

		} catch ( err ) {

			this.documents = [ createQueryDocument( 1, this ) ];

		}
		this.connections = eval( localStorage.getItem( "connectionSettings" ) );
		this.selectedDocument = Math.min( parseInt( localStorage.getItem( "selectedDocument" ) ) || 0, this.documents.length - 1 );

	}

	handleEditConnections() {

		this.documents = [
			...this.documents,
			{
				title: "Connection Settings",
				content: localStorage.getItem( "connectionSettings" ),
				save( content ) {

					this.content = content;
					localStorage.setItem( "connectionSettings", content );
					this.connections = eval( content );

				},
			},
		];

	}

	handleDocumentClose( e ) {

		this.documents = [
			...this.documents.slice( 0, e.detail.index ),
			...this.documents.slice( e.detail.index + 1 ),
		];

		if ( this.selectedDocument >= this.documents.length )
			this.selectedDocument = this.documents.length - 1;

		saveDocuments( this.documents );
		localStorage.setItem( "selectedDocument", this.selectedDocument );

	}

	get nextQueryIndex() {

		const indicies = this.documents
			.map( d => d.title )
			.filter( isQueryTitle )
			.map( t => parseInt( t.split( "#" )[ 2 ] ) );

		let index = 1;
		while ( indicies.includes( index ) )
			index ++;

		return index;

	}

	handleDocumentNew() {

		this.documents = [
			...this.documents,
			createQueryDocument( this.nextQueryIndex, this ),
		];

		this.selectedDocument = this.documents.length - 1;

		saveDocuments( this.documents );
		localStorage.setItem( "selectedDocument", this.selectedDocument );

	}

	handleDocumentSelect( e ) {

		this.selectedDocument = e.detail.index;
		localStorage.setItem( "selectedDocument", e.detail.index );

	}

	handleResult( results, query ) {

		this.results = results.results.filter( r => "fields" in r && "rows" in r );
		this.query = query;

	}

	handleTableData( { detail: { table } } ) {

		const content = `SELECT * FROM \`${table}\`;`;
		const document = createQueryDocument( this.nextQueryIndex, this, content );

		this.documents = [
			...this.documents,
			document,
		];
		this.selectedDocument = this.documents.length - 1;
		document.save( content );

	}

	handleTableLayout( { detail: { table } } ) {

		this.documents = [
			...this.documents,
			{
				title: `Table: ${table}`,
				element: html`<gritli-table-layout table=${table}></gritli-table-layout>`,
			},
		];
		this.selectedDocument = this.documents.length - 1;

	}

	render() {

		return html`
		<gritli-divisible-area direction="vertical">
			<gritli-divisible-area direction="vertical">
				<gritli-divisible-area direction="horizontal">
					<gritli-panel
						@editconnections=${this.handleEditConnections}
						.connections=${this.connections}
						.selected=${this.selectedConnection}
						@connectionselected=${index=> this.selectedConnection = index}
						@tabledata=${this.handleTableData}
						@tablelayout=${this.handleTableLayout}
					></gritli-panel>
					<gritli-divisible-area direction="vertical">
						<gritli-workspace
							.documents=${this.documents}
							.selectedIndex=${this.selectedDocument}
							@documentclose=${this.handleDocumentClose}
							@documentnew=${this.handleDocumentNew}
							@documentselected=${this.handleDocumentSelect}
						></gritli-workspace>
						<gritli-results
							.results=${this.results}
							.query=${this.query}
						></gritli-results>>
					</gritli-divisible-area>
				</gritli-divisible-area>
				<gritli-log></gritli-log>
			</gritli-divisible-area>
			<div style="flex: 0 0 auto;">Status</div>
		</gritli-divisible-area>`;

	}

} );
