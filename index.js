import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [ownerName,setOwnerName] = useState("Sehajpreet Kaur");
  const [ownerCity, setOwnerCity] = useState("Chandigarh");
  const [ownerStatus, setOwnerStatus] = useState("Eligible Owner");
  const [add,setAdd]=useState(9);
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
      window.ethereum.on("accountsChanged", (accounts) => {
        handleAccount(accounts);
      });
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }

  const checkOwnerName = async () => {
    if (atm) {
      let ownerName = await atm.checkOwnerName();
      setOwnerName("Sehajpreet Kaur");
    }
  }

  const checkOwnerCity = async () => {
    if (atm) {
      let ownerCity = await atm.checkOwnerCity();
      setOwnerCity("Chandigarh");
    }
  }


  const checkOwnerStatus = async () => {
    if (atm) {
      let ownerStatus = await atm.checkOwnerStatus();
      setOwnerStatus("Eligible Owner");
    }
  }
  const addition = async () => {
    if (atm) {
      const a = parseInt(inputA);
      const b = parseInt(inputB);
      const result = await atm.addition(a,b);
      setAdd(result);
    }
}  
const handleInputAChange = (event) => {
  setInputA(event.target.value);
};

const handleInputBChange = (event) => {
  setInputB(event.target.value);
};


  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <>
      <div>
        <p style={{ fontFamily: "Sans-serif" }}>Your Account: {account}</p>
          <p style={{ fontFamily: "Sans-serif" }}>Your Balance: {balance}</p>
          <p style={{ fontFamily: "Sans-serif" }}>Owner Name: {ownerName}</p>
          <p style={{ fontFamily: "Sans-serif" }}>Owner City: {ownerCity}</p>
          <p style={{ fontFamily: "Sans-serif" }}>Owner Status: {ownerStatus}</p>

          <button style={{ backgroundColor: "pink" }} onClick={deposit}>
            Deposit 1 ETH
          </button>
          <button style={{ backgroundColor: "lavender" }} onClick={withdraw}>
            Withdraw 1 ETH
          </button>
      </div>
      
      <div>
          <h2>Calculator for Mathematics</h2>
          <p style={{ fontFamily: "Sans-serif" }}>Add: {add ? add.toString() : ""}</p>

          <input
            type="number"
            placeholder="Enter the value of first variable A: "
            value={inputA}
            onChange={handleInputAChange} 
            />
          <input
            type="number"
            placeholder="Enter the value of the second variable B: "
            value={inputB}
            onChange={handleInputBChange} 
            />

          <button style={{ backgroundColor: "yellow" }} onClick={addition}>
            Add
          </button>
        </div>
        </>
     );
  }

  useEffect(() => {getWallet();checkOwnerName();checkOwnerCity();checkOwnerStatus();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM Transaction and Management System!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  );
}
