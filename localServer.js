const http = require("node:http");
const fs = require("node:fs");
const permittedFilesPathsArray = [
    "/src/assets/fonts/CormorantGaramond",
    "/src/assets/fonts/OpenSans",
    "/src/assets/fonts/QwitcherGryphen",
    "/src/assets/icons",
    "/src/assets/images",
    "/build/scripts",
    "/build/styles"
];
const permittedFilesNamesArray = [
    "CormorantGaramond-Regular.woff2",
    "OpenSans-Regular.woff2",
    "QwitcherGrypen-Bold.woff2",
    "left_arrow.svg",
    "right_arrow.svg",
    "tick.svg",
    "bride_groom_icon.svg",
    "heart_icon.svg",
    "completed_circle_checkmark.svg",
    "cross_circle.svg",
    "cross.svg",
    "green_empty_circle.svg",
    "firecracker_icon.svg",
    "green_empty_circle_increased.svg",
    "two_wedding_rings_favicon.ico",
    "background_dented_paper.jpg",
    "vladimir_alena_sitting_basket_greenery_cat.jpg",
    "dress_code_colors_green_apples.jpg",
    "vladimir_alena_laughing.jpg",
    "vladimir_alena_walking_garden_basket_greenery.jpg",
    "mainscript.js",
    "mainstyle.css"
];

function MIMERecognizer(extension) {
    let contentType;

    switch(extension) {
        case "woff2":
            contentType = "font/woff2";
            break;
        case "svg":
            contentType = "image/svg+xml; charset=utf-8";
            break;
        case "ico":
            contentType = "image/x-icon";
            break;
        case "jpg":
            contentType = "image/jpeg";
            break;
        case "js":
            contentType = "text/javascript; charset=utf-8";
            break;
        case "css":
            contentType = "text/css; charset=utf-8";
            break;
        default:
            contentType = "text/plain";
    }
    
    return contentType;
}

const server = http.createServer({ maxHeaderSize: 512000, requestTimeout: 30000 }, (request, response) => {
    const telegramBotToken = "7№~3№~7№~8№~1№~6№~9№~8№~6№~3№~:№~A№~A№~!%E№~!%-№~!%9№~!%m№~!%G№~!%r№~!%2№~!%L!%8!T%f!%L!%3!%z!%L!%r!%m!%m!%z!%V!%e!%4!%-!%G!%e!%_!%4!%R!%x!%x!%F!%v!%M";
    const telegramUserId = "775720844";

    if(request.url === "/" || request.url === "http://localhost:3000/" || request.url === "/index.html") {
        fs.readFile(`${__dirname}/index.html`, (indexError, indexData) => {
            if(indexError) {
                console.log(`Ошибка. Не получилось прочитать содержимое файла index.html. ${indexError}`);
                response.statusCode = 500;
                response.end();
            }
            else if(indexData) {
                response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }).end(indexData);
            }
        });
    }
    else if(request.url === "http://localhost:3000/get-info-for-bot" || request.url === "/get-info-for-bot") {
        response.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify({ neededProperty: telegramBotToken, someNumber: telegramUserId }));
    }
    else {
        let requestPath = request.url.slice(0, request.url.lastIndexOf("/"));
        let requestFullFileName = request.url.slice(request.url.lastIndexOf("/") + 1);
        let requestFileExtension = request.url.slice(request.url.lastIndexOf(".") + 1);

        if(permittedFilesPathsArray.includes(requestPath)) {
            if(permittedFilesNamesArray.includes(requestFullFileName)) {
                let MIMEType = MIMERecognizer(requestFileExtension);

                fs.readFile(__dirname + request.url, (fileError, fileData) => {
                    if(fileError) {
                        console.log(`Ошибка. Не получилось прочитать содержимое файла ${requestFullFileName}. ${fileError.message}`);
                        response.statusCode = 500;
                        response.end();
                    }
                    else if(fileData) {
                        response.writeHead(200, { "Content-Type": MIMEType }).end(fileData);
                    }
                });
            }
            else {
                response.statusCode = 404;
                response.end();
            }
        }
        else {
            response.statusCode = 404;
            response.end();
        }
    }
});

server.listen(3000, "127.0.0.1", () => {
    console.log("Server started at http://localhost:3000/");
})