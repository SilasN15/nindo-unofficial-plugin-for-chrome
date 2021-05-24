'use strict';

const typeToSiteTable = {
  "instagram": "instagram.com",
  "twitter": "twitter.com",
  "twitch": "twitch.tv",
  "tiktok": "tiktok.com"
}

const tryOpenNindoPage = async (tab) => {
    const whitelistedSites = ['instagram', 'twitter', 'twitch', 'tiktok'];
    const tabUrl = tab.url;
    const title = tab.title;

    if (!tabUrl?.startsWith('https://') && !tabUrl?.startsWith('http://')) {
        throw Error('Invalid Protocol for url: ' + tabUrl);
    }

    let urlWithoutProtocol = tabUrl.replace('https://', '');
    urlWithoutProtocol = urlWithoutProtocol.replace('http://', '');
    urlWithoutProtocol = urlWithoutProtocol.replace('www.', '');

    for (let whiteListedSite of whitelistedSites) {
      if (urlWithoutProtocol.startsWith(whiteListedSite)) {
        console.log(urlWithoutProtocol + " detected!");

        var artistName = getArtistName(urlWithoutProtocol, whiteListedSite);
        var res = await fetchNindoSmart(artistName);
        var json = await res.json();
        var id = json[0].id;

        chrome.tabs.create({
          url: 'https://nindo.de/artist' + id
        });

        break;
      }
    }
};

const fetchNindoSmart = async (name) => {
    console.log('artist name: ' + name);
    return await fetch('https://api.nindo.de/search/smart/' + name);
};

const getArtistName(url, type) {
  if (type != "tiktok") {
    url = url.replaceAll('/', '');
    url = url.replace(typeToSiteTable[type], '');
    return url;
  } else {
    url = url.replace('/', '');
    url = url.replace(typeToSiteTable[type], '');
    url = url.substr(1, url.length-2);
    return url;
  }
}

try {
  chrome.action.onClicked.addListener(tryOpenNindoPage);
} catch (error) {
  console.error(error);
}
