const chooseButton = document.querySelector(".survey__choose-button");
const checkboxesList = document.querySelectorAll(".survey__alcohol-survey-container > div > input");
const markedCheckboxesValuesArray = [];
const comeButton = document.querySelector(".survey__confirmation-controls-container > button");
const alcoholValidationContainer = document.querySelector(".survey__alcohol-validation-container");
const preferredAlcoholParagraph = document.querySelector(".survey__preferred-alcohol-paragraph");
const nameInput = document.querySelector(".survey__confirmation-controls-container > input");
const fieldFillingParagraph = document.querySelector(".survey__name-validation-container > p");
const nameValidationContainer = document.querySelector(".survey__name-validation-container");
const errorMessageContainer = document.querySelector(".survey__error-message-container");
const errorMessageContainerCrossIcon = document.querySelector(".survey__error-message-container > div > img:last-child");
const surveyForm = document.querySelector("form");
const surveyLoaderItemsContainer = document.querySelector(".survey__loader-items-container");
const surveyLoaderContainer = document.querySelector(".survey__loader-container");
const answeredMessageParagraph = document.querySelector(".survey__confirmation-controls-container > p");
const comeConfirmationSuccessImage = document.querySelector(".survey__confirmation-success-image-container > img");
const successImageContainer = document.querySelector(".survey__confirmation-success-image-container");
const alcoholValidationParagraph = document.querySelector(".survey__alcohol-validation-container > p");
const hintParagraph = document.querySelector(".survey__hint-paragraph");

let markedCheckboxesAmount = 0;
let isAllowClickComeButton = true;
let isAllowClickChooseButton = true;

function displayingAnimationApplicator(target, className) {
    if(target === alcoholValidationContainer && window.matchMedia("(max-width: 399px)").matches) {
        hintParagraph.style.visibility = "hidden";
    }
    target.style.visibility = "visible";
    target.classList.add(`${className}_visible`);
    setTimeout(() => {
        target.classList.add(`${className}_hidden`);
        setTimeout(() => {
            target.classList.remove(`${className}_visible`);
            target.classList.remove(`${className}_hidden`);
            target.style.removeProperty("visibility");
            if(target === nameValidationContainer) {
                fieldFillingParagraph.innerText = "";
                target.style.removeProperty("width");
                target.style.removeProperty("z-index");
                target.style.removeProperty("bottom");
            }
            if(target === nameValidationContainer && window.innerWidth <= 399) {
                fieldFillingParagraph.style.removeProperty("line-height");
                fieldFillingParagraph.removeAttribute("style");
            }
            if(target === alcoholValidationContainer) {
                alcoholValidationParagraph.innerHTML = "";
                target.style.removeProperty("right");
            }
            if(target === alcoholValidationContainer && window.innerWidth <= 399) {
                alcoholValidationParagraph.style.removeProperty("line-height");
                alcoholValidationParagraph.removeAttribute("style");
            }
            target.removeAttribute("style");
            if(target === alcoholValidationContainer && window.matchMedia("(max-width: 399px)").matches) {
                hintParagraph.style.removeProperty("visibility");
                hintParagraph.removeAttribute("style");
            }
            isAllowClickChooseButton = true;
            isAllowClickComeButton = true;
        }, 500);
    }, 3500);
}
function rootElementStylesCleaner(buttonName) {
    if(window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
        document.documentElement.style.removeProperty(`--${buttonName}-button-active-background-color`);
    }
    else {
        document.documentElement.style.removeProperty(`--${buttonName}-button-hover-background-color`);
    }
    document.documentElement.removeAttribute("style");
}
function chooseButtonClickActionsSuccess(clickEvent, markedCheckboxesList) {
    clickEvent.target.style.backgroundColor = "#80808054";
    clickEvent.target.classList.add("survey__choose-button_increased");
    setTimeout(() => {
        clickEvent.target.classList.add("survey__choose-button_disappeared");
        rootElementStylesCleaner("choose");
        setTimeout(() => {
            clickEvent.target.nextElementSibling.classList.add("survey__choice-completed-icon_visible");
            isAllowClickChooseButton = true;
            isAllowClickComeButton = true;
        }, 200);
    }, 200);
    markedCheckboxesList.forEach((checkbox) => {
        markedCheckboxesValuesArray.push(checkbox.value);
    });
    checkboxesList.forEach((checkbox) => {
        checkbox.setAttribute("disabled", "");
        checkbox.style.cursor = "default";
    });
}
function chooseButtonClickHandler(clickEvent) {
    clickEvent.preventDefault();
    if(!localStorage.getItem("isAlreadyAnswered")) {
        if(isAllowClickChooseButton && isAllowClickComeButton) {
            isAllowClickChooseButton = false;
            isAllowClickComeButton = false;
            if(markedCheckboxesAmount >= 1) {
                const markedCheckboxesList = document.querySelectorAll(".survey__alcohol-survey-container > div > input:checked");

                if(window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
                    setTimeout(chooseButtonClickActionsSuccess, 125, clickEvent, markedCheckboxesList);
                }
                else {
                    chooseButtonClickActionsSuccess(clickEvent, markedCheckboxesList);
                }
            }
            else {
                const chooseVariantFirstRightValue = window.getComputedStyle(document.documentElement).getPropertyValue("--choose-variant-first-right-value");

                preferredAlcoholParagraph.scrollIntoView({ behavior: "smooth", block: "center" });
                alcoholValidationContainer.style.right = `${chooseVariantFirstRightValue}`;
                if(window.innerWidth <= 699 && window.innerWidth >= 560) {
                    alcoholValidationParagraph.innerHTML = "Сначала выберите,<br>пожалуйста, хотя бы один<br>из вариантов ответа этого<br>опроса";
                }
                else if(window.innerWidth <= 559 && window.innerWidth >= 400) {
                    alcoholValidationParagraph.innerHTML = "Сначала<br>выберите,<br>пожалуйста,<br>хотя бы<br>один из<br>вариантов<br>ответа<br>этого<br>опроса";
                }
                else if(window.innerWidth <= 399) {
                    alcoholValidationParagraph.style.lineHeight = "5vw";
                    alcoholValidationParagraph.innerHTML = "Сначала выберите, пожалуйста, хотя бы<br>один из вариантов ответа этого опроса";
                }
                else {
                    alcoholValidationParagraph.innerHTML = "Сначала выберите, пожалуйста, хотя бы<br>один из вариантов ответа этого опроса";
                }
                setTimeout(() => {
                    displayingAnimationApplicator(alcoholValidationContainer, "survey__alcohol-validation-container");
                }, 0);
            }
        }
    }
}
function checkboxesMarkHandler(inputEvent) {
    if(inputEvent.target.checked) {
        markedCheckboxesAmount += 1;
        if(window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
            if(window.getComputedStyle(chooseButton).getPropertyValue("--choose-button-active-background-color") !== "white") {
                document.documentElement.style.setProperty("--choose-button-active-background-color", "white");
            }
        }
        else {
            if(window.getComputedStyle(chooseButton).getPropertyValue("--choose-button-hover-background-color") !== "white") {
                document.documentElement.style.setProperty("--choose-button-hover-background-color", "white");
            }
        }
        if(chooseButton.style.cursor !== "pointer") {
            chooseButton.style.cursor = "pointer";
        }
    }
    else {
        markedCheckboxesAmount -= 1;
        if(markedCheckboxesAmount === 0) {
            rootElementStylesCleaner("choose");
            chooseButton.style.removeProperty("cursor");
            chooseButton.removeAttribute("style");
        }
    }
}
async function surveyFormDataSender() {
    try {
        const serverResponse = await fetch(`${window.location.protocol}://${window.location.host}/send-survey-data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nameSurname: nameInput.value,
                surveyAnswers: markedCheckboxesValuesArray
            }),
            signal: AbortSignal.timeout(15000)
        });

        if((!serverResponse.ok || serverResponse.status !== 200) && serverResponse.status !== 204) {
            throw new Error(`Fetch-запрос \"http://${window.location.host}/send-survey-data\" выполнен неуспешно (serverResponse.status не равно 200 или serverResponse.ok —` +
            " false)");
        }
    }
    catch(error) {
        if(error.name === "TimeoutError") {
            console.log(`Произошла ошибка. Ошибка внутри \"surveyFormDataSender\". Fetch-запрос \"http://${window.location.host}/send-survey-data\" выполнен неуспешно` +
            " (превышено время ожидания ответа сервера)");
        }
        else {
            console.log(`Произошла ошибка. Ошибка внутри "surveyFormDataSender". ${error}`);
        }
        return Promise.reject();
    }
}
function loaderHider(isNeedShowButton) {
    surveyLoaderContainer.style.removeProperty("display");
    surveyLoaderContainer.removeAttribute("style");
    surveyLoaderItemsContainer.classList.remove("survey__loader-items-container_scaling-rotating");
    if(isNeedShowButton) {
        comeButton.style.removeProperty("display");
        comeButton.removeAttribute("style");
    }
}
function loaderHiderWithDelay(isNeedShowButton) {
    setTimeout(loaderHider, 2000, isNeedShowButton);
}
function errorStateDisplayer() {
    setTimeout(() => {
        errorMessageContainer.style.display = "block";
        surveyForm.reset();
        checkboxesList.forEach((checkbox) => {
            checkbox.removeAttribute("disabled");
            checkbox.style.removeProperty("cursor");
            checkbox.removeAttribute("style");
        });
        chooseButton.nextElementSibling.classList.remove("survey__choice-completed-icon_visible");
        chooseButton.classList.remove("survey__choose-button_disappeared", "survey__choose-button_increased");
        chooseButton.style.removeProperty("background-color");
        chooseButton.style.removeProperty("cursor");
        chooseButton.removeAttribute("style");
        markedCheckboxesAmount = 0;
        markedCheckboxesValuesArray.splice(0, markedCheckboxesValuesArray.length);
        isAllowClickChooseButton = true;
        isAllowClickComeButton = true;
    }, 2000);
}
function comeButtonClickActionsSuccess() {
    comeButton.style.display = "none";
    surveyLoaderContainer.style.display = "block";
    surveyLoaderItemsContainer.classList.add("survey__loader-items-container_scaling-rotating");
    surveyFormDataSender().then(() => {
        setTimeout(() => {
            loaderHider(false);
            successImageContainer.style.display = "block";
            comeConfirmationSuccessImage.classList.add("survey__come-confirmation-success-image_impulsed");
            setTimeout(() => {
                const answeredMessageParagraphLeftValue = window.getComputedStyle(document.documentElement).getPropertyValue("--confirmation-success-paragraph-left-value");

                answeredMessageParagraph.innerText = "Ваш ответ записан. Спасибо!";
                answeredMessageParagraph.style.left = `${answeredMessageParagraphLeftValue}`;
                answeredMessageParagraph.classList.add("survey__confirmation-success-paragraph");
                nameInput.setAttribute("disabled", "");
                localStorage.setItem("isAlreadyAnswered", "true");
            }, 750);
        }, 2000);
    }).catch(() => {
        loaderHiderWithDelay(true);
        errorStateDisplayer();
    }).finally(() => rootElementStylesCleaner("come"));
}
function comeButtonClickHandler(clickEvent) {
    clickEvent.preventDefault();
    if(!localStorage.getItem("isAlreadyAnswered")) {
        if(isAllowClickComeButton && isAllowClickChooseButton) {
            isAllowClickComeButton = false;
            isAllowClickChooseButton = false;
            if(markedCheckboxesValuesArray.length !== 0) {
                if(nameInput.value !== "") {
                    if(!/^[АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщъЫыьЭэЮюЯя]+ [АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщъЫыьЭэЮюЯя]+$/
                    .test(nameInput.value)) {
                        const nameValidationContainerWidthValue = window.getComputedStyle(document.documentElement).getPropertyValue("--name-validation-container-width-value");
                        const longNameValidationContainerBottomValue = window.getComputedStyle(document.documentElement)
                        .getPropertyValue("--long-name-validation-container-bottom-value");

                        nameValidationContainer.style.width = nameValidationContainerWidthValue;
                        if(window.innerWidth <= 699 && window.innerWidth >= 560 || window.innerWidth <= 399) {
                            nameValidationContainer.style.zIndex = "1";
                        }
                        nameValidationContainer.style.bottom = longNameValidationContainerBottomValue;
                        if(window.innerWidth <= 399) {
                            fieldFillingParagraph.style.lineHeight = "5vw";
                        }
                        fieldFillingParagraph.innerText = "Пожалуйста, введите ваши имя и фамилию русскими буквами через пробел";
                        displayingAnimationApplicator(nameValidationContainer, "survey__name-validation-container");
                    }
                    else {
                        if(window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
                            setTimeout(comeButtonClickActionsSuccess, 125);
                        }
                        else {
                            comeButtonClickActionsSuccess();
                        }
                    }
                }
                else {
                    const shortNameValidationContainerBottomValue = window.getComputedStyle(document.documentElement)
                    .getPropertyValue("--short-name-validation-container-bottom-value");

                    nameValidationContainer.style.bottom = shortNameValidationContainerBottomValue;
                    fieldFillingParagraph.innerText = "Пожалуйста, заполните это поле";
                    displayingAnimationApplicator(nameValidationContainer, "survey__name-validation-container");
                }
            }
            else {
                const surveyAnswerFirstRightValue = window.getComputedStyle(document.documentElement).getPropertyValue("--survey-answer-first-right-value");

                preferredAlcoholParagraph.scrollIntoView({ behavior: "smooth", block: "center" });
                alcoholValidationContainer.style.right = `${surveyAnswerFirstRightValue}`;
                if(window.innerWidth <= 699 && window.innerWidth >= 560) {
                    alcoholValidationParagraph.innerHTML = "Сначала ответьте,<br>пожалуйста, на этот<br>опрос";
                }
                else if(window.innerWidth <= 559 && window.innerWidth >= 400) {
                    alcoholValidationParagraph.innerHTML = "Сначала<br>ответьте,<br>пожалуйста,<br>на этот<br>опрос";
                }
                else if(window.innerWidth <= 399) {
                    alcoholValidationParagraph.innerText = "Сначала ответьте, пожалуйста, на этот опрос";
                }
                else {
                    alcoholValidationParagraph.innerHTML = "Сначала ответьте, пожалуйста,<br>на этот опрос";
                }
                setTimeout(() => {
                    displayingAnimationApplicator(alcoholValidationContainer, "survey__alcohol-validation-container");
                }, 0);
            }
        }
    }
}
function nameInputInputHandler(inputEvent) {
    if(inputEvent.target.value !== "") {
        if(window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
            if(window.getComputedStyle(document.documentElement).getPropertyValue("--come-button-active-background-color") !== "#5BCB5B") {
                document.documentElement.style.setProperty("--come-button-active-background-color", "#5BCB5B");
            }
        }
        else {
            if(window.getComputedStyle(document.documentElement).getPropertyValue("--come-button-hover-background-color") !== "#5BCB5B") {
                document.documentElement.style.setProperty("--come-button-hover-background-color", "#5BCB5B");
            }
        }
        if(comeButton.style.cursor !== "pointer") {
            comeButton.style.cursor = "pointer";
        }
    }
    else {
        rootElementStylesCleaner("come");
        comeButton.style.removeProperty("cursor");
        comeButton.removeAttribute("style");
    }
}

export {
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
}