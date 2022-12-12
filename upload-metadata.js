const {Web3Storage, getFilesFromPath} = require('web3.storage');

function makeStorageClient() {
  return new Web3Storage({
    token: process.env.WEB3STORAGE_TOKEN
  })
}

async function storeWithProgress(files) {
  const onRootCidReady = cid => {
    console.log('uploading files with cid:', cid)
  }
  
  const totalSize = files.map(f => f.size).reduce((a, b) => a + b, 0)
  let uploaded = 0
  
  const onStoredChunk = size => {
    uploaded += size
    const pct = 100 * (uploaded / totalSize)
    console.log(`Uploading... ${pct.toFixed(2)}% complete`)
  }
  
  const client = makeStorageClient()
  
  return client.put(files, {onRootCidReady, onStoredChunk, wrapWithDirectory: false})
}

async function main() {
  const metadata = await getFilesFromPath('./Output/metadata')
  await storeWithProgress(metadata)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})