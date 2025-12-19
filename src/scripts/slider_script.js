const leftSliderControl = document.querySelector(".wedding-slider-container__left-control");
const rightSliderControl = document.querySelector(".wedding-slider-container__right-control");
const sliderImagesList = document.querySelectorAll(".wedding-slider-container__images-container > img");
const sliderTransformPropertyData = {
    ">=1300px": {
        rightDirection: {
            imagesTransformValuesByViewObject: {
                "2": "58.5776vw",
                "3": "87.866vw",
                "4": "117.115vw",
                "5": "146.4433vw",
                "6": "175.732vw",
                "7": "205.021vw" 
            },
            rightmostImageTransformValuesByOffsetArray: ["-175.732vw", "-146.4433vw", "-117.115vw", "-87.866vw", "-58.5776vw", "-29.2887vw", "0vw"],
            displacedImagesTransformValuesByViewObject: {
                "2": "-146.4433vw",
                "3": "-117.115vw",
                "4": "-87.866vw",
                "5": "-58.5776vw",
                "6": "-29.2887vw",
                "7": "0vw",
                "1": "29.2887vw"
            }
        },
        leftDirection: {
            imagesTransformValuesByViewObject: {
                "2": "0vw",
                "3": "-29.2887vw",
                "4": "-58.5776vw",
                "5": "-87.866vw",
                "6": "-117.115vw",
                "7": "-146.4433vw",
                "1": "-175.732vw"
            },
            leftmostImageTransformValuesByOffsetArray: ["205.021vw", "175.732vw", "146.4433vw", "117.115vw", "87.866vw", "58.5776vw", "29.2887vw"],
            displacedImagesTransformValuesByViewObject: {
                "3": "175.732vw",
                "4": "146.4433vw",
                "5": "117.115vw",
                "6": "87.866vw",
                "7": "58.5776vw",
                "1": "29.2887vw"
            }
        }
    },
    "1299px-900px": {
        rightDirection: {
            imagesTransformValuesByViewObject: {
                "2": "81.601vw",
                "3": "122.402vw",
                "4": "163.2021vw",
                "5": "204.003vw",
                "6": "244.8034vw",
                "7": "285.604vw"
            },
            rightmostImageTransformValuesByOffsetArray: ["-244.8034vw", "-204.003vw", "-163.2021vw", "-122.402vw", "-81.601vw", "-40.8006vw", "0vw"],
            displacedImagesTransformValuesByViewObject: {
                "2": "-204.003vw",
                "3": "-163.2021vw",
                "4": "-122.402vw",
                "5": "-81.601vw",
                "6": "-40.8006vw",
                "7": "0vw",
                "1": "40.8006vw"
            }
        },
        leftDirection: {
            imagesTransformValuesByViewObject: {
                "2": "0vw",
                "3": "-40.8006vw",
                "4": "-81.601vw",
                "5": "-122.402vw",
                "6": "-163.2021vw",
                "7": "-204.003vw",
                "1": "-244.8034vw"
            },
            leftmostImageTransformValuesByOffsetArray: ["285.604vw", "244.8034vw", "204.003vw", "163.2021vw", "122.402vw", "81.601vw", "40.8006vw"],
            displacedImagesTransformValuesByViewObject: {
                "3": "244.8034vw",
                "4": "204.003vw",
                "5": "163.2021vw",
                "6": "122.402vw",
                "7": "81.601vw",
                "1": "40.8006vw"
            }
        }
    },
    "899px-700px": {
        rightDirection: {
            imagesTransformValuesByViewObject: {
                "2": "129.7vw",
                "3": "194.549vw",
                "4": "259.399vw",
                "5": "324.249vw",
                "6": "389.0989vw",
                "7": "453.9488vw"
            },
            rightmostImageTransformValuesByOffsetArray: ["-389.0989vw", "-324.249vw", "-259.399vw", "-194.549vw", "-129.7vw", "-64.8498vw", "0vw"],
            displacedImagesTransformValuesByViewObject: {
                "2": "-324.249vw",
                "3": "-259.399vw",
                "4": "-194.549vw",
                "5": "-129.7vw",
                "6": "-64.8498vw",
                "7": "0vw",
                "1": "64.8498vw"
            }
        },
        leftDirection: {
            imagesTransformValuesByViewObject: {
                "2": "0vw",
                "3": "-64.8498vw",
                "4": "-129.7vw",
                "5": "-194.549vw",
                "6": "-259.399vw",
                "7": "-324.249vw",
                "1": "-389.0989vw"
            },
            leftmostImageTransformValuesByOffsetArray: ["453.9488vw", "389.0989vw", "324.249vw", "259.399vw", "194.549vw", "129.7vw", "64.8498vw"],
            displacedImagesTransformValuesByViewObject: {
                "3": "389.0989vw",
                "4": "324.249vw",
                "5": "259.399vw",
                "6": "194.549vw",
                "7": "129.7vw",
                "1": "64.8498vw"
            }
        }
    },
    "699px-560px": {
        rightDirection: {
            imagesTransformValuesByViewObject: {
                "2": "135.6223vw",
                "3": "203.433vw",
                "4": "271.244vw",
                "5": "339.0557vw",
                "6": "406.8669vw",
                "7": "474.678vw"
            },
            rightmostImageTransformValuesByOffsetArray: ["-406.8669vw", "-339.0557vw", "-271.244vw", "-203.433vw", "-135.6223vw", "-67.8111vw", "0vw"],
            displacedImagesTransformValuesByViewObject: {
                "2": "-339.0557vw",
                "3": "-271.244vw",
                "4": "-203.433vw",
                "5": "-135.6223vw",
                "6": "-67.8111vw",
                "7": "0vw",
                "1": "67.8111vw"
            }
        },
        leftDirection: {
            imagesTransformValuesByViewObject: {
                "2": "0vw",
                "3": "-67.8111vw",
                "4": "-135.6223vw",
                "5": "-203.433vw",
                "6": "-271.244vw",
                "7": "-339.0557vw",
                "1": "-406.8669vw"
            },
            leftmostImageTransformValuesByOffsetArray: ["474.678vw", "406.8669vw", "339.0557vw", "271.244vw", "203.433vw", "135.6223vw", "67.8111vw"],
            displacedImagesTransformValuesByViewObject: {
                "3": "406.8669vw",
                "4": "339.0557vw",
                "5": "271.244vw",
                "6": "203.433vw",
                "7": "135.6223vw",
                "1": "67.8111vw"
            }
        }
    },
    "559px-321px": {
        rightDirection: {
            imagesTransformValuesByViewObject: {
                "2": "143.8282vw",
                "3": "215.742vw",
                "4": "287.656vw",
                "5": "359.57vw",
                "6": "431.484vw",
                "7": "503.3989vw"
            },
            rightmostImageTransformValuesByOffsetArray: ["-431.484vw", "-359.57vw", "-287.656vw", "-215.742vw", "-143.8282vw", "-71.9141vw", "0vw"],
            displacedImagesTransformValuesByViewObject: {
                "2": "-359.57vw",
                "3": "-287.656vw",
                "4": "-215.742vw",
                "5": "-143.8282vw",
                "6": "-71.9141vw",
                "7": "0vw",
                "1": "71.9141vw"
            }
        },
        leftDirection: {
            imagesTransformValuesByViewObject: {
                "2": "0vw",
                "3": "-71.9141vw",
                "4": "-143.8282vw",
                "5": "-215.742vw",
                "6": "-287.656vw",
                "7": "-359.57vw",
                "1": "-431.484vw"
            },
            leftmostImageTransformValuesByOffsetArray: ["503.3989vw", "431.484vw", "359.57vw", "287.656vw", "215.742vw", "143.8282vw", "71.9141vw"],
            displacedImagesTransformValuesByViewObject: {
                "3": "431.484vw",
                "4": "359.57vw",
                "5": "287.656vw",
                "6": "215.742vw",
                "7": "143.8282vw",
                "1": "71.9141vw"
            }
        }
    },
    "<=320px": {
        rightDirection: {
            imagesTransformValuesByViewObject: {
                "2": "151.875vw",
                "3": "227.8125vw",
                "4": "303.75vw",
                "5": "379.6875vw",
                "6": "455.625vw",
                "7": "531.5625vw"
            },
            rightmostImageTransformValuesByOffsetArray: ["-455.625vw", "-379.6875vw", "-303.75vw", "-227.8125vw", "-151.875vw", "-75.9375vw", "0vw"],
            displacedImagesTransformValuesByViewObject: {
                "2": "-379.6875vw",
                "3": "-303.75vw",
                "4": "-227.8125vw",
                "5": "-151.875vw",
                "6": "-75.9375vw",
                "7": "0vw",
                "1": "75.9375vw"
            }
        },
        leftDirection: {
            imagesTransformValuesByViewObject: {
                "2": "0vw",
                "3": "-75.9375vw",
                "4": "-151.875vw",
                "5": "-227.8125vw",
                "6": "-303.75vw",
                "7": "-379.6875vw",
                "1": "-455.625vw"
            },
            leftmostImageTransformValuesByOffsetArray: ["531.5625vw", "455.625vw", "379.6875vw", "303.75vw", "227.8125vw", "151.875vw", "75.9375vw"],
            displacedImagesTransformValuesByViewObject: {
                "3": "455.625vw",
                "4": "379.6875vw",
                "5": "303.75vw",
                "6": "227.8125vw",
                "7": "151.875vw",
                "1": "75.9375vw"
            }
        }
    }
};
const imagesViewsMatchingArray = [[1, 1], [2, 7], [3, 6], [4, 5], [5, 4], [6, 3], [7, 2]];

let imagesDataArray;
let isAllowClickControl = true;
let imagesView = 1;
let lastClickedControl;
let transformDataObjectPropertyName;

function imagesDataArrayBuildingCommonAction(iterationImageDataArray, currentImagesPositionsArray) {
    return {
        image: iterationImageDataArray[0],
        currentImagePosition: currentImagesPositionsArray !== undefined ? currentImagesPositionsArray[iterationImageDataArray[1]] : iterationImageDataArray[1] + 1,
        initialImagePosition: iterationImageDataArray[2]
    };
}
function imagesDataArrayBuildingSwappingAction(imageObject, imageIndex, currentImagesPositionsArray) {
    if(imageIndex === 1) {
        return imagesDataArrayBuildingCommonAction([sliderImagesList[imageIndex + 1], imageIndex, imageIndex + 1], currentImagesPositionsArray);
    }
    else if(imageIndex === 2) {
        return imagesDataArrayBuildingCommonAction([sliderImagesList[imageIndex - 1], imageIndex, imageIndex + 1], currentImagesPositionsArray);
    }
    else {
        return imagesDataArrayBuildingCommonAction([imageObject, imageIndex, imageIndex + 1], currentImagesPositionsArray);
    }
}
function imagesDataArrayBuilder(isNeedSwapItems) {
    const currentImagesPositionsArray = [];
    
    if(imagesDataArray !== undefined && imagesView !== 1) {
        imagesDataArray.forEach((imageDataObject) => currentImagesPositionsArray.push(imageDataObject.currentImagePosition));
    }
    imagesDataArray = Array.from(sliderImagesList, (imageObject, imageIndex) => {
        if(currentImagesPositionsArray.length !== 0) {
            if(isNeedSwapItems) {
                return imagesDataArrayBuildingSwappingAction(imageObject, imageIndex, currentImagesPositionsArray);
            }
            else {
                return imagesDataArrayBuildingCommonAction([imageObject, imageIndex, imageIndex + 1], currentImagesPositionsArray);
            }
        }
        else {
            if(isNeedSwapItems) {
                return imagesDataArrayBuildingSwappingAction(imageObject, imageIndex);
            }
            else {
                return imagesDataArrayBuildingCommonAction([imageObject, imageIndex, imageIndex + 1]);
            }
        }
    });
}
function leftControlClickHandler(eventTarget) {
    if(isAllowClickControl) {
        const lastImageDataObject = imagesDataArray.find((imageDataObject) => imageDataObject.currentImagePosition === 7);

        isAllowClickControl = false;
        if(lastClickedControl === rightSliderControl) {
            const newImagesViewValue = imagesViewsMatchingArray.find((viewsArray) => viewsArray[0] === imagesView)[1];

            imagesView = newImagesViewValue;
        }
        eventTarget.classList.add("wedding-slider-container__left-right-controls_clicked");
        lastImageDataObject.image.style.zIndex = "-1";
        lastImageDataObject.image.style.transform = `translateX(${sliderTransformPropertyData[transformDataObjectPropertyName].rightDirection.
        rightmostImageTransformValuesByOffsetArray[lastImageDataObject.initialImagePosition - (lastImageDataObject.initialImagePosition + 1) + imagesView]})`;
        lastImageDataObject.currentImagePosition = 0;
        lastImageDataObject.image.style.removeProperty("z-index");
        imagesDataArray.forEach((imageDataObject) => {
            if(imageDataObject.currentImagePosition === 0) {
                setTimeout(() => {
                    imageDataObject.image.style.transition = "0.5s 0s transform ease normal";
                    for(let i = imagesDataArray.length - 1 - imagesView; i >= 0; i--) {
                        imagesDataArray[i].image.style.transform = `translateX(${sliderTransformPropertyData[transformDataObjectPropertyName].rightDirection.
                        imagesTransformValuesByViewObject[(imagesView + 1).toString()]})`;
                        imagesDataArray[i].currentImagePosition += 1;
                    }
                    for(let i = imagesDataArray.length - 1; i >= imagesDataArray.length - imagesView; i--) {
                        const clarifiedImagesView = imagesView === 7 ? 0 : imagesView;

                        imagesDataArray[i].image.style.transform = `translateX(${sliderTransformPropertyData[transformDataObjectPropertyName].rightDirection.
                        displacedImagesTransformValuesByViewObject[(clarifiedImagesView + 1).toString()]})`;
                        imagesDataArray[i].currentImagePosition += 1;
                        if(imagesDataArray[i].currentImagePosition === 1) {
                            imagesDataArray[i].image.addEventListener("transitionend", () => {
                                imagesDataArray.forEach((imageDataObject) => {
                                    imageDataObject.image.style.removeProperty("transition");
                                });
                                imagesView += 1;
                                if(imagesView === 8) {
                                    imagesView = 1;
                                }
                                isAllowClickControl = true;
                                lastClickedControl = leftSliderControl;
                            }, { once: true });
                        }
                    }
                }, 0);
            }
            else {
                imageDataObject.image.style.transition = "0.5s 0s transform ease normal";
            }
        });
    }
}
function rightControlClickHandler(eventTarget) {
    if(isAllowClickControl) {
        isAllowClickControl = false;
        if(lastClickedControl === leftSliderControl) {
            const newImagesViewValue = imagesViewsMatchingArray.find((viewsArray) => viewsArray[1] === imagesView)[0];

            imagesView = newImagesViewValue;
        }
        eventTarget.classList.add("wedding-slider-container__left-right-controls_clicked");
        imagesDataArray.forEach((imageDataObject) => {
            imageDataObject.image.style.transition = "0.5s 0s transform ease normal";
        });
        for(let i = imagesView - 1; i <= imagesDataArray.length - 1; i++) {
            const clarifiedImagesView = imagesView === 7 ? 0 : imagesView;

            imagesDataArray[i].image.style.transform = `translateX(${sliderTransformPropertyData[transformDataObjectPropertyName].leftDirection.
            imagesTransformValuesByViewObject[(clarifiedImagesView + 1).toString()]})`;
            imagesDataArray[i].currentImagePosition -= 1;
        }
        for(let i = 0; i <= imagesView - 2; i++) {
            const clarifiedImagesView = imagesView === 7 ? 0 : imagesView;

            imagesDataArray[i].image.style.transform = `translateX(${sliderTransformPropertyData[transformDataObjectPropertyName].leftDirection.
            displacedImagesTransformValuesByViewObject[(clarifiedImagesView + 1).toString()]})`;
            imagesDataArray[i].currentImagePosition -= 1;
        }

        const sixthImageDataObject = imagesDataArray.find((imageDataObject) => imageDataObject.currentImagePosition === 6);

        sixthImageDataObject.image.addEventListener("transitionend", () => {
            const firstImageDataObject = imagesDataArray.find((imageDataObject) => imageDataObject.currentImagePosition === 0);

            imagesDataArray.forEach((imageDataObject) => {
                imageDataObject.image.style.removeProperty("transition");
            });
            firstImageDataObject.image.style.zIndex = "-1";
            firstImageDataObject.image.style.transform = `translateX(${sliderTransformPropertyData[transformDataObjectPropertyName].leftDirection.
            leftmostImageTransformValuesByOffsetArray[firstImageDataObject.initialImagePosition - 1]})`;
            firstImageDataObject.currentImagePosition = 7;
            firstImageDataObject.image.style.removeProperty("z-index");
            imagesView += 1;
            if(imagesView === 8) {
                imagesView = 1;
            }
            isAllowClickControl = true;
            lastClickedControl = rightSliderControl;
        }, {once: true});
    }
}
function conrtolsAnimationEndHandler(eventTarget) {
    eventTarget.classList.remove("wedding-slider-container__left-right-controls_clicked");
}
function transformPropertyNameChanger() {
    if(window.innerWidth >= 1300) {
        transformDataObjectPropertyName = ">=1300px";
    }
    else if(window.innerWidth <= 1299 && window.innerWidth >= 900) {
        transformDataObjectPropertyName = "1299px-900px";
    }
    else if(window.innerWidth <= 899 && window.innerWidth >= 700) {
        transformDataObjectPropertyName = "899px-700px";
    }
    else if(window.innerWidth <= 699 && window.innerWidth >= 560) {
        transformDataObjectPropertyName = "699px-560px";
    }
    else if(window.innerWidth <= 559 && window.innerWidth >= 321) {
        transformDataObjectPropertyName = "559px-321px";
    }
    else if(window.innerWidth <= 320) {
        transformDataObjectPropertyName = "<=320px";
    }
}
function imagesTransformActionsRightDirection() {
    for(let i = imagesDataArray.length - imagesView; i >= 0; i--) {
        const transformDataObjectObjectName = imagesView === 1 ? "displacedImagesTransformValuesByViewObject" : "imagesTransformValuesByViewObject";

        imagesDataArray[i].image.style.transform = `translateX(${sliderTransformPropertyData[transformDataObjectPropertyName].
        rightDirection[transformDataObjectObjectName][imagesView.toString()]})`;
    }
    for(let i = imagesDataArray.length - 1; i >= imagesDataArray.length - imagesView + 1; i--) {
        imagesDataArray[i].image.style.transform = `translateX(${sliderTransformPropertyData[transformDataObjectPropertyName].rightDirection.
        displacedImagesTransformValuesByViewObject[imagesView.toString()]})`;
    }
}
function imagesTransformActionsLeftDirection() {
    for(let i = imagesView - 1; i <= imagesDataArray.length - 1; i++) {
        const transformDataObjectObjectName = imagesView === 1 ? "displacedImagesTransformValuesByViewObject" : "imagesTransformValuesByViewObject";

        imagesDataArray[i].image.style.transform = `translateX(${sliderTransformPropertyData[transformDataObjectPropertyName].leftDirection[transformDataObjectObjectName][imagesView.
        toString()]})`;
    }
    for(let i = 0; i <= imagesView - (imagesView === 2 ? 3 : 2); i++) {
        imagesDataArray[i].image.style.transform = `translateX(${sliderTransformPropertyData[transformDataObjectPropertyName].leftDirection.
        displacedImagesTransformValuesByViewObject[imagesView.toString()]})`;
    }
    if(imagesView === 2) {
        imagesDataArray[0].image.style.transform = `translateX(${sliderTransformPropertyData[transformDataObjectPropertyName].leftDirection.
        leftmostImageTransformValuesByOffsetArray[0]})`;
    }
}

export {
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
}