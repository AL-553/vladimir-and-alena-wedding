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
            if(target === nameValidationContainer && document.body.clientWidth <= 399) {
                fieldFillingParagraph.style.removeProperty("line-height");
                fieldFillingParagraph.removeAttribute("style");
            }
            if(target === alcoholValidationContainer) {
                alcoholValidationParagraph.innerHTML = "";
                target.style.removeProperty("right");
            }
            if(target === alcoholValidationContainer && document.body.clientWidth <= 399) {
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
function chooseButtonClickActionsSuccess(clickEvent, markedCheckboxesList) {
    clickEvent.target.style.backgroundColor = "#80808054";
    clickEvent.target.classList.add("survey__choose-button_increased");
    setTimeout(() => {
        clickEvent.target.classList.add("survey__choose-button_disappeared");
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
                if(document.body.clientWidth <= 684 && document.body.clientWidth >= 545) {
                    alcoholValidationParagraph.innerHTML = "Сначала выберите,<br>пожалуйста, хотя бы один<br>из вариантов ответа этого<br>опроса";
                }
                else if(document.body.clientWidth <= 544 && document.body.clientWidth >= 400) {
                    alcoholValidationParagraph.innerHTML = "Сначала<br>выберите,<br>пожалуйста,<br>хотя бы<br>один из<br>вариантов<br>ответа<br>этого<br>опроса";
                }
                else if(document.body.clientWidth <= 399) {
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
function checkboxesMarkHandler(changeEvent) {
    if(changeEvent.target.checked) {
        markedCheckboxesAmount += 1;
        if(document.body.clientWidth >= 785) {
            if(window.getComputedStyle(chooseButton).getPropertyValue("--choose-button-hover-background-color") !== "white") {
                document.documentElement.style.setProperty("--choose-button-hover-background-color", "white");
            }
            if(chooseButton.style.cursor !== "pointer") {
                chooseButton.style.cursor = "pointer";
            }
        }
    }
    else {
        markedCheckboxesAmount -= 1;
        if(document.body.clientWidth >= 785) {
            if(markedCheckboxesAmount === 0) {
                document.documentElement.style.removeProperty("--choose-button-hover-background-color");
                document.documentElement.removeAttribute("style");
                chooseButton.style.removeProperty("cursor");
                chooseButton.removeAttribute("style");
            }
        }
    }
}
async function forBotInfoRequester() {
    try {
        const serverResponse = await fetch(`http://${window.location.host}/get-info-for-bot`, { method: "POST", signal: AbortSignal.timeout(7000) });

        if(serverResponse.ok && serverResponse.status === 200) {
            const responseData = await serverResponse.json();

            return responseData;
        }
        else {
            throw new Error("Fetch-запрос \"get-info-for-bot\" выполнен неуспешно (serverResponse.status не равно 200 или serverResponse.ok — false)");
        }
    }
    catch(error) {
        if(error.name === "TimeoutError") {
            console.log("Произошла ошибка. Ошибка внутри \"forBotInfoRequester\". Fetch-запрос \"get-info-for-bot\" выполнен неуспешно (превышено время" +
            " ожидания ответа сервера)");
        }
        else {
            console.log(`Произошла ошибка. Ошибка внутри "forBotInfoRequester". ${error}`);
        }
        return Promise.reject();
    }
}
async function toBotDataSender(forBotDataObject) {
    try {
        const telegramResponse = await fetch(`https://api.telegram.org/bot${forBotDataObject.neededProperty}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: forBotDataObject.someNumber,
                text: `
Приглашённый <b>${nameInput.value}</b> подтвердил присутствие
Предпочтения по алкоголю: <b>${markedCheckboxesValuesArray.join(", ")}</b>
                `,
                parse_mode: "HTML"
            }),
            signal: AbortSignal.timeout(15000)
        });

        if((!telegramResponse.ok || telegramResponse.status !== 200) && telegramResponse.status !== 204) {
            throw new Error("Fetch-запрос \"https://api.telegram.org/bot/sendMessage\" выполнен неуспешно (telegramResponse.status не равно 200 или telegramResponse.ok — false)");
        }
    }
    catch(error) {
        if(error.name === "TimeoutError") {
            console.log("Произошла ошибка. Ошибка внутри \"toBotDataSender\". Fetch-запрос \"https://api.telegram.org/bot/sendMessage\" выполнен неуспешно (превышено время" +
            " ожидания ответа сервера)");
        }
        else {
            console.log(`Произошла ошибка. Ошибка внутри "toBotDataSender". ${error}`);
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
        document.documentElement.style.removeProperty("--choose-button-hover-background-color");
        chooseButton.nextElementSibling.classList.remove("survey__choice-completed-icon_visible");
        chooseButton.classList.remove("survey__choose-button_disappeared", "survey__choose-button_increased");
        chooseButton.style.removeProperty("background-color");
        chooseButton.style.removeProperty("cursor");
        chooseButton.removeAttribute("style");
        document.documentElement.style.removeProperty("--come-button-hover-background-color");
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
    forBotInfoRequester().then((forBotDataObject) => {
        const neededConstant = forBotDataObject.neededProperty.replaceAll("№", "").replaceAll("!", "").replaceAll("~", "").replaceAll("%", "");

        toBotDataSender({ neededProperty: neededConstant, someNumber: forBotDataObject.someNumber }).then(() => {
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
        });
    }).catch(() => {
        loaderHiderWithDelay(true);
        errorStateDisplayer();
    });
}
function comeButtonClickHandler(clickEvent) {
    clickEvent.preventDefault();
    if(!localStorage.getItem("isAlreadyAnswered")) {
        if(isAllowClickComeButton && isAllowClickChooseButton) {
            isAllowClickComeButton = false;
            isAllowClickChooseButton = false;
            if(markedCheckboxesValuesArray.length !== 0) {
                if(nameInput.value !== "") {
                    if(!/^[АаБбВвГгЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщъЫыьЭэЮюЯя]+ [АаБбВвГгЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщъЫыьЭэЮюЯя]+$/
                    .test(nameInput.value)) {
                        const nameValidationContainerWidthValue = window.getComputedStyle(document.documentElement).getPropertyValue("--name-validation-container-width-value");
                        const longNameValidationContainerBottomValue = window.getComputedStyle(document.documentElement)
                        .getPropertyValue("--long-name-validation-container-bottom-value");

                        nameValidationContainer.style.width = nameValidationContainerWidthValue;
                        if(document.body.clientWidth <= 684 && document.body.clientWidth >= 545 || document.body.clientWidth <= 399) {
                            nameValidationContainer.style.zIndex = "1";
                        }
                        nameValidationContainer.style.bottom = longNameValidationContainerBottomValue;
                        if(document.body.clientWidth <= 399) {
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
                if(document.body.clientWidth <= 684 && document.body.clientWidth >= 545) {
                    alcoholValidationParagraph.innerHTML = "Сначала ответьте,<br>пожалуйста, на этот<br>опрос";
                }
                else if(document.body.clientWidth <= 544 && document.body.clientWidth >= 400) {
                    alcoholValidationParagraph.innerHTML = "Сначала<br>ответьте,<br>пожалуйста,<br>на этот<br>опрос";
                }
                else if(document.body.clientWidth <= 399) {
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
    if(document.body.clientWidth >= 785) {
        if(inputEvent.target.value !== "") {
            if(window.getComputedStyle(document.documentElement).getPropertyValue("--come-button-hover-background-color") !== "#5BCB5B") {
                document.documentElement.style.setProperty("--come-button-hover-background-color", "#5BCB5B");
            }
            if(comeButton.style.cursor !== "pointer") {
                comeButton.style.cursor = "pointer";
            }
        }
        else {
            document.documentElement.style.removeProperty("--come-button-hover-background-color");
            document.documentElement.removeAttribute("style");
            comeButton.style.removeProperty("cursor");
            comeButton.removeAttribute("style");
        }
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