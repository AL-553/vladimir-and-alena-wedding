const http = require("node:http");
const fs = require("node:fs");
const https = require("node:https");

const permittedFilesPathsArray = [
    "/src/assets/fonts/CormorantGaramond",
    "/src/assets/fonts/OpenSans",
    "/src/assets/fonts/QwitcherGryphen",
    "/src/assets/icons",
    "/src/assets/images",
    "/build/scripts",
    "/scripts",
    "/build/styles",
    "/styles"
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
    "firecracker_icon.svg",
    "green_empty_circle.svg",
    "green_empty_circle_increased.svg",
    "two_wedding_rings_favicon.ico",
    "background_dented_paper.jpg",
    "vladimir_alena_sitting_basket_greenery_cat.jpg",
    "vladimir_holds_alena_laughing_river.jpg",
    "dress_code_colors_green_apples.jpg",
    "vladimir_alena_laughing.jpg",
    "vladimir_alena_walking_garden_basket_greenery.jpg",
    "vladimir_alena_hugging.jpg",
    "vladimir_alena_laughing_shadow.jpg",
    "vladimir_alena_sitting_reading.jpg",
    "mainscript.js",
    "mainstyle.css"
];

let host;
let port;

if(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production" && process.env.SERVER_HOST === "127.0.0.1" && process.env.SERVER_PORT === "3000") {
    host = "127.0.0.1";
    port = 3000;
}
else {
    host = "0.0.0.0";
    port = 10000;
}

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

const server = http.createServer({ maxHeaderSize: 512000, requestTimeout: 30000 }, (serverRequest, serverResponse) => {
    console.log(serverRequest.headers.referer);
    if(serverRequest.url === "/" || serverRequest.url === "http://localhost:3000/" || serverRequest.url === "http://127.0.0.1:3000/" || serverRequest.url === "/index.html") {
        fs.readFile(`${__dirname}/index.html`, (indexError, indexData) => {
            if(indexError) {
                if(indexError.code === "ENOENT") {
                    console.log(`Ошибка. Запрашиваемой директории не существует или файл не найден. ${indexError}`);
                    serverResponse.statusCode = 404;
                    serverResponse.end();
                }
                else {
                    console.log(`Ошибка. Не получилось прочитать содержимое файла index.html. ${indexError}`);
                    serverResponse.statusCode = 500;
                    serverResponse.end();
                }
            }
            else if(indexData) {
                serverResponse.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }).end(indexData);
            }
        });
    }
    else if(
        serverRequest.url === "http://localhost:3000/send-survey-data" ||
        serverRequest.url === "http://127.0.0.1:3000/send-survey-data" ||
        serverRequest.url === "/send-survey-data"
    ) {
        let clientRequestData = "";

        serverRequest.on("data", (clientDataChunk) => {
            clientRequestData += clientDataChunk.toString();
        });
        serverRequest.on("end", () => {
            const clientRequestBody = JSON.parse(clientRequestData);
            const toTelegramRequest = https.request(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            }, (telegramResponse) => {
                let telegramResponseData = "";

                telegramResponse.on("data", (dataChunk) => {
                    telegramResponseData += dataChunk.toString();
                });
                telegramResponse.on("end", () => {
                    const telegramResponseBody = JSON.parse(telegramResponseData);

                    if(!telegramResponseBody.ok) {
                        serverResponse.statusCode = 502;
                        serverResponse.end();
                    }
                    else {
                        serverResponse.statusCode = 200;
                        serverResponse.end();
                    }
                });
            });

            toTelegramRequest.on("error", (error) => {
                console.log(error);
                serverResponse.statusCode = 502;
                serverResponse.end();
            });
            toTelegramRequest.write(JSON.stringify({
                chat_id: process.env.TELEGRAM_USER_ID,
                text: `
Приглашённый <b>${clientRequestBody.nameSurname}</b> подтвердил присутствие
Предпочтения по алкоголю: <b>${clientRequestBody.surveyAnswers.join(", ")}</b>
                `,
                parse_mode: "HTML"
            }));
            toTelegramRequest.end();
        });
    }
    else {
        if(
            serverRequest.headers.referer === "http://localhost:3000/" ||
            serverRequest.headers.referer === "http://127.0.0.1:3000/" ||
            serverRequest.headers.referer === "http://127.0.0.1:3000/build/scripts/mainscript.js" ||
            serverRequest.headers.referer === "http://localhost:3000/build/scripts/mainscript.js" ||
            serverRequest.headers.referer === "http://127.0.0.1:3000/scripts/mainscript.js" ||
            serverRequest.headers.referer === "http://localhost:3000/scripts/mainscript.js" ||
            serverRequest.headers.referer === "http://127.0.0.1:3000/build/styles/mainstyle.css" ||
            serverRequest.headers.referer === "http://localhost:3000/build/styles/mainstyle.css" ||
            serverRequest.headers.referer === "http://127.0.0.1:3000/styles/mainstyle.css" ||
            serverRequest.headers.referer === "http://localhost:3000/styles/mainstyle.css" ||
            serverRequest.headers.referer === "https://vladimir-and-alena-wedding.onrender.com/"
        ) {
            let requestPath = serverRequest.url.slice(0, serverRequest.url.lastIndexOf("/"));
            let requestFullFileName = serverRequest.url.slice(serverRequest.url.lastIndexOf("/") + 1);
            let requestFileExtension = serverRequest.url.slice(serverRequest.url.lastIndexOf(".") + 1);

            if(permittedFilesPathsArray.includes(requestPath)) {
                if(permittedFilesNamesArray.includes(requestFullFileName)) {
                    let MIMEType = MIMERecognizer(requestFileExtension);

                    fs.readFile(__dirname + serverRequest.url, (fileError, fileData) => {
                        if(fileError) {
                            if(fileError.code === "ENOENT") {
                                console.log(`Ошибка. Запрашиваемой директории не существует или файл не найден. ${fileError}`);
                                serverResponse.statusCode = 404;
                                serverResponse.end();
                            }
                            else {
                                console.log(`Ошибка. Не получилось прочитать содержимое файла ${requestFullFileName}. ${fileError}`);
                                serverResponse.statusCode = 500;
                                serverResponse.end();
                            }
                        }
                        else if(fileData) {
                            serverResponse.writeHead(200, { "Content-Type": MIMEType }).end(fileData);
                        }
                    });
                }
                else {
                    console.log(`Ошибка. Файл "${requestFullFileName}" не найден`);
                    serverResponse.statusCode = 404;
                    serverResponse.end();
                }
            }
            else {
                console.log(`Ошибка. Директории "${requestPath}" не существует`);
                serverResponse.statusCode = 404;
                serverResponse.end();
            }
        }
        else {
            console.log("Ошибка. Неверный запрос");
            serverResponse.writeHead(400, { "Cache-Control": "no-store" }).end();
        }
    }
});

server.listen(port, host, () => {
    const outputtedMessage = process.env.NODE_ENV === "development" ? "Server started at http://localhost:3000/" : "Server successfully started";
    console.log(outputtedMessage);
})