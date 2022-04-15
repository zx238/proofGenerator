
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const fs = require('fs');

const {parse} = require('fast-csv');

whitelist = fs.readFileSync("WL/whitelist.csv").toString().split('\n').map(res => res.replace(/\n|\r/g, ""));
// whitelist = data.split("\n");
console.log("Length of whitelist is " + whitelist.length);

let start = 1928;
// let end = 1929;
let end = 2008;

address = whitelist[387];
console.log(address);
proof = computeProof(whitelist, address);
console.log(proof);

// let i = start;
// let proof, proofString;
// while (i<end){
//   address = whitelist[i];
//   console.log(address);
//   proof = computeProof(whitelist, address);
//   console.log(proof);
//   // console.log(proof.toString());
//   proofString = proof.toString().split(',');
//   fs.appendFileSync('proof.csv', "[", { flag: 'a+' }, err => {});
//   for (let j = 0; j < proofString.length; j++){
//     fs.appendFileSync('proof.csv', '"', { flag: 'a+' }, err => {});
//     fs.appendFileSync('proof.csv', proofString[j], { flag: 'a+' }, err => {});
//     fs.appendFileSync('proof.csv', '"', { flag: 'a+' }, err => {});
//     if (j < (proofString.length-1))
//       fs.appendFileSync('proof.csv', ",", { flag: 'a+' }, err => {});
//   }
  
//   fs.appendFileSync('proof.csv', "]\n", {flag: 'a+'}, err=> {});
//   i++;
// }



function computeProof(whitelist, address){
  const leafNodes = whitelist.map(addr => keccak256(addr));
  const tree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const root = tree.getHexRoot();
  console.log("root is: "+ root)
  const proof = tree.getHexProof(keccak256(address))
  console.log(tree.verify(proof, keccak256(address), root));
  return proof
}