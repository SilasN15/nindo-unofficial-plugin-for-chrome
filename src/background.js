import tryOpenNindoPage from './nindo';

try {
  chrome.action.onClicked.addListener(tryOpenNindoPage);
} catch (error) {
  console.error(error);
}
