// ==UserScript==
// @name         Amazon Dufus(TM)
// @version      2026-04-26
// @description  Renames Amazon's Rufus to Dufus
// @author       You
// @match        https://www.amazon.com*
// @icon         https://icons.duckduckgo.com/ip2/amazon.com.ico
// @updateURL    https://github.com/mason-1009/userscripts/raw/refs/heads/main/scripts/dufus.js
// @downloadURL  https://github.com/mason-1009/userscripts/raw/refs/heads/main/scripts/dufus.js
// ==/UserScript==

function rename() {
  document
    .querySelectorAll("div.nav-rufus-disco-text")
    .values()
    .forEach((n) => {
      console.log("Renaming Rufus -> Dufus");
      n.innerText = "Dufus";
    });
}

(function() {
  'use strict';

  // Rename once on page load before observing mutations
  rename();

  const observer = new MutationObserver((mutations, observer) => rename);

  const observerConfig = {
    subtree: true,
    childList: true,
  };

  observer.observe(document, observerConfig);
})();
