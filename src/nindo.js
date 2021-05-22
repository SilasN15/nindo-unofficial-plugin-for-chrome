const tryOpenNindoPage = async (tab) => {
  const tabUrl = tab.url;
  if (!tabUrl?.startsWith('https://') && !tabUrl?.startsWith('http://')) {
    throw Error('Invalid Protocol for url: ' + tabUrl);
  }
  let urlWithoutProtocol = tabUrl.replace('https://', '');
  urlWithoutProtocol = urlWithoutProtocol.replace('http://', '');
  urlWithoutProtocol = urlWithoutProtocol.replace('www.', '');
  if (urlWithoutProtocol.startsWith('twitter')) {
    const artistName = getArtistTwitter(urlWithoutProtocol);
    const res = await fetchNindoSmart(artistName);
    const json = await res.json();
    const id = json[0].id;
    chrome.tabs.create({
      url: 'https://nindo.de/artist/' + id,
    });
  }
};

const fetchNindoSmart = async (name) => {
  return await fetch('https://api.nindo.de/search/smart/rezomusik');
};

const getArtistTwitter = (url) => {
  url.replace('/', '');
  const to = url.indexOf('/');
  return url.substr(0, to);
};

// TODO: add more plattforms

export default tryOpenNindoPage;
