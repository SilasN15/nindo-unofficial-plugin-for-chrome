'use strict';

const tryOpenNindoPage = async (tab) => {
    const tabUrl = tab.url;
    const title = tab.title;
    if (!tabUrl?.startsWith('https://') && !tabUrl?.startsWith('http://')) {
        throw Error('Invalid Protocol for url: ' + tabUrl);
    }
    let urlWithoutProtocol = tabUrl.replace('https://', '');
    urlWithoutProtocol = urlWithoutProtocol.replace('http://', '');
    urlWithoutProtocol = urlWithoutProtocol.replace('www.', '');
    if (urlWithoutProtocol.startsWith('twitter')) {
        console.log('twitter detected');
        const artistName = getArtistTwitter(urlWithoutProtocol);
        const res = await fetchNindoSmart(artistName);
        const json = await res.json();
        console.log(json);
        const id = json[0].id;
        chrome.tabs.create({
            url: 'https://nindo.de/artist/' + id,
        });
    } else if (urlWithoutProtocol.startsWith('instagram')) {
        console.log('twitter instagram');
        const artistName = getArtistInstagram(urlWithoutProtocol);
        const res = await fetchNindoSmart(artistName);
        const json = await res.json();
        const id = json[0].id;
        chrome.tabs.create({
            url: 'https://nindo.de/artist/' + id,
        });
    } else if (urlWithoutProtocol.startsWith('twitch')) {
        console.log('twitch detected');
        const artistName = getArtistTwitch(urlWithoutProtocol);
        const res = await fetchNindoSmart(artistName);
        const json = await res.json();
        const id = json[0].id;
        chrome.tabs.create({
            url: 'https://nindo.de/artist/' + id,
        });
    } else if (urlWithoutProtocol.startsWith('tiktok')) {
        console.log('tiktok detected');
        const artistName = getArtistTikTok(title);
        const res = await fetchNindoSmart(artistName);
        const json = await res.json();
        const id = json[0].id;
        chrome.tabs.create({
            url: 'https://nindo.de/artist/' + id,
        });
    }
};

const fetchNindoSmart = async (name) => {
    console.log('artist name: ' + name);
    return await fetch('https://api.nindo.de/search/smart/' + name);
};

const getArtistTwitter = (url) => {
    url = url.replace('/', '');
    url = url.replace('twitter.com', '');
    return url;
};

const getArtistInstagram = (url) => {
    url = url.replace('/', '');
    url = url.replace('/', '');
    url = url.replace('instagram.com', '');
    return url;
};

const getArtistTwitch = (url) => {
    url = url.replace('/', '');
    url = url.replace('/', '');
    url = url.replace('twitch.tv', '');
    return url;
};

const getArtistTikTok = (title) => {
    const to = title.indexOf(' (@');
    title = title.substr(0, to);
    console.log(title);
    return title;
};

try {
  chrome.action.onClicked.addListener(tryOpenNindoPage);
} catch (error) {
  console.error(error);
}
