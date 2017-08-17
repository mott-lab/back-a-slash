function getUrl(tab){
  //get current URL as string
  var currentUrl = tab[0].url;
  console.log("Current URL: " + currentUrl);

  //find last slash
  var pos = currentUrl.lastIndexOf("/");
  console.log("Last index of / is: " + pos);

  //check index to make sure it is the right /
  if(pos === currentUrl.length-1){
    console.log("Last index of / was last char of URL...going up one more step");
    pos = currentUrl.substring(0, pos).lastIndexOf("/");
    console.log("New last index of / is: " + pos);
  }

  //make new URL string that removes last slash to go up one directory
  var newUrl = currentUrl.substring(0, pos);
  console.log("New URL: " + newUrl);
  return newUrl;
}

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function(tab) {

    var newUrl = getUrl(tab);

    console.log("Going to new URL...");
    chrome.tabs.update({
      "url": newUrl
    });
  });
});

chrome.commands.onCommand.addListener(function(command){
  if(command == "back-a-slash-new-tab"){
    console.log("new-tab keyboard shortcut activited.");
    chrome.tabs.query({
      currentWindow: true,
      active: true
    }, function(tab) {

      var newUrl = getUrl(tab);

      console.log("Opening new tab to new URL...");
      chrome.tabs.create({
        "url": newUrl
      });
    });
  }
})

//handle Ctrl key pressed
// var ctrlPressed = false;
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
//   //switch statement to efficiently handle future key press functions
//   switch(request.type){
//     case "ctrlPressed":
//       ctrlPressed = true;
//       break;
//     case "keyup":
//       ctrlPressed = false;
//       break;
//   }
// });
