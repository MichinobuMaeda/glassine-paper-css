/**
 * Toggles the visibility of the main menu.
 * Shows the menu if it's hidden, or hides it if it's visible.
 *
 * @returns {void}
 */
function toggleMainMenu() {
  const mainMenu = document.getElementById('main-menu');
  if (mainMenu.classList.contains('hidden')) {
    mainMenu.classList.remove('hidden');
  } else {
    mainMenu.classList.add('hidden');
  }
}

/**
 * Toggles the width of the navigation bar between normal and wide modes.
 * Adds or removes the 'wide' CSS class from the nav-bar element.
 *
 * @param {Event} event - The event that triggered the toggle
 * @returns {void}
 */
function toggleNavBarWidth(event) {
  const navBar = document.getElementsByClassName('nav-bar').item(0);
  if (navBar.classList.contains('wide')) {
    navBar.classList.remove('wide');
  } else {
    navBar.classList.add('wide');
  }
}

/**
 * Toggles the width of the navigation rail between normal and wide modes.
 * Adds or removes the 'wide' CSS class from the nav-rail element.
 *
 * @param {Event} event - The event that triggered the toggle
 * @returns {void}
 */
function toggleNavRailWidth(event) {
  const navRail = document.getElementsByClassName('nav-rail').item(0);
  const svg = event.currentTarget.getElementsByTagName('svg').item(0);
  const svgPath = svg.getElementsByTagName('path').item(0);
  if (navRail.classList.contains('wide')) {
    navRail.classList.remove('wide');
    svgPath.setAttribute(
      'd',
      'M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z'
    );
  } else {
    navRail.classList.add('wide');
    svgPath.setAttribute(
      'd',
      'M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56' +
        ' 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z'
    );
  }
}

/**
 * Toggles between navigation bar and navigation rail display modes.
 * When nav-bar is visible, it hides the bar and shows the rail.
 * When nav-bar is hidden, it shows the bar and hides the rail.
 *
 * @returns {void}
 */
function toggleNavBarNavRail() {
  const navBar = document.getElementsByClassName('nav-bar').item(0);
  const navRail = document.getElementsByClassName('nav-rail').item(0);
  if (navBar && navRail) {
    if (navBar.classList.contains('hidden')) {
      navBar.classList.remove('hidden');
      navRail.classList.add('hidden');
    } else {
      navBar.classList.add('hidden');
      navRail.classList.remove('hidden');
    }
  }
}

/**
 * Shows the navigation drawer by removing the 'hidden' class.
 * Also sets the drawer to modal mode and updates the visibility of show/hide buttons.
 *
 * @returns {void}
 *
 * @see {@link navDrawerHide} - Hides the navigation drawer
 * @see {@link navDrawerModal} - Sets the drawer to modal mode
 */
function navDrawerShow() {
  const navDrawer = document.getElementsByClassName('nav-drawer').item(0);
  if (navDrawer.classList.contains('hidden')) {
    navDrawer.classList.remove('hidden');
    navDrawerModal();
  }

  document.getElementById('nav-drawer-show-button').classList.add('hidden');
  document.getElementById('nav-drawer-hide-button').classList.remove('hidden');
}

/**
 * Hides the navigation drawer by adding the 'hidden' class.
 * When called with an event, validates the click is outside the drawer area before hiding.
 * Updates the visibility of show/hide buttons.
 *
 * @param {Event} [event] - Optional click event for validation
 * @param {HTMLElement} [event.target] - The element that was clicked
 * @param {number} [event.clientX] - The X coordinate of the click
 * @returns {void}
 *
 * @see {@link navDrawerShow} - Shows the navigation drawer
 */
function navDrawerHide(event) {
  if (event) {
    console.log(event.target.classList);
    if (!event.target.classList.contains('nav-drawer')) {
      return;
    } else {
      if (event.clientX < event.target.getBoundingClientRect().right) {
        return;
      }
    }
  }

  const navDrawer = document.getElementsByClassName('nav-drawer').item(0);
  if (!navDrawer.classList.contains('hidden')) {
    navDrawer.classList.add('hidden');
  }

  document.getElementById('nav-drawer-show-button').classList.remove('hidden');
  document.getElementById('nav-drawer-hide-button').classList.add('hidden');
}

