/* eslint-disable no-unused-vars, no-shadow */
import { define, props } from 'skatejs';
import { h } from 'preact';

const classNames = require('classnames');

import { getParents } from './get-parents';
import { store } from '../../store.js'; // redux store
import { BaseComponent } from '../base-component.js';
import Mousetrap from 'mousetrap';
import 'url-search-params-polyfill';

import { NavTitle } from './src/NavTitle';
import { NavList } from './src/NavList';
import { NavLink } from './src/NavLink';
import { NavItem } from './src/NavItem';

@define
class Nav extends BaseComponent {
  static is = 'pl-nav';

  constructor(self) {
    self = super(self);
    self.toggleNavPanel = self.toggleNavPanel.bind(self);
    self.toggleSpecialNavPanel = self.toggleSpecialNavPanel.bind(self);
    self.handleClick = self.handleClick.bind(self);
    self.handleURLChange = self.handleURLChange.bind(self);
    self.handlePageClick = self.handlePageClick.bind(self);
    self._hasInitiallyRendered = false;
    self.receiveIframeMessage = self.receiveIframeMessage.bind(self);
    self.useShadow = false;
    return self;
  }

  handlePageClick(e) {
    if (
      e.target.closest('.pl-c-nav') === null &&
      e.target.closest('.pl-js-nav-trigger') === null &&
      e.target.closest('svg') === null &&
      e.target.closest('pl-toggle-layout') === null
    ) {
      if (this.layoutMode !== 'vertical' && window.innerWidth > 670) {
        this.cleanupActiveNav(true);
      }
    }
  }

  connected() {
    this.isOpenClass = 'pl-is-active';
    const self = this;
    const state = store.getState();
    this.layoutMode = state.app.layoutMode || '';
    this.currentPattern = state.app.currentPattern || '';
    this.elem = this;
    this.previousActiveLinks = [];
    this.iframeElem = document.querySelector('pl-iframe');

    window.addEventListener('message', this.receiveIframeMessage, false);
    document.body.addEventListener('click', this.handlePageClick);
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    Mousetrap.bind('esc', () => {
      if (this.layoutMode !== 'vertical' && window.innerWidth > 670) {
        this.cleanupActiveNav(true);
      }
    });
  }

  disconnected() {
    super.disconnected && super.disconnected();
    document.body.removeEventListener('click', this.handlePageClick);
    window.removeEventListener('message', this.receiveIframeMessage);
  }

  _stateChanged(state) {
    if (this.layoutMode !== state.app.layoutMode) {
      this.layoutMode = state.app.layoutMode || '';
    }

    if (
      state.app.currentPattern &&
      this.currentPattern !== state.app.currentPattern
    ) {
      this.currentPattern = state.app.currentPattern;
      this.handleURLChange(); // so the nav logic is always correct (ex. layout changes)
    }
  }

