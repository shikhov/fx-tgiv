function saveOptions(e) {
  browser.storage.sync.set({
    backend_url: document.querySelector("#backend_url").value,
    chat: document.querySelector("#chat").value,
    delmsg: document.querySelector("#delmsg").checked
  });
  e.preventDefault();
  browser.runtime.reload();
}

function restoreOptions() {
  var gettingItem = browser.storage.sync.get(['backend_url', 'chat', 'delmsg']);
  gettingItem.then((res) => {
    document.querySelector("#backend_url").value = res.backend_url || '';
    document.querySelector("#chat").value = res.chat || 'chotamreaderbot';
    document.querySelector("#delmsg").checked = res.delmsg || false;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
