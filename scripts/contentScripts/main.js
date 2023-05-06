const mainDocIFrame = document.getElementsByClassName('docs-texteventtarget-iframe')[0];

if (mainDocIFrame) {
    mainDocIFrame.contentDocument.addEventListener("keydown", hook, false);
}

let wordsTyped = ''; // track what words were typed

function hook(e) {
    let keyTyped = e.key;

    // record keys typed only if matches the required keyword
    if (['*', 'b', 'u', 't', 'l', 'e', 'r'].includes(keyTyped)) {
        wordsTyped += e.key;
    }

    // if wordsTypes == butler, get the span element and sent to
    // background worker
    if (wordsTyped == '*butler') {
        let butlerRequest = findAndExtractRequest();
        chrome.runtime.sendMessage(null, butlerRequest, (response) => {
            console.log("Sent key value" + response)
        })
        wordsTyped = '';
    }
    console.log("keycode:" + e.key);
}

function findAndExtractRequest() {
    let allSpans = document.querySelectorAll('span');

    for (let i = 0; i < allSpans.length; i++) {
        // Check if the span contains the desired text
        if (allSpans[i].textContent.includes('@butler')) {
            // Do something with the matching span element
            console.log('Found span with "@butler":', allSpans[i]);
            return allSpans[i].textContent
        }
    }
}