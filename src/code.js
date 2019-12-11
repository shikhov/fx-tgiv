getting = browser.storage.sync.get(['backend_url', 'chat', 'delmsg']);
getting.then(onGot, onError);

function onError(error) {
    console.log(`Error: ${error}`);
}

function onGot(item) {
    chat = item.chat;
    backend_url = item.backend_url;
    delmsg = item.delmsg ? 1 : 0;
}

browser.contextMenus.create({
    id: "tgiv",
    title: 'Instant View',
    contexts: ["selection", "link", "page"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.linkUrl) {
        text = info.linkUrl;
    }
    else if (info.selectionText) {
        text = info.selectionText;
    }
    else if (info.pageUrl) {
        text = info.pageUrl;
    }

    sendToTg(text)
})

async function sendToTg(text) {
    if (backend_url == '') {
        msg = '⚠️ Backend URL is empty!';
    } else {
        body = 'delete=' + delmsg + '&chat=' + encodeURIComponent(chat) + '&text=' + encodeURIComponent(text);
        xhr = new XMLHttpRequest();
        xhr.open("POST", backend_url, false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(body);

        if (xhr.status != 200) {
            msg = '⚠️ ' + xhr.status + ': ' + xhr.statusText;
        } else {
            msg = '✔️ Saved';
        }
    }

    browser.notifications.create('ivPopup', {
        "type": "basic",
        "iconUrl": browser.extension.getURL("48.png"),
        "title": 'Instant View',
        "message": msg
    });
    await sleep(2000);
    browser.notifications.clear('ivPopup')
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
