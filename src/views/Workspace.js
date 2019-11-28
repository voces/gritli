
import { css, html, LitElement } from "../lib/lit-element.min.js";
import { dispatcher, styleMap, dispatch } from "../util.js";
import "./Tabs.js";

const textAreaStyle = styleMap( {
	height: "calc(100% - 0.5em)",
	outline: "none",
	backgroundColor: "inherit",
	border: "none",
	color: "inherit",
	fontSize: "1em",
	padding: "0.25em",
	width: "calc(100% - 0.5em)",
	resize: "none",
	overflow: "hidden",
} );

customElements.define( "gritli-workspace", class extends LitElement {

	static get properties() {

		return {
			documents: Array,
			selectedIndex: Number,
		};

	}

	static get styles() {

		return css`
            :host {
                display: flex;
                flex-flow: column;
				flex: 1;
				min-height: 10em;
            }
        `;

	}

	handleAction( e, document, index ) {

		this.dispatchEvent(
			new CustomEvent( "documentclose", { detail: { document, index } } )
		);
		e.stopPropagation();

	}

	handleKeyDown = e => {

		if ( e.key === "s" && ( e.ctrlKey || e.metaKey ) ) {

			e.preventDefault();
			const document = this.selected.tab.document;
			if ( document && document.save ) {

				const element = this.selected.element;
				if ( element )
					document.save( element.value );

			}

		}

	}

	connectedCallback() {

		super.connectedCallback();
		window.addEventListener( "keydown", this.handleKeyDown );

	}

	disconnectedCallback() {

		window.removeEventListener( "keydown", this.handleKeyDown );
		super.disconnectedCallback();

	}

	handleTabSelected( { detail: { tab, element, index } } ) {

		this.selected = { tab, element };
		dispatch( this, "documentselected", { index } );

	}

	handleInput( e, document ) {

		this.selected = this.selected || {};
		this.selected.tab = { document };
		this.selected.element = e.target;

	}

	render() {

		return html`
            <gritli-tabs
                .tabs=${this.documents.map( ( d, i ) => ( { title: d.title, document: d, content: d.element || html`
					<textarea .style=${textAreaStyle} @input=${e => this.handleInput( e, d )}>${d.content}</textarea>
                `, actions: html`
                    <span @click=${e => this.handleAction( e, d, i )}>×</span>
                ` } ) )}
                @tabselect=${this.handleTabSelected}
				@tabnew=${dispatcher( this, "documentnew" )}
				showNewTab="true"
				.selected=${this.selectedIndex}
            ><gritli-tabs/>
        `;

	}

} );
