chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function(tab) {
    //get current URL as string
    var currentUrl = tab[0].url;
    console.log("Current URL: " + currentUrl);
    //find last slash
    var pos = currentUrl.lastIndexOf("/");
    console.log("Last index of / is: " + pos);
    //make new URL string that removes last slash to go up one directory
    if(pos === currentUrl.length-1){
      console.log("Last index of / was last char of URL...going up one more step");
      pos = currentUrl.substring(0, pos).lastIndexOf("/");
      console.log("New last index of / is: " + pos);
    }
    var newUrl = currentUrl.substring(0, pos);
    console.log("New URL: " + newUrl);

    chrome.tabs.create({
      console.log("Going to new URL...")
      "url": newUrl
    });
  });
});
