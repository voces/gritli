
import { css, html, LitElement } from "../lib/lit-element.min.js";
import { dispatch } from "../util.js";

customElements.define( "gritli-accordion", class extends LitElement {

	static get styles() {

		return css`
            :host {
                display: block;
            }
            .header {
                display: flex;
                padding: 0.25em;
                font-weight: bold;
                font-size: 90%;
                align-items: center;
                cursor: pointer;
                background-color: var(--gritli-accordion-header-backgorund-color);
            }
            .arrow {
                display: inline-block;
                width: 1em;
                font-size: 70%;
                margin-right: 0.75em;
            }
            .label {
                flex: 1 1 auto;
            }
            .actions {
                opacity: 0;
                transition: all 150ms;
            }
            .header:hover .actions {
                opacity: 1;
            }
        `;

	}

	static get properties() {

		return {
			initiallyExpanded: { type: Boolean },
			expanded: { type: Boolean },
		};

	}

	firstUpdated() {

		this.expanded = !! this.initiallyExpanded;

	}

	handleHeaderClick( e ) {

		this.expanded = ! this.expanded;

		e.stopPropagation();
		dispatch( this, "toggle", { expanded: this.expanded } );

	}

	render() {

		return html`
            <div class="header" @click=${this.handleHeaderClick}>
                <span class="arrow">${this.expanded ? "▼" : "▶"}</span>
                <span class="label"><slot name="header"></slot></span>
                <span class="actions"><slot name="actions"></slot></span>
            </div>
            ${this.expanded ? html`<slot></slot>` : null}
        `;

	}

} );
