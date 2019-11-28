
import { css, html, LitElement } from "../lib/lit-element.min.js";

import "./Divider.js";

customElements.define( "gritli-divisible-area", class extends LitElement {

	static get properties() {

		return {
			direction: { type: String },
		};

	}

	static get styles() {

		return css`
			:host {
				flex: 1 1 auto;
				display: flex;
				height: 100%;
				background-color: var(--gritli-background-color, #1e1e1e);
				color: var(----gritli-color, #ccc);
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
			:host > * {
				max-width: 100%;
                max-height: 100%;
                overflow: auto;
			}
		`;

	}

	constructor() {

		super();
		this.addEventListener( "mousemove", this.handleMouseMove.bind( this ) );
		this.addEventListener( "mouseup", this.handleMouseUp.bind( this ) );

	}

	handleMouseDown( e ) {

		this.dragData = this.direction === "horizontal" ? e.clientX : e.clientY;

	}

	handleMouseMove( e ) {

		if ( ! this.dragData ) return;
		const diff = this.direction === "horizontal" ? e.movementX : e.movementY;

		const sizeProp = this.direction === "horizontal" ? "clientWidth" : "clientHeight";
		const oldBasis = this.shadowRoot.children[ 0 ][ sizeProp ];
		const style = this.shadowRoot.children[ 0 ].style;
		style.flexBasis = `${oldBasis + diff}px`;
		style.flexGrow = 0;
		style.flexShrink = 0;

	}

	handleMouseUp() {

		this.dragData = undefined;

	}

	render() {

		this.style.flexDirection = this.direction === "horizontal" ? "row" : "column";

		return html`
            ${this.children[ 0 ]}
            <gritli-divider
                direction=${this.direction}
                @mousedown=${this.handleMouseDown}>
            </gritli-divider>
            ${this.children[ 1 ]}
		`;

	}

} );