/**
 * Sets the navigation drawer to modal mode by adding the 'modal' class.
 * Modal mode typically makes the drawer overlay content and dismissible.
 * Updates the visibility of modal/fix toggle buttons.
 *
 * @returns {void}
 *
 * @see {@link navDrawerFix} - Sets the drawer to fixed mode
 * @see {@link navDrawerShow} - Automatically calls this when showing the drawer
 */
function navDrawerModal() {
  const navDrawer = document.getElementsByClassName('nav-drawer').item(0);
  if (!navDrawer.classList.contains('modal')) {
    navDrawer.classList.add('modal');
  }

  document.getElementById('nav-drawer-modal-button').classList.add('hidden');
  document.getElementById('nav-drawer-fix-button').classList.remove('hidden');
}

/**
 * Sets the navigation drawer to fixed mode by removing the 'modal' class.
 * Fixed mode typically makes the drawer permanently visible alongside content.
 * Updates the visibility of modal/fix toggle buttons.
 *
 * @returns {void}
 *
 * @see {@link navDrawerModal} - Sets the drawer to modal mode
 */
function navDrawerFix() {
  const navDrawer = document.getElementsByClassName('nav-drawer').item(0);
  if (navDrawer.classList.contains('modal')) {
    navDrawer.classList.remove('modal');
  }

  document.getElementById('nav-drawer-modal-button').classList.remove('hidden');
  document.getElementById('nav-drawer-fix-button').classList.add('hidden');
}

/**
 * Handles click events on tab items to manage active state.
 * Removes the 'active' class from all tab items in the parent container
 * and adds it to the clicked tab item.
 *
 * @param {Event} event - The click event from the tab item
 * @param {HTMLElement} event.currentTarget - The tab item element that was clicked
 * @returns {void}
 */
function tabItemOnClick(event) {
  const tabItem = event.currentTarget;
  const tabs = tabItem.parentElement;
  for (const item of tabs.children) {
    item.classList.remove('active');
  }
  tabItem.classList.add('active');
}

/**
 * @fileoverview Glassine Paper CSS - Material Design 3 Slider JavaScript
 *
 * This script is specifically designed to work with the Glassine Paper CSS framework.
 * It provides JavaScript functionality for Material Design 3 slider components,
 * handling slider interactions, visual progress updates, and datalist synchronization.
 *
 * IMPORTANT: This script only works with glassine-paper.css and requires the specific
 * CSS classes, custom properties, and HTML structure defined by that framework.
 *
 * Key Features:
 * - Real-time progress bar updates using CSS custom properties
 * - Support for both native HTML datalist and custom datalist elements
 * - Visual indication of datalist options below current value
 * - Automatic initialization of all slider components on page load
 * - Flexible datalist implementation (native <datalist> or custom .datalist divs)
 *
 * Browser Compatibility Note:
 * Native HTML <datalist> elements have limited support in Safari.
 * For Safari compatibility, use the custom .datalist implementation with
 * .option elements instead of native <datalist>/<option> elements.
 *
 * @author Glassine Paper CSS
 * @version 1.0.0
 * @since 1.0.0
 *
 * @requires glassine-paper.css - This script ONLY works with the Glassine Paper CSS framework
 * @requires .slider CSS class with --slider-progress custom property support
 * @requires Material Design 3 slider HTML structure as defined in glassine-paper.css
 *
 * @example
 * // Basic HTML structure (requires glassine-paper.css):
 * // Note: Native datalist has limited support in Safari
 * <link rel="stylesheet" href="glassine-paper.css">
 * <div class="slider">
 *   <input type="range" min="0" max="100" value="50" step="25" />
 *   <datalist>
 *     <option value="0"></option>
 *     <option value="25"></option>
 *     <option value="50"></option>
 *     <option value="75"></option>
 *     <option value="100"></option>
 *   </datalist>
 * </div>
 *
 * @example
 * // Custom datalist structure (requires glassine-paper.css, Safari compatible):
 * <link rel="stylesheet" href="glassine-paper.css">
 * <div class="slider">
 *   <input type="range" min="0" max="100" value="50" step="25" />
 *   <div class="datalist">
 *     <div class="option" value="0">0</div>
 *     <div class="option" value="25">25</div>
 *     <div class="option" value="50">50</div>
 *     <div class="option" value="75">75</div>
 *     <div class="option" value="100">100</div>
 *   </div>
 * </div>
 *
 * // Initialize on page load:
 * <body onload="bodyOnLoad()">
 */

