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
}
