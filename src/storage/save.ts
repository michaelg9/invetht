import { STORAGE_API_TOKEN } from 'variables/general';
// @ts-ignore
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
// import { Web3Storage, Web3File } from 'web3.storage';

const client = new Web3Storage({ token: STORAGE_API_TOKEN })

export async function storeFilesToIPFS(filename:string, content:string) {
  try {
    const file = new File([content], filename, { type: 'text/plain' })
    const cid = await client.put([file]);
    console.log(cid);
    return cid;
  } catch {
    
  }
  return null;
}

export async function retrieveFilesFromIPFS (cid: string) {
  const res = await client.get(cid)
  if (!res || !res.ok || !res.body) return [];
  for (const f of res.files()) {
    console.log(f);
  }
  let files = [];
  try {
    files = await res.files();
    console.log(files);
    for (const file of files) {
      console.log(`${file.cid}: ${file.name} ${file.text()} (${file.size} bytes)`)
    }
  } catch {
    console.log('error while fetching from IPFS');
  }
  return files;
}
