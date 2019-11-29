
import { css, html, LitElement } from "../lib/lit-element.min.js";
import { dispatch } from "../util.js";

customElements.define( "gritli-boolean-input", class extends LitElement {

	static get properties() {

		return {
			disabled: { type: Boolean },
			value: { type: Boolean },
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
		`;

	}

	onInput( e ) {

		e.stopPropagation();

		const oldValue = this.value;
		this.value = e.target.checked;

		dispatch(
			this,
			"change",
			{
				newValue: this.value,
				oldValue,
			},
		);

	}

	render() {

		return html`<input
			?disabled=${this.disabled}
			@input=${this.onInput}
			?checked=${this.value}
			type="checkbox"
		></input>`;

	}

} );
