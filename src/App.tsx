import './App.css';
import { Tokenlaunchpad } from './components/tokenlaunchpad';
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import '@solana/wallet-adapter-react-ui/styles.css';
// connection to solana wallet 
function App() {
  return (
    <div className='min-h-screen flex flex-col bg-gray-600'>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]}>
          <WalletModalProvider>
            <div className='flex justify-between items-center p-6 bg-gray-700'>
              <div className='flex space-x-4'>
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
            </div>

            <main className='flex-grow flex items-center justify-center'>
              <Tokenlaunchpad />
            </main>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
