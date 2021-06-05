chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "notesContext",
    title: "Add To Notes",
    contexts: ["selection"],
  });

  chrome.tabs.create({
    url: "authenticate.html",
  });
});

chrome.contextMenus.onClicked.addListener(function (clickData, tab) {
  if (clickData.menuItemId === "notesContext") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { text: clickData.selectionText });
    });
  }
});
