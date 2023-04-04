import './App.css';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import FileUpload from './components/FileUpload';
import Display from './components/Display';
import Modal from './components/Modal';

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async() =>{
      if(provider){

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        await provider.send("eth_requestAccounts",[]); // Meatmask will open as soon as dapp is started.
        const signer = provider.getSigner(); //signer is needed if you want to write data on blockchain
        const address = await signer.getAddress();
        setAccount(address);
        
        //To create a instance of smart contract we need 3 things 1.abi 2.contract address 3. signers/provider
        let contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

        const contract = new ethers.Contract(
          contractAddress,Upload.abi,signer
        )
        // console.log(contract);
        setContract(contract);
        setProvider(provider);
      }else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  },[])
  return (
    <>
    {!modalOpen && (
    <button className='share' onClick={() => setModalOpen(true)}>Share</button>
    )}
    {modalOpen && (
    <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
    )}
    <div className="App">
      <h1 style={{color:"white"}}>Gdrive 3.0</h1>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>

      <p style={{color:"white"}}>Account : {account ? account : "Not connected"}</p>

      <FileUpload account = {account} provider={provider} contract={contract}></FileUpload>
      <Display account = {account} contract={contract}></Display>
    </div>
    </>
  );
}

export default App;