/**
 * Handles input events for Material Design 3 slider components.
 * Updates the visual progress indicator and manages datalist option states.
 *
 * This function:
 * - Calculates the progress ratio based on current value relative to min/max
 * - Sets CSS custom property --slider-progress for visual progress bar
 * - Updates datalist options to show which values are below current selection
 * - Supports both native HTML datalist and custom .datalist elements
 * - Automatically falls back to custom .datalist when native datalist is unavailable (Safari)
 *
 * @param {Event} e - The input event from the slider range input
 * @param {HTMLInputElement} e.target - The range input element that triggered the event
 * @param {string} e.target.value - Current value of the slider
 * @param {string} e.target.min - Minimum value of the slider (default: 0)
 * @param {string} e.target.max - Maximum value of the slider (default: 0)
 * @param {HTMLDataListElement} [e.target.list] - Associated datalist element
 *
 * @example
 * // Typical usage - automatically called by event listener
 * input.addEventListener('input', onSliderInput);
 *
 * @example
 * // Manual call with synthetic event
 * onSliderInput({ target: inputElement });
 */
function onSliderInput(e) {
  const value = Number(e.target.value) || 0;
  const min = Number(e.target.min) || 0;
  const max = Number(e.target.max) || 0;
  const ratio = `${max > min ? ((value - min) / (max - min)) * 100 : 0}%`;

  const baseElement = e.target.closest('.slider');
  if (baseElement) {
    baseElement.style.setProperty('--slider-progress', ratio);
  }

  const sliderList =
    e.target.list ||
    (baseElement ? baseElement.getElementsByTagName('datalist').item(0) : null);
  if (sliderList) {
    for (const option of sliderList.options) {
      if (Number(option.value) < Number(value)) {
        option.classList.add('lower');
      } else {
        option.classList.remove('lower');
      }
    }
  } else if (baseElement) {
    const sliderDataList = baseElement
      .getElementsByClassName('datalist')
      .item(0);
    if (sliderDataList) {
      for (const option of sliderDataList.getElementsByClassName('option')) {
        if (Number(option.getAttribute('value')) < Number(value)) {
          option.classList.add('lower');
        } else {
          option.classList.remove('lower');
        }
      }
    }
  }
}

/**
 * Initializes all Material Design 3 slider components on the page.
 * Should be called when the DOM is fully loaded (typically on body onload).
 *
 * This function:
 * - Finds all elements with the 'slider' class
 * - Locates the input element within each slider
 * - Attaches input event listeners for real-time updates
 * - Performs initial setup to sync visual state with input values
 *
 * @function bodyOnLoad
 * @returns {void}
 *
 * @example
 * // HTML usage
 * <body onload="bodyOnLoad()">
 *
 * @example
 * // JavaScript usage
 * document.addEventListener('DOMContentLoaded', bodyOnLoad);
 *
 * @see {@link onSliderInput} - The event handler function attached to each slider
 *
 * @since 1.0.0
 */
function bodyOnLoad() {
  const sliders = document.getElementsByClassName('slider');
  for (const slider of sliders) {
    const input = slider.getElementsByTagName('input')[0];
    input.addEventListener('input', (event) => onSliderInput(event));
    onSliderInput({ target: input });
  }

  // Detect scroll on content area to update app-bar style
  const contentArea = document.getElementsByClassName('content-area').item(0);
  if (contentArea) {
    contentArea.addEventListener('scroll', () => {
      const appBar = document.getElementsByClassName('app-bar').item(0);
      if (appBar) {
        if (contentArea.scrollTop > 0) {
          appBar.classList.add('on-scroll');
        } else {
          appBar.classList.remove('on-scroll');
        }
      }
    });
  }
}
