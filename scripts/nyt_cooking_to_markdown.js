// ==UserScript==
// @name         NYT Cooking to Markdown
// @version      2026-11-06
// @description  Converts New York Times Cooking recipes to markdown
// @author       You
// @match        https://cooking.nytimes.com/recipes/*
// @icon         https://icons.duckduckgo.com/ip2/nytimes.com.ico
// @grant        GM.setClipboard
// @grant        GM.registerMenuCommand
// @updateURL    https://raw.githubusercontent.com/mason-1009/userscripts/refs/heads/main/scripts/nyt_cooking_to_markdown.js
// @downloadURL  https://raw.githubusercontent.com/mason-1009/userscripts/refs/heads/main/scripts/nyt_cooking_to_markdown.js
// ==/UserScript==

function asciify(text) {
  // Converts specific Unicode characters (fractions + quotations) into their
  // ASCII equivalents
  return text
    .replace(/¼/g, "1/4")
    .replace(/½/g, "1/2")
    .replace(/¾/g, "3/4")
    .replace(/⅛/g, "1/8")
    .replace(/⅜/g, "3/8")
    .replace(/⅝/g, "5/8")
    .replace(/⅞/g, "7/8")
    .replace(/⅓/g, "1/3")
    .replace(/⅔/g, "2/3")
    .replace(/⅕/g, "1/5")
    .replace(/⅖/g, "2/5")
    .replace(/⅗/g, "3/5")
    .replace(/⅘/g, "4/5")
    .replace(/⅙/g, "1/6")
    .replace(/⅚/g, "5/6")
    .replace(/⅑/g, "1/10")
    .replace(/⅒/g, "3/10")
    .replace(/⅗/g, "7/10")
    .replace(/⅙/g, "9/10")
    .replace(/(‘|’)/g, "\'")
    .replace(/(“|”)/g, "\"");

}

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

  const lines = [
    `# ${title}\n`,
    "## Ingredients\n",
    ...ingredients,
    "\n## Recipe\n",
    ...recipeSteps,
    "\n## Notes\n",
    `This recipe was sourced from [New York Times Cooking](${url}).\n`,
  ];

  return asciify(lines.join("\n"));
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
