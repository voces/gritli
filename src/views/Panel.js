
import { css, html, LitElement } from "../lib/lit-element.min.js";
import query, { setConnection } from "../drivers/web.js";
import { dispatcher } from "../util.js";
import "./Accordion.js";

customElements.define( "gritli-panel", class extends LitElement {

	static get styles() {

		return css`
            :host {
				width: 20em;
				background-color: rgba(255, 255, 255, 0.03);
            }
            [slot="header"] {
            }
            .section {
                --gritli-accordion-header-backgorund-color: var(--gritli-control-color);
            }
            .connection {
                --gritli-accordion-header-backgorund-color: transparent;
            }
            .connection, .database, .table, .table-options {
                padding-left: 1em;
			}
			.table-options > * {
				cursor: pointer;
			}
            gritli-accordion[selected] {
                color: var(--gritli-focus-color);
                background-color: var(--gritli-focus-background-color);
            }
        `;

	}

	static get properties() {

		return {
			connections: Array,
			connectionSelected: Number,
			databaseSelected: Number,
		};

	}

	constructor() {

		super();
		this.databasesMap = new WeakMap();
		this.tablesMap = new WeakMap();

	}

	firstUpdated() {

		if ( this.connections.length ) {

			this.connectionSelected = 0;
			setConnection( this.connections[ 0 ] );

		}

		this.addEventListener( "click", e => {

			// Find the element we actually clicked
			let index = 0;
			const path = e.composedPath();
			while (
				path[ index ] &&
				( path[ index ].nodeName !== "GRITLI-ACCORDION" ||
				! this.shadowRoot.contains( path[ index ] ) )
			)
				index ++;
			const element = path[ index ];
			if ( ! element ) return;

			if ( element.classList.contains( "connection" ) ) {

				if ( this.connectionSelected === element.index ) return;
				this.connectionSelected = element.index;
				this.databaseSelected = undefined;
				setConnection( this.connections[ this.connectionSelected ] );

				e.stopPropagation();

			} else if ( element.classList.contains( "database" ) ) {

				if ( this.databaseSelected === element.index ) return;
				this.connectionSelected = element.connectionIndex;
				this.databaseSelected = element.index;
				setConnection( this.connections[ this.connectionSelected ] );

				const connection = this.connections[ element.connectionIndex ];
				const database = this.databasesMap.get( connection )[ element.index ];
				query( connection, `USE \`${Object.values( database )[ 0 ]}\`;` );

				e.stopPropagation();

			}

		}, { capture: true } );

	}

	handleEditConnections( e ) {

		e.stopPropagation();
		this.dispatchEvent( new CustomEvent( "editconnections" ) );

	}

	async handleConnectionToggle( { detail: { expanded } }, connection ) {

		if ( ! expanded ) return;

		this.databasesMap.set(
			connection,
			await query( connection, "SHOW DATABASES;" ).then( r => r.results[ 0 ].rows ),
		);
		this.requestUpdate();

	}

	async handleDatabaseToggle( { detail: { expanded } }, database ) {

		if ( ! expanded ) return;

		this.tablesMap.set(
			database,
			await query( "SHOW TABLES;" ).then( r => r.results[ 0 ].rows ),
		);
		this.requestUpdate();

	}

	render() {

		return html`
            <gritli-accordion class="section" .initiallyExpanded=${true}>
                <span slot="header">Connections</span>
                <span
                    slot="actions"
                    title="Edit connection"
                    @click=${this.handleEditConnections}
                >
                    ✎
                </span>
                ${this.connections.map( ( c, connectionIndex ) => html`
                    <gritli-accordion
                        class="connection"
                        .initiallyExpanded=${false}
                        @toggle=${e => this.handleConnectionToggle( e, c )}
                        .index=${connectionIndex}
                        ?selected=${this.databaseSelected === undefined && this.connectionSelected === connectionIndex}
                    >
                        <span slot="header">${`${c.user}@${c.host}`}</span>
                        ${! this.databasesMap.has( c ) ? undefined : this.databasesMap.get( c ).map( ( database, databaseIndex ) => html`
                            <gritli-accordion
                                class="database"
                                .initiallyExpanded=${false}
                                @toggle=${e => this.handleDatabaseToggle( e, database )}
                                .index=${databaseIndex}
                                .connectionIndex=${connectionIndex}
                                ?selected=${this.databaseSelected === databaseIndex}
                            >
                                <div slot="header">${Object.values( database )[ 0 ]}</div>
								${! this.tablesMap.has( database ) ? undefined : this.tablesMap.get( database ).map( ( table, tableIndex ) => html`
									<gritli-accordion
										class="table"
										.initiallyExpanded=${tableIndex === 0}
										// @toggle=${e => e.stopPropagation()}
									>
										<div slot="header">${Object.values( table )[ 0 ]}</div>
										<div class="table-options">
											<div @click=${dispatcher( this, "tabledata", { table: Object.values( table )[ 0 ] } )}>Data</div>
											<div @click=${dispatcher( this, "tablelayout", { table: Object.values( table )[ 0 ] } )}>Layout</div>
											<div>Options</div>
											<div>Indexes</div>
											<div>Foreign keys</div>
										</div>
									</gritli-accordion>` )}
                            </gritli-accordion>
                        ` )}
                    </gritli-accordion>
                ` )}
            </gritli-accordion>
        `;

	}

} );