  receiveIframeMessage(event) {
    const self = this;

    // does the origin sending the message match the current host? if not dev/null the request
    if (
      window.location.protocol !== 'file:' &&
      event.origin !== window.location.protocol + '//' + window.location.host
    ) {
      return;
    }

    let data = {};
    try {
      data =
        typeof event.data !== 'string' ? event.data : JSON.parse(event.data);
    } catch (e) {
      // @todo: how do we want to handle exceptions here?
    }

    if (data.event !== undefined && data.event === 'patternLab.pageClick') {
      try {
        if (self.layoutMode !== 'vertical') {
          self.cleanupActiveNav(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  cleanupActiveNav(topLevelOnly) {
    this.navContainer = document.querySelector('.pl-js-nav-container');
    this.navAccordionTriggers = document.querySelectorAll('.pl-js-acc-handle');
    this.navAccordionPanels = document.querySelectorAll('.pl-js-acc-panel');
    this.topLevelTriggers = document.querySelectorAll(
      '.pl-c-nav__link--title.pl-is-active'
    );

    if (topLevelOnly === true && window.innerWidth > 670) {
      this.navContainer.classList.remove('pl-is-active');
      this.topLevelTriggers.forEach(trigger => {
        trigger.classList.remove('pl-is-active');
        trigger.nextSibling.classList.remove('pl-is-active');
      });
    } else {
      if (this.layoutMode !== 'vertical') {
        this.navContainer.classList.remove('pl-is-active');
        this.navAccordionTriggers.forEach(trigger => {
          trigger.classList.remove('pl-is-active');
        });
        this.navAccordionPanels.forEach(panel => {
          panel.classList.remove('pl-is-active');
        });
      } else if (this.layoutMode === 'vertical' && window.innerWidth <= 670) {
        this.navContainer.classList.remove('pl-is-active');
        this.navAccordionTriggers.forEach(trigger => {
          trigger.classList.remove('pl-is-active');
        });
        this.navAccordionPanels.forEach(panel => {
          panel.classList.remove('pl-is-active');
        });
      } else {
        this.navContainer.classList.remove('pl-is-active');
      }
    }
  }

  handleClick(event, pattern) {
    event.preventDefault();
    this.iframeElem.navigateTo(pattern);
    this.cleanupActiveNav();
  }

  handleURLChange() {
    const currentPattern = this.currentPattern;
    this.activeLink = document.querySelector(
      `[data-patternpartial="${currentPattern}"]`
    );

    if (this.previousActiveLinks) {
      this.previousActiveLinks.forEach((link, index) => {
        this.previousActiveLinks[index].classList.remove('pl-is-active');
      });
    }
    this.previousActiveLinks = [];

    if (this.activeLink) {
      const triggers = [this.activeLink];
      const panels = Array.from(
        getParents(this.activeLink, '.pl-js-acc-panel')
      );

      panels.forEach(panel => {
        const panelTrigger = panel.previousSibling;
        if (panelTrigger) {
          triggers.push(panelTrigger);
        }
      });

      triggers.forEach(trigger => {
        trigger.classList.add('pl-is-active');
        this.previousActiveLinks.push(trigger);
      });
    }
  }

  static props = {
    autoClose: {
      ...props.boolean,
      ...{ default: true },
    },
    currentPattern: props.string,
    layoutMode: props.string,
    collapsedByDefault: {
      ...props.boolean,
      ...{ default: true },
    },
    noViewAll: {
      ...props.boolean,
      ...{ default: window.config?.theme?.noViewAll || false },
    },
  };

  toggleSpecialNavPanel(e) {
    const target = e.target;
    target.parentNode.classList.toggle('pl-is-active');
  }

  toggleNavPanel(e) {
    const target = e.target;

    target.classList.toggle('pl-is-active');

    // when the Nav renders as a dropdown menu, only allow one top-level menu item to be open at a time to prevent overlap issues
    if (
      this.layoutMode !== 'vertical' &&
      window.innerWidth > 670 &&
      target.classList.contains('pl-c-nav__link--title')
    ) {
      this.topLevelTriggers = document.querySelectorAll(
        '.pl-c-nav__link--title.pl-is-active'
      );

      this.topLevelTriggers.forEach(trigger => {
        if (trigger !== target) {
          trigger.classList.remove('pl-is-active');
          trigger.nextSibling.classList.remove('pl-is-active');
        }
      });
    }
  }

  rendered() {
    if (this._hasInitiallyRendered === false) {
      this._hasInitiallyRendered = true;
    }

    if (!this.activeLink) {
      this.handleURLChange();
    }

    if (this.layoutMode !== 'vertical' && window.innerWidth > 670) {
      this.cleanupActiveNav(true);
    }
  }

  render({ layoutMode }) {
    const patternTypes = window.navItems.patternTypes;

    return (
      <ol class="pl-c-nav__list pl-js-pattern-nav-target">
        {patternTypes.map((item, i) => {
          const patternItems = item.patternItems;

          return (
            <NavItem className={`pl-c-nav__item--${item.patternTypeLC}`}>
              <NavTitle
                aria-controls={item.patternTypeLC}
                onClick={this.toggleNavPanel}
              >
                {item.patternTypeUC}
              </NavTitle>
              <ol
                id={item.patternSubtypeUC}
                className={`pl-c-nav__sublist pl-c-nav__sublist--dropdown pl-js-acc-panel`}
              >
                {item.patternTypeItems.map((patternSubtype, i) => {
                  return (
                    <NavList
                      elem={this.elem}
                      category={patternSubtype.patternSubtypeUC}
                    >
                      {patternSubtype.patternSubtypeItems}
                    </NavList>
                  );
                })}

                {patternItems &&
                  patternItems.map((patternItem, i) => {
                    return this.noViewAll &&
                      patternItem.patternPartial.includes('viewall') ? (
                      ''
                    ) : (
                      <NavItem>
                        <NavLink item={patternItem} elem={this} />
                      </NavItem>
                    );
                  })}
              </ol>
            </NavItem>
          );
        })}

        {/* display the All link if window.ishControlsHide is undefined (for some reason) OR window.ishControls.ishControlsHide doesn't have `views-all` and/or `all` set to true */}
        {(window.ishControls === undefined ||
          window.ishControls.ishControlsHide === undefined ||
          (window.ishControls.ishControlsHide['views-all'] !== true &&
            window.ishControls.ishControlsHide.all !== true)) && (
          <NavItem>
            <a
              onClick={e => this.handleClick(e, 'all')}
              href="styleguide/html/styleguide.html"
              class="pl-c-nav__link pl-c-nav__link--pattern"
              data-patternpartial="all"
              tabindex="0"
            >
              All
            </a>
          </NavItem>
        )}
      </ol>
    );
  }
}

export { Nav };
