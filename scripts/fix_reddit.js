// ==UserScript==
// @name         Fix Reddit
// @version      2026-08-12
// @description  Removes annoying anti-features from Reddit
// @author       You
// @match        https://www.reddit.com*
// @icon         https://icons.duckduckgo.com/ip2/reddit.com.ico
// @updateURL    https://github.com/mason-1009/userscripts/raw/refs/heads/main/scripts/fix_reddit.js
// @downloadURL  https://github.com/mason-1009/userscripts/raw/refs/heads/main/scripts/fix_reddit.js
// ==/UserScript==

/* === Removal functions === */

function desktopRemoveUpsellDialog() {
  // Removes the forced "Join the most real place on the internet" that
  // appears after browsing Reddit without an account
  const dialog = document.querySelector('#desktop-dynamic-upsell-dialog');

  if (dialog !== null) {
    console.log('Removing forced sign-in dialog...');
    dialog.remove();
  }
}

function desktopRemovePromoBanner() {
  // Removes the sign-up banner on the left side of the screen on desktop
  // versions
  const banner = document
    .querySelector('faceplate-tracker[noun=\'static_left_rail_banner\']');

  if (banner !== null) {
    console.log('Removing left sidebar sign-in banner...');
    banner.remove();
  }
}

function mobileRemoveGetAppButton() {
  // Removes the "Get App" button at the top right banner on mobile devices
  const button = document
    .querySelector('faceplate-tracker[noun=\'top_nav_get_app\']');

  if (button !== null) {
    console.log('Removing right top bar open app button...');
    banner.remove();
  }
}

function removeItems() {
  // Remove desktop items
  desktopRemoveUpsellDialog();
  desktopRemovePromoBanner();

  // Remove mobile items
  mobileRemoveGetAppButton();
}

/* === Entrypoint === */

(function() {
  'use strict';

  // Perform first removal
  removeItems();

  const observer = new MutationObserver((mutations, observer) => removeItems);
  const observerConfig = {
    subtree: true,
    childList: true,
  };

  observer.observe(document, observerConfig);
})();
