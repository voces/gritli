
import { css, html, LitElement } from "../lib/lit-element.min.js";
import { classMap, dispatch } from "../util.js";
import "../components/Value.js";

const fieldClasses = ( field, firstRow ) => classMap( {
	...firstRow ? { [ typeof firstRow[ field.name ] ]: true } : undefined,
	primaryKey: field.primaryKey,
	uniqueKey: field.uniqueKey,
	multipleKey: field.multipleKey,
} );

const fieldTypeMap = {
	string: String,
	number: Number,
};

customElements.define( "gritli-table", class extends LitElement {

	static get properties() {

		return {
			data: { type: Object },
			type: { type: String },
			editable: { type: Boolean },
			newRow: { type: Object },
		};

	}

	static get styles() {

		return css`
            :host {
                display: inline-grid;
                grid-gap: 0.125em;
                font-size: 1em;
                background-color: var(--gritli-control-color);
                
            }
            :host > * {
                background-color: var(--gritli-background-color);
                padding: 0.125em 0.25em;
                overflow: hidden;
            }
            .header {
                margin-bottom: 0.125em;
            }
            .number {
                text-align: right;
            }
            .primary-key::before {
                content: "🔑 ";
                filter: grayscale(100%) sepia(100%) hue-rotate(20deg) saturate(5);
                font-size: 80%;
            }
            .unique-key::before {
                content: "🔑 ";
                filter: grayscale(100%) sepia(100%) hue-rotate(340deg) saturate(5);
                font-size: 80%;
            }
            .multiple-key::before {
                content: "🔑 ";
                filter: grayscale(100%) sepia(100%) hue-rotate(40deg) saturate(5);
                font-size: 80%;
            }
		`;

	}

	constructor() {

		super();
		this.newRow = {};

	}

	handleValueChange( { detail: { newValue } }, row, column ) {

		// todo: store changes on a weakmap
		if ( ! row.__changes )
			Object.defineProperty( row, "__changes", {
				value: {},
				writable: true,
				configurable: true,
			} );
		row.__changes[ column ] = newValue;

	}

	handleBlur( { target, relatedTarget } ) {

		setTimeout( () => {

			if ( target.row &&
                ( ! relatedTarget || relatedTarget.row !== target.row ) &&
                target.row.__changes
			) {

				dispatch(
					this,
					"rowchange",
					{ row: target.row, changes: target.row.__changes, fields: this.data.fields }
				);
				target.row.__changes = undefined;

			}

		} );

	}

	handleNewValueChange( { detail: { newValue } }, key ) {

		this.newRow[ key ] = newValue;
		this.requestUpdate();

	}

	handleNewValue( e ) {

		if ( e.target && ! e.relatedTarget || e.target.row !== e.relatedTarget.row )
			setTimeout( () => {

				if ( Object.keys( this.newRow ).length === 0 ) return;

				const row = this.newRow;

				this.newRow = {};
				this.requestUpdate();

				dispatch( this, "rownew", { row } );

			} );

	}

	render() {

		this.style.gridTemplateColumns = `repeat(${this.data.fields.length}, minmax(min-content, max-content))`;

		// todo: should just use this.editable on the value
		return html`
            ${this.data.fields.map( f => html`
                <div class="header ${fieldClasses( f, this.data.rows[ 0 ] )}">${f.name}</div>
            ` )}
            ${this.data.rows.map( row => Object.entries( row ).map( ( [ key, value ], index ) => html`
                <gritli-value
                    .index=${index}
                    .value=${value}
                    .type=${fieldTypeMap[ this.data.fields[ index ].columnType ]}
                    .nullable=${! this.data.fields[ index ].nullable}
                    .disabled=${! this.editable || ! this.data.fields[ index ].persisted}
                    @change=${e => this.handleValueChange( e, row, key )}
                    @blur=${this.handleBlur}
                    .row=${row}
                ></gritli-value>
            ` ) ).flat()}
            ${this.editable ? this.data.fields.map( f => html`
                <gritli-value
                    .index=${"new"}
                    .value=${this.newRow[ f.name ]}
                    .type=${fieldTypeMap[ f.columnType ]}
                    .disabled=${false}
                    @change=${e => this.handleNewValueChange( e, f.name )}
                    @blur=${this.handleNewValue}
                    .row=${this.newRow}
                ></gritli-value>
            ` ) : undefined}
        `;

	}

} );
