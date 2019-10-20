import { styleMap } from 'lit-html/directives/style-map';
import { classMap } from 'lit-html/directives/class-map';
import { LitElement, html, customElement } from 'lit-element';
import { store } from '../../store.js'; // redux store
import {
  updateDrawerState,
  updateDrawerHeight,
  updateDrawerAnimationState,
} from '../../actions/app.js'; // redux actions needed by this element.

@customElement('pl-drawer')
class Drawer extends LitElement {
  constructor(self) {
    self = super(self);
    self.onMouseDown = self.onMouseDown.bind(self); // fix bindings so "self" works properly
    self.onMouseUp = self.onMouseUp.bind(self); // fix bindings so "self" works properly
    self.onMouseMove = self.onMouseMove.bind(self); // fix bindings so "this" works properly
    return self;
  }

  static get properties() {
    return {
      drawerOpened: {
        attribute: true,
        type: Boolean,
      },
      drawerHeight: {
        attribute: true,
        type: Number,
      },
      isViewallPage: {
        attribute: true,
        type: Boolean,
      },
      isMouseDown: {
        attribute: true,
        type: Boolean,
      },
    };
  }

  createRenderRoot() {
    return this;
  }

  onMouseDown() {
    this.isMouseDown = true;
    store.dispatch(updateDrawerAnimationState(true));

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove(event) {
    // 1/2 the height of the UI being dragged. @todo: make sure this 7px is calculated
    const clientHeight = event.targetTouches
      ? event.targetTouches[0].clientY
      : event.clientY;
    const panelHeight = window.innerHeight - clientHeight + 7;

    this.drawerHeight = panelHeight;
  }

  onMouseUp() {
    this.isMouseDown = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    store.dispatch(updateDrawerHeight(this.drawerHeight));
    store.dispatch(updateDrawerAnimationState(false));
  }

  render() {
    const classes = {
      'pl-c-drawer': true,
      'pl-js-drawer': true,
      'pl-is-active': this.drawerOpened && !this.isViewallPage,
    };

    const renderedHeight =
      this.drawerOpened && !this.isViewallPage
        ? this.drawerHeight > 20
          ? this.drawerHeight
          : 300
        : 0;

    const coverStyles = { display: this.isMouseDown ? 'block' : 'none' };
    const drawerStyles = {
      height: `${renderedHeight}px`,
      transitionDuration: this.isMouseDown ? '0ms' : '300ms',
    };

    return html`
      <div>
        <div class="pl-c-drawer__cover" style="${styleMap(coverStyles)}"></div>
        <div style="${styleMap(drawerStyles)}" class="pl-c-drawer__wrapper">
          <div class="${classMap(classes)}">
            <div class="pl-c-drawer__toolbar">
              <div
                class="pl-c-drawer__resizer"
                @mousedown="${this.onMouseDown}"
              ></div>
              <div class="pl-c-drawer__toolbar-controls">
                <pl-toggle-layout
                  size="small"
                  icon-only="true"
                ></pl-toggle-layout>

                <pl-button
                  title="Hide pattern info"
                  title="Menu"
                  size="small"
                  icon-only="true"
                  @click="${_ => store.dispatch(updateDrawerState(false))}"
                >
                  <pl-icon slot="after" name="close"></pl-icon>
                </pl-button>
              </div>
            </div>
            <div class="pl-c-drawer__content pl-js-drawer-content"></div>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this.__storeUnsubscribe = store.subscribe(() =>
      this._stateChanged(store.getState())
    );
    this._stateChanged(store.getState());
  }

  disconnectedCallback() {
    this.__storeUnsubscribe && this.__storeUnsubscribe();

    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
  }

  _stateChanged(state) {
    if (this.drawerOpened !== state.app.drawerOpened) {
      this.drawerOpened = state.app.drawerOpened;
    }
    if (this.drawerHeight !== state.app.drawerHeight) {
      this.drawerHeight = state.app.drawerHeight;
    }
    if (this.isDragging !== state.app.isDragging) {
      this.isDragging = state.app.isDragging;
    }
    if (this.isViewallPage !== state.app.isViewallPage) {
      this.isViewallPage = state.app.isViewallPage;
    }
  }
}

export { Drawer };
