const currentResentVersion = 510;

window.ResentLoadScreen = {
  createLoadScreen: () => {},
  changeToDecompressingAssets: () => {},
  setMaxDecompressSteps: (a) => {},
  setDecompressStep: (a) => {},
  decompressProgressUpdate: (a) => {},
  showInteractScreen: () => {},
  showInteractScreenWithCallback: (a) => {},
  showFinalScreen: () => {},
  destroyLoadScreen: () => {},
  hasInteracted: () => { return false; },
  hasDestroyed: () => { return true; }
}

window.open = new Proxy(window.open, {
  apply (a, b, c) {
    let url = c[0].trim();
    if (url === 'https://lax1dude.net/eaglerxserver') {
      url = 'https://github.com/lax1dude/eaglerxserver/releases/latest/download/EaglerXServer.jar';
    }
    if (url !== c[0]) {
      c[0] = url;
    }
    return Reflect.apply(a, b, c);
  }
});

function start () {
  window.eaglercraftXOpts = {
    allowUpdateSvc: false,
    allowUpdateDL: false,
    allowFNAWSkins: false,
    allowBootMenu: false,
    allowServerRedirects: false,
    checkRelaysForUpdates: false,
    enableMinceraft: false,
    container: 'game_frame',
    servers: [
      {
        addr: 'wss://play.webmc.fun',
        name: '§b§lWebMC§r',
        hideAddr: true
      }
    ],
    assetsURI: [ { url: 'game/assets.epw' } ]
  };

  (async () => {
    const ver = await gzip(JSON.stringify({
      'lastUpdated': 'testing123',
      'integer': currentResentVersion
    }));
    localStorage.setItem('_eaglercraftX.ResentLatestBuild', ver);
  })();
  writeServers();
  main();
}

async function gzip (txt) {
  let ret = "";
  const stream = new CompressionStream('gzip');
  const writer = stream.writable.getWriter();
  writer.write(new TextEncoder().encode(txt));
  writer.close();
  const verBuf = await new Response(stream.readable).arrayBuffer();
  const bytes = new Uint8Array(verBuf);
  for (let i = 0; i < bytes.length; i++) {
    ret += String.fromCharCode(bytes[i]);
  }
  return btoa(ret);
}