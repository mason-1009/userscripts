// ==UserScript==
// @name         NYT Cooking to Markdown
// @version      2026-04-16
// @description  Converts New York Times Cooking recipes to markdown
// @author       You
// @match        https://cooking.nytimes.com/recipes/*
// @icon         https://icons.duckduckgo.com/ip2/nytimes.com.ico
// @grant        GM.setClipboard
// @grant        GM.registerMenuCommand
// ==/UserScript==

function collectURL() {
  return window.location.href;
}

function collectTitle() {
  return document.querySelector('h1.pantry--title-display').innerText;
}

function collectIngredients() {
  return document
    .querySelectorAll("div[class*=\"recipebody_ingredients\"] ul li")
    .values()
    .map((n) => Array.from(n.children).map((c) => c.innerText).join(" "));
}

function collectRecipeSteps() {
  return document
    .querySelectorAll("ol[class*=\"preparation_stepList___jqWa\"] li p")
    .values().map((n) => n.innerText);
}

function buildMarkdown() {
  const url = collectURL();
  const title = collectTitle();

  const ingredients = collectIngredients()
    .map((i) => `- ${i}`);
  const recipeSteps = collectRecipeSteps()
    .map((s, index) => `${index + 1}. ${s}`);

  return [
    `# ${title}\n`,
    "## Ingredients\n",
    ...ingredients,
    "\n## Recipe\n",
    ...recipeSteps,
    "\n## Notes\n",
    `This recipe was sourced by [New York Times Cooking](${url})\n`,
  ].join("\n");
}

function scrapeRecipe() {
  GM.setClipboard(buildMarkdown());
  console.log("Recipe has been copied to clipboard -- enjoy!");
}

(function() {
  'use strict';

  const scrapeCmd = "Copy Markdown Recipe";
  GM.registerMenuCommand(scrapeCmd, scrapeRecipe);
})();
