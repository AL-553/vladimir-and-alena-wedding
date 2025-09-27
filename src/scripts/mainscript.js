import "../styles/common_styles.css";
import "../styles/footer_styles.css";
import "../styles/footer_adaptive.css";
import "../styles/header_styles.css";
import "../styles/header_adaptive.css";
import "../styles/main_element_styles.css";
import "../styles/main_element_adaptive.css";

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

window.addEventListener("storage", () => {
    if(!localStorage.getItem("isAlreadyAnswered")) {
        localStorage.setItem("isAlreadyAnswered", "true");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("isAlreadyAnswered")) {
        const answeredMessageParagraphLeftValue = window.getComputedStyle(document.documentElement).getPropertyValue("--already-answered-paragraph-left-value");

        checkboxesList.forEach((checkbox) => {
            checkbox.setAttribute("disabled", "");
            checkbox.style.cursor = "default";
        });
        chooseButton.style.cursor = "default";
        document.documentElement.style.setProperty("--choose-button-hover-background-color", "#80808054");
        document.documentElement.style.setProperty("--choose-button-active-background-color", "#80808054");
        document.documentElement.style.setProperty("--come-button-hover-background-color", "#50A950");
        document.documentElement.style.setProperty("--come-button-active-background-color", "#50A950");
        nameInput.setAttribute("disabled", "");
        comeButton.style.cursor = "default";
        answeredMessageParagraph.innerText = "Вы уже отправили ответ. Спасибо!";
        answeredMessageParagraph.style.left = `${answeredMessageParagraphLeftValue}`;
        answeredMessageParagraph.classList.add("survey__already-answered-paragraph");
    }
});
chooseButton.addEventListener("click", (event) => {
    chooseButtonClickHandler(event);
});
checkboxesList.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
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