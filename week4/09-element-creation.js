"use strict";
/*
"use strict" opts in to a stricter version of JS that makes suspicious code throw errors instead of silently succeeding.
It is only necessary for "classic" mode JS.  Module JS always runs in strict mode.
 */

function addToList() {
    /*
    Challenge 1 TODO: fill in this function so it adds <li>Making Silas happy</li> to the existing list.

    1.  Create the element using document.createElement("tagName")
    1b. Set the element's text using element.innerText
    2.  Get a reference to the ul using document.querySelector("yourCssSelector")
    2b. Append the newly-created li to the ul using ulReference.append(myNewLi)
     */
    const newLi = document.createElement("li");
    newLi.innerText = "Making Silas happy";
    const ul = document.querySelector("#csHardships")
    ul.append(newLi);
}
addToList();

const butt = document.querySelector("button")
butt.addEventListener("click", addToList)

/**
 * Increments an element's numerical attribute by some number.  Negative numbers will decrement the attribute.
 *
 * @param {Element} element element to modify
 * @param {string} attrName the attribute name to modify
 * @param {number} howMuch how much to increment the attribute by
 */
function incrementAttribute(element, attrName, howMuch) {
    const attributeValue = element.getAttribute(attrName);
    element.setAttribute(attrName, Number.parseFloat(attributeValue) + howMuch);
}

function attachKeyboardListener() {
    /*
    Challenge 3 TODO: fill in this function so it makes the <circle> element go up, left, down, right with the WASD keys

    You should attach a keydown listener to document.body.
    Given an keyboard event object called `e`, `e.key` gets the pressed key as a string.
    Use the incrementAttribute function, defined above, to help.  You want to modify the <circle>'s cx and cy properties.
    Careful: cx will behave as expected, but increasing cy will cause the circle to go DOWN.
    */
    const circle = document.querySelector("circle");
    document.body.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "w":
                incrementAttribute(circle, "cy", -5);
                break;
            case "a":
                incrementAttribute(circle, "cx", -5);
                break;
            case "s":
                incrementAttribute(circle, "cy", 5);
                break;
            case "d":
                incrementAttribute(circle, "cx", 5);
                break;
        }
    })

}
attachKeyboardListener();
