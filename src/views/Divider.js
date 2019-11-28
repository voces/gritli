
import { css, html, LitElement } from "../lib/lit-element.min.js";

customElements.define( "gritli-divider", class extends LitElement {

	static get properties() {

		return {
			direction: { type: String },
		};

	}

	static get styles() {

		return css`
			:host {
                display: flex;
            }
            :host([direction="horizontal"]) {
                height: 100%;
                width: 1px;
                cursor: ew-resize;
            }
            :host([direction="vertical"]) {
                width: 100%;
                height: 1px;
                cursor: ns-resize;
            }
            div {
                flex: 1 0 auto;
                background-color: var(--gritli-control-color);
            }
		`;

	}

	render() {

		return html`<div></div>`;

	}

} );
