
function splitCookies(cookiesHeader) {
    return cookiesHeader.split(';');
}

function parseCookies(cookiesHeader) {
    if (!cookiesHeader)
        return {};

    let rawCookies = splitCookies(cookiesHeader);
    let parsedCookies = {};

    for (let rawCookie of rawCookies) {
        let cookieData = rawCookie.split('=');

        let cookieName = cookieData[0].trim();
        let cookieValue = cookieData[1].trim();

        parsedCookies[cookieName] = cookieValue;
    }

    return parsedCookies;
}

function getCookies(req) {
    return parseCookies(req.headers.cookie);
}

module.exports = { parseCookies, getCookies };