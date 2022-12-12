const Generator = require('./generator')
const initial = async (kind, role, startIndex, endIndex) => {
  let _startIndex = startIndex;
  while (_startIndex < endIndex) {
    try {
      console.log('Generating ' + kind + ' NFT ' + _startIndex);
      await Generator.build(kind, role, _startIndex, () => {
        _startIndex++;
      })
    } catch (e) {
      console.error('Error while generating NFT ' + _startIndex)
      console.log(e);
      _startIndex = endIndex + 1;
    }
  }
}
(async () => {
  await initial("UR", 0, 0,   486);
  // await initial("SSR", 0, 0, 100);
  // await initial("SR", 0, 84, 270);
})();
