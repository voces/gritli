
import { css, html, LitElement } from "../lib/lit-element.min.js";
import { dispatch } from "../util.js";

customElements.define( "gritli-number-input", class extends LitElement {

	static get properties() {

		return {
			disabled: { type: Boolean },
			nullable: { type: Boolean },
			value: { type: Number },
		};

	}

	static get styles() {

		return css`
			:host {
				color: var(--gritli-number-color);
				display: inline-block;
				line-height: 1;
				position: relative;
			}
			input {
				-moz-appearance: textfield;
				background-color: unset;
				border: unset;
				color: unset;
				font-size: inherit;
				height: 100%;
				outline: unset;
				padding: unset;
				width: 100%;
			}
			input::-webkit-outer-spin-button,
			input::-webkit-inner-spin-button {
				-webkit-appearance: none;
			}
			input:focus {
				font-style: italic;
			}
		`;

	}

	constructor() {

		super();
		this.nullable = true;

	}

	onInput( e ) {

		e.stopPropagation();

		const oldValue = this.value;

		this.value = isNaN( e.target.value ) ?
			e.target.value :
			e.target.value !== "" ?
				parseFloat( e.target.value ) :
				this.nullable ?
					null :
					0;

		dispatch(
			this,
			"change",
			{
				newValue: this.value,
				oldValue,
			}
		);

	}

	render() {

		return html`<input
			?disabled=${this.disabled}
			.value=${this.value === undefined || this.value === null ? "" : this.value}
			@input=${this.onInput}
			@keydown=${this.onKeyDown}
			placeholder=${this.nullable ? "NULL" : "0"}
			type="number"
		></input>`;

	}

} );
