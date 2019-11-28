
import { css, html, LitElement } from "../lib/lit-element.min.js";
import { dispatcher, dispatch } from "../util.js";
import "./Accordion.js";

customElements.define( "gritli-tabs", class extends LitElement {

	static get properties() {

		return {
			tabs: Array,
			selected: Number,
			showNewTab: Boolean,
		};

	}

	static get styles() {

		return css`
            :host {
                display: flex;
                flex-flow: column;
                flex: 1;
            }
            .tabs {
                display: flex;
                flex-flow: row;
                width: 100%;
            }
            .tab, .new {
                padding: 1em;
                margin-right: 1px;
                background-color: rgba(255, 255, 255, 0.05);
                cursor: pointer;
            }
            .spacer {
                background-color: rgba(255, 255, 255, 0.02);
                flex: 1;
            }
            .tab[selected] {
                background-color: unset;
            }
            .action {
                margin-left: 0.25em;
                opacity: 0;
            }
            .tab:hover .action {
                opacity: 0.5;
            }
            
            .content {
                width: 100%;
                flex: 1;
            }
            .content:not([selected]) {
                display: none;
            }
        `;

	}

	constructor() {

		super();
		this.tabs = [];

	}

	firstUpdated() {

		if ( this.tabs.length ) {

			const index = this.selected === undefined ? 0 : this.selected;
			this.handleSelected(
				this.tabs[ index ],
				index,
				this.shadowRoot.querySelectorAll( ".content" )[ index ].firstElementChild
			);

		}

	}

	handleSelected( tab, index, element ) {

		this.selected = index;
		dispatch( this, "tabselect", { tab, element, index } );

	}

	render() {

		return html`
            <div class="tabs">
                ${this.tabs.map( ( tab, i ) => html`
                    <div
                        class="tab"
                        ?selected=${i === this.selected}
                        @click=${() => this.handleSelected( tab, i, this.shadowRoot.querySelectorAll( ".content" )[ i ].firstElementChild )}
                        draggable="true"
                    >
                        ${tab.title}
                        <span class="action">${tab.actions}</span>
                    </div>
                ` )}
                ${! this.showNewTab ? undefined : html`
                    <div class="new" @click=${dispatcher( this, "tabnew" )}>+</div>
                `}
                <div class="spacer"></div>
            </div>
            ${this.tabs.map( ( tab, i ) => html`
                <div class="content" ?selected=${i === this.selected}>${tab.content}</div>
            ` )}
        `;

	}

} );
