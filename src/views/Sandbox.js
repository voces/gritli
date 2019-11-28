
import { html, LitElement } from "../lib/lit-element.min.js";
import "../components/Value.js";

customElements.define( "gritli-sandbox", class extends LitElement {

	render() {

		return html`
			<gritli-value
				.value=${null}
				.type=${Number}
				@change=${e => console.log( { 1: e.detail.newValue } )}
			></gritli-value>
			<gritli-value
				.value=${null}
				.type=${String}
				@change=${e => console.log( { 2: e.detail.newValue } )}
			></gritli-value>
			<gritli-value
				.value=${1.23}
				.type=${Number}
				.nullable=${false}
				@change=${e => console.log( { 3: e.detail.newValue } )}
			></gritli-value>
			<gritli-value
				.value=${"1.23"}
				.type=${String}
				.nullable=${false}
				@change=${e => console.log( { 4: e.detail.newValue } )}
			></gritli-value>
        `;

	}

} );
