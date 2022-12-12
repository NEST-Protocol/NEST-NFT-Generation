const Jimp = require('jimp');
const Traits = require('./traits');
const fs = require('fs');
const {Web3Storage, getFilesFromPath} = require('web3.storage');

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const build = async (kind, role, index, onComplete) => {
  const client = new Web3Storage({token: process.env.WEB3STORAGE_TOKEN});
  
  const _path = '.';
  const _traits = [];
  let rarity = 1;
  
  const background = Traits.getBackground(kind, index);
  const _composedImage = await Jimp.read(_path + '/Traits/Background/' + background + '.png');
  
  switch (kind) {
    case 'SR':
      rarity = 10;
      break;
    case 'SSR':
      rarity = 5;
      break;
    case 'UR':
      rarity = 1;
  }
  
  const body = Traits.getBody(index);
  const bodyJimp = await Jimp.read(_path + '/Traits/Body/' + body + '.png');
  _traits.push({
    'trait_type': 'Body',
    'value': body
  });
  
  _composedImage.blit(bodyJimp, 0, 0);
  
  let head;
  if (body === 'Black Panther' || body === 'Geometry' || body === 'Shark' || body === 'Space') {
    head = 'Empty'
    _traits.push({
      'trait_type': 'Head',
      'value': body
    });
  } else {
    head = Traits.getHead(index);
    _traits.push({
      'trait_type': 'Head',
      'value': head
    });
  }
  
  const headJimp = await Jimp.read(_path + '/Traits/Head/' + head + '.png');
  _composedImage.blit(headJimp, 0, 0);
  
  const headwear = Traits.getHeadwear(index);
  const headwearJimp = await Jimp.read(_path + '/Traits/Headwear/' + headwear + '.png');
  _traits.push({
    'trait_type': 'Headwear',
    'value': headwear
  });
  
  _composedImage.blit(headwearJimp, 0, 0);
  
  await _composedImage.resize(1000, 1000).write('Output/images/' + rarity + '/' + index + '.png');
  await _composedImage.resize(350, 350).write('Output/thumbnail/' + rarity + '/' + index + '.png');
  
  await sleep(1000);
  
  const image = await getFilesFromPath('Output/images/' + rarity + '/'  + index + '.png');
  const thumbnail = await getFilesFromPath('Output/thumbnail/' + rarity + '/' + index + '.png');
  
  const imageCid = await client.put(image, {wrapWithDirectory: false});
  const thumbnailCid = await client.put(thumbnail, {wrapWithDirectory: false});
  
  const names = ["Cyber Ink human", "", ""]
  const descriptions = ["Some people choose to merge with the AI once the AI surpassed humanity. Their consciousness separated from their bodies and evolved into a new form, parasitic on the AI's algorithm, functioning as a kind of meta-control over the AI's program.",
  "",
  ""]
  
  // create a metadata file
  const metadata = {
    name: names[role],
    description: descriptions[role],
    image: "ipfs://" + imageCid,
    thumbnail: "ipfs://" + thumbnailCid,
    attributes: _traits,
  }
  // save metadata file
  fs.writeFileSync('Output/metadata/' + rarity + '/' + imageCid + '_' +  index + '.json', JSON.stringify(metadata));
  
  onComplete();
}

module.exports = {
  build
}