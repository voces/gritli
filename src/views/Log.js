
import { css, html, LitElement } from "../lib/lit-element.min.js";

import { queryPrehook, setQueryPrehook, queryPosthook, setQueryPosthook } from "../drivers/web.js";

customElements.define( "gritli-log", class extends LitElement {

	static get properties() {

		return { log: Array };

	}

	static get styles() {

		return css`
            :host {
                flex: 0 1 10em;
                font-family: monospace;
            }
            .log {
                display: flex;
            }
            .log-entry {
                display: inline-block;
                margin: 0;
				white-space: pre-wrap;
				display: flex;
			}
			.log-entry::before {
				content: attr(data-number);
				color: var(--gritli-number-color);
                display: inline-block;
                margin-right: 0.5em;
			}
		`;

	}

	constructor() {

		super();
		this.log = [];

	}

	connectedCallback() {

		super.connectedCallback();

		this.oldQueryPrehook = queryPrehook;
		setQueryPrehook( query => {

			this.log.push( query );
			this.requestUpdate();
			return query;

		} );

		this.oldQueryPosthook = queryPosthook;
		setQueryPosthook( results => {

			try {

				if ( results.error ) this.log.push( `-- ERROR: ${results.error}` );
				else if ( results.results ) {

					const queries = results.results.length;
					const rows = results.results.reduce( ( sum, result ) => sum + ( result.rows ? result.rows.length : 0 ), 0 );
					if ( rows === 0 )
						this.log.push( `-- Executed ${queries} ${queries === 1 ? "query" : "queries"} in ${results.duration}ms` );

					results.results.forEach( ( { modifications } ) => {

						if ( ! modifications )
							return;

						const modificationStrings = [
							modifications.stateChanges && modifications.stateChanges.schema ? `using ${modifications.stateChanges.schema}` : null,
							modifications.affectedRows && ! modifications.insertId ? `${modifications.affectedRows} ${modifications.affectedRows === 1 ? "row" : "rows"} affected` : null,
							modifications.insertId ? `inserted at ${modifications.insertId}` : null,
						].filter( Boolean ).join( ", " );

						if ( ! modificationStrings.length )

							console.warn( "Empty modification", modifications, modificationStrings );
							// this.log.push( "-- Unknown modifications: " + JSON.stringify( modifications ) );

						else
							this.log.push( "-- " + modificationStrings[ 0 ].toUpperCase() + modificationStrings.slice( 1 ) );

					} );

					if ( rows > 0 )
						this.log.push( `-- Found ${rows} ${rows === 1 ? "row" : "rows"} across ${queries} ${queries === 1 ? "query" : "queries"} in ${results.duration}ms` );

				} else console.error( results );

				this.requestUpdate();

			} catch ( err ) {

				console.error( err );

			}

			return results;

		} );

	}

	disconnectedCallback() {

		setQueryPrehook( this.oldQueryPrehook );
		setQueryPosthook( this.oldQueryPosthook );

		super.disconnectedCallback();

	}

	render() {

		// const autoScroll = this.scrollHeight - this.clientHeight === this.scrollTop;

		return html`${this.log.map( ( entry, i ) => html`<div class="log"><pre class="log-entry" data-number=${i}>${entry}</div></pre>` )}`;

	}

	updated() {

		this.scrollTop = this.scrollHeight - this.clientHeight;

	}

} );
