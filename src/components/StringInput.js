
import { css, html, LitElement } from "../lib/lit-element.min.js";
import { dispatch } from "../util.js";

customElements.define( "gritli-string-input", class extends LitElement {

	static get properties() {

		return {
			disabled: { type: Boolean },
			nullable: { type: Boolean },
			value: { type: String },
		};

	}

	static get styles() {

		return css`
			:host {
				color: var(--gritli-string-color);
				line-height: 1;
				position: relative;
				display: inline-block;
			}

			textarea {
				background-color: unset;
				color: unset;
				border: unset;
				-moz-appearance: textfield;
				outline: unset;
				padding: unset;
				width: 100%;
				height: 100%;
				font-size: inherit;
				resize: vertical;
				overflow: hidden;
			}
			textarea:focus {
				font-style: italic;
			}
		`;

	}

	constructor() {

		super();
		this.nullable = true;

	}

	onKeyDown( e ) {

		if ( e.key !== "Backspace" || ! this.nullable || this.value !== "" ) {

			if ( e.target.value === "" )
				this.shadowRoot.firstElementChild.setAttribute( "placeholder", "''" );

			return;

		}

		e.preventDefault();

		const oldValue = this.value;
		this.value = null;
		this.shadowRoot.firstElementChild.setAttribute( "placeholder", "NULL" );

		dispatch(
			this,
			"change",
			{
				newValue: this.value,
				oldValue,
			}
		);

	}

	onInput( e ) {

		e.stopPropagation();

		const oldValue = this.value;
		this.value = e.target.value;

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

		const isNull = this.value === undefined || this.value === null;

		return html`<textarea
			?disabled=${this.disabled}
			.value=${isNull ? "" : this.value}
			@input=${this.onInput}
			@keydown=${this.onKeyDown}
			placeholder=${this.nullable && isNull ? "NULL" : "''"}
			rows="1"
		></textarea>`;

	}

} );
