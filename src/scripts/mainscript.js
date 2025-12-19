import "../styles/common_styles.css";
import "../styles/footer_styles.css";
import "../styles/footer_adaptive.css";
import "../styles/header_styles.css";
import "../styles/header_adaptive.css";
import "../styles/main_element_styles.css";
import "../styles/main_element_adaptive.css";

import {
    leftSliderControl,
    rightSliderControl,
    lastClickedControl,
    imagesDataArrayBuilder,
    leftControlClickHandler,
    rightControlClickHandler,
    conrtolsAnimationEndHandler,
    transformPropertyNameChanger,
    imagesTransformActionsRightDirection,
    imagesTransformActionsLeftDirection
} from "slider_script.js";
import {
    chooseButton,
    checkboxesList,
    comeButton,
    errorMessageContainerCrossIcon,
    errorMessageContainer,
    nameInput,
    answeredMessageParagraph,
    chooseButtonClickHandler,
    checkboxesMarkHandler,
    comeButtonClickHandler,
    nameInputInputHandler
} from "survey_script.js";

let debounceTimeoutId;
let windowWidthBeforeResize = window.innerWidth;
let isNeedBuildOrdinaryArray = true;
let isNeedBuildSwappedItemsArray = true;
window.addEventListener("storage", () => {
    if(!localStorage.getItem("isAlreadyAnswered")) {
        localStorage.setItem("isAlreadyAnswered", "true");
    }
});
window.addEventListener("resize", () => {
    clearTimeout(debounceTimeoutId);
    debounceTimeoutId = setTimeout(() => {
        if(window.innerWidth <= 899 && isNeedBuildSwappedItemsArray) {
            isNeedBuildOrdinaryArray = true;
            imagesDataArrayBuilder(true);
        }
        else if(window.innerWidth >= 900 && isNeedBuildOrdinaryArray) {
            isNeedBuildSwappedItemsArray = true;
            imagesDataArrayBuilder(false);
        }
        transformPropertyNameChanger();
        if(windowWidthBeforeResize >= 1300 && window.innerWidth <= 1299 ||
        windowWidthBeforeResize <= 1299 && windowWidthBeforeResize >= 900 && window.innerWidth <= 899 ||
        windowWidthBeforeResize <= 899 && windowWidthBeforeResize >= 700 && window.innerWidth <= 699 && window.innerWidth >= 560 ||
        windowWidthBeforeResize <= 699 && windowWidthBeforeResize >= 560 && window.innerWidth <= 559 && window.innerWidth >= 321 ||
        windowWidthBeforeResize <= 559 && windowWidthBeforeResize >= 321 && window.innerWidth <= 320 ||
        windowWidthBeforeResize <= 1299 && window.innerWidth >= 1300 ||
        windowWidthBeforeResize <= 899 && window.innerWidth >= 900 && window.innerWidth <= 1299 ||
        windowWidthBeforeResize <= 699 && windowWidthBeforeResize >= 560 && window.innerWidth >= 700 && window.innerWidth <= 899 ||
        windowWidthBeforeResize <= 559 && windowWidthBeforeResize >= 321 && window.innerWidth >= 560 && window.innerWidth <= 699 ||
        windowWidthBeforeResize <= 320 && window.innerWidth >= 321 && window.innerWidth <= 559) {
            if(lastClickedControl === leftSliderControl) {
                imagesTransformActionsRightDirection();
            }
            else if(lastClickedControl === rightSliderControl) {
                imagesTransformActionsLeftDirection();
            }
        }
        windowWidthBeforeResize = window.innerWidth;
    }, 0);
});
document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("isAlreadyAnswered")) {
        const answeredMessageParagraphLeftValue = window.getComputedStyle(document.documentElement).getPropertyValue("--already-answered-paragraph-left-value");

        checkboxesList.forEach((checkbox) => {
            checkbox.setAttribute("disabled", "");
            checkbox.style.cursor = "default";
        });
        chooseButton.style.cursor = "default";
        if(window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
            document.documentElement.style.setProperty("--choose-button-active-background-color", "#80808054");
            document.documentElement.style.setProperty("--come-button-active-background-color", "#50A950");
        }
        else {
            document.documentElement.style.setProperty("--choose-button-hover-background-color", "#80808054");
            document.documentElement.style.setProperty("--come-button-hover-background-color", "#50A950");
        }
        nameInput.setAttribute("disabled", "");
        comeButton.style.cursor = "default";
        answeredMessageParagraph.innerText = "Вы уже отправили ответ. Спасибо!";
        answeredMessageParagraph.style.left = `${answeredMessageParagraphLeftValue}`;
        answeredMessageParagraph.classList.add("survey__already-answered-paragraph");
    }
    if(window.innerWidth <= 899) {
        imagesDataArrayBuilder(true);
        isNeedBuildSwappedItemsArray = false;
    }
    else {
        imagesDataArrayBuilder(false);
        isNeedBuildOrdinaryArray = false;
    }
    transformPropertyNameChanger();
});
chooseButton.addEventListener("click", (event) => {
    chooseButtonClickHandler(event);
});
checkboxesList.forEach((checkbox) => {
    checkbox.addEventListener("input", (event) => {
        checkboxesMarkHandler(event);
    });
});
comeButton.addEventListener("click", (event) => {
    comeButtonClickHandler(event);
});
errorMessageContainerCrossIcon.addEventListener("click", () => {
    errorMessageContainer.style.removeProperty("display");
    errorMessageContainer.removeAttribute("style");
});
nameInput.addEventListener("input", (event) => {
    nameInputInputHandler(event);
});
leftSliderControl.addEventListener("click", (event) => {
    leftControlClickHandler(event.target);
});
leftSliderControl.addEventListener("animationend", (event) => {
    conrtolsAnimationEndHandler(event.target);
});
rightSliderControl.addEventListener("click", (event) => {
    rightControlClickHandler(event.target);
});
rightSliderControl.addEventListener("animationend", (event) => {
    conrtolsAnimationEndHandler(event.target);
})