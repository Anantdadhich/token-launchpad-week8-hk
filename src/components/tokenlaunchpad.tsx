import {Buffer} from  "buffer"
window.Buffer=Buffer;

import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint,  MINT_SIZE, TOKEN_PROGRAM_ID,  } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair,  SystemProgram, Transaction } from "@solana/web3.js"



export const Tokenlaunchpad = () => {
   
   const wallet=useWallet();
   const {connection}=useConnection();
    
 
  async function createtoken() {

    try {
          if(!wallet.publicKey){
        return 0;
        }

    const mintkeypair=Keypair.generate();
    const lamports=await getMinimumBalanceForRentExemptMint(connection);

    const transaction=new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey:wallet.publicKey,
        newAccountPubkey:mintkeypair.publicKey,
        space:MINT_SIZE,
        lamports,
        programId:TOKEN_PROGRAM_ID
      }),
      createInitializeMint2Instruction(mintkeypair.publicKey,9,wallet.publicKey,wallet.publicKey,TOKEN_PROGRAM_ID)
    );
    ///fee for the transaction
    transaction.feePayer=wallet.publicKey;
    transaction.recentBlockhash=(await connection.getLatestBlockhash()).blockhash;
    transaction.partialSign(mintkeypair);

    await wallet.sendTransaction(transaction,connection);
      
    console.log(`token mint created${mintkeypair.publicKey.toBase58()}`);
    } catch (error) {
      console.log(error)
    }

  }

    return (
    <div className="w-full max-w-md mx-auto bg-gray-800 shadow-lg rounded-lg p-6 hover:out-of-range:bg-gray-400">
      <h1 className="text-2xl font-semibold mb-4 text-center text-white">Token Launchpad</h1>
      <div className="space-y-4">
        <input
          id="name"
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
        />
        <input
          id="symbol"
          type="text"
          placeholder="Symbol"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          id="image"
          type="text"
          placeholder="Image URL"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          id="initialSupply"
          type="text"
          placeholder="Initial Supply"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={createtoken}
      >
        Create a Token
      </button>
    </div>
  );
}
