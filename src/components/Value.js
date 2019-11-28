
import { css, html, LitElement } from "../lib/lit-element.min.js";
import "./NumberInput.js";
import "./StringInput.js";

customElements.define( "gritli-value", class extends LitElement {

	static get properties() {

		return {
			value: {},
			disabled: { type: Boolean },
			nullable: { type: Boolean },
			type: { type: Function },
			values: {},
		};

	}

	static get styles() {

		return css`
			:host {
				display: inline-block;
			}
            .number {
				color: var(--gritli-number-color);
                font-family: monospace;
                text-align: right;
                width: 100%;
            }
            .string {
                color: var(--gritli-string-color);
			}
			.null:empty::before {
				color: var(--gritli-null-color);
				content: "NULL"
			}
			:focus {
				outline: none;
				font-style: italic;
			}
		`;

	}

	constructor() {

		super();

		this.nullable = true;

	}

	render() {

		if ( this.type === Number )
			return html`<gritli-number-input
				.disabled=${this.disabled}
				.index=${this.index}
				.nullable=${this.nullable}
				.value=${this.value}
			/>`;

		if ( this.type === String )
			return html`<gritli-string-input
				.disabled=${this.disabled}
				.index=${this.index}
				.nullable=${this.nullable}
				.value=${this.value}
			/>`;

		throw new Error( `Unknown type ${this.type.name}` );

	}

} );
