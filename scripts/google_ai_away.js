// ==UserScript==
// @name         Google AI-Away(TM)
// @version      2026-04-26
// @description  Removes unwanted AI features from Google Search
// @author       You
// @match        *://google.com*
// @match        *://google.com/search*
// @icon         https://icons.duckduckgo.com/ip2/google.com.ico
// @updateURL    https://github.com/mason-1009/userscripts/raw/refs/heads/main/scripts/google_ai_away.js
// @downloadURL  https://github.com/mason-1009/userscripts/raw/refs/heads/main/scripts/google_ai_away.js
// ==/UserScript==

// Banner messages to replace
const BANNER_MESSAGES = [
  "Applying AI towards science and the environment",
];

// New banner message
const REPLACEMENT_BANNER = "Wasting your time with chatbots";

function replaceSearchHomeBanner() {
  document
    .querySelectorAll("span")
    .values()
    .filter((node) => BANNER_MESSAGES.includes(node.innerText.trim()))
    .forEach((node) => node.innerText = REPLACEMENT_BANNER);
}

function deleteSearchHomeAIModeButton() {
  // Deletes the "AI Mode" button on the search home
  document
    .querySelectorAll("button")
    .values()
    .filter((node) => node.innerText.trim() === "AI Mode")
    .forEach((node) => node.remove());
}

function deleteSearchResultsAIModeButton() {
  // Deletes the "AI Mode" button on the search results page
  document
    .querySelectorAll("div[role=\"listitem\"]")
    .values()
    .filter((node) => node.innerText.trim() === "AI Mode")
    .forEach((node) => node.remove());
}

function deleteSearchResultsAIOverview() {
  // Removes the "AI Overview" tab from the search results
  //
  // Because elements are not labeled, we must null-safe access chain through
  // the parent nodes until we get to the top element
  document
    .querySelectorAll("div[role=\"heading\"]")
    .values()
    .filter((node) => node.innerText.trim() === "AI Overview")
    .forEach((node) => node
      .parentNode
      ?.parentNode
      ?.parentNode
      ?.parentNode
      ?.parentNode
      ?.parentNode
      ?.parentNode
      ?.parentNode
      ?.parentNode
      ?.parentNode
      ?.parentNode
      ?.parentNode
      ?.parentNode
      ?.remove());
}

function disableTargetNodes() {
  // Performs all cleanups
    replaceSearchHomeBanner();
    deleteSearchHomeAIModeButton();
    deleteSearchResultsAIModeButton();
    deleteSearchResultsAIOverview();
}

(function() {
  'use strict';

  // Perform the first pass of deletions before spinning up the observer
  disableTargetNodes();

  const observer = new MutationObserver((mutations, observer) => {
    disableTargetNodes();
  });

  const observerConfig = {
    subtree: true,
    childList: true,
  };

  observer.observe(document, observerConfig);
})();
