import {
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, {useEffect,useState,useRef} from "react";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { RESEARCHFUNDING_CONTRACT_ADDRESS, abi } from "../constants";
import Navbar from "../components/Navbar";

const register = () => {
  const [address,setAddress]=useState('');
  const [organization,setOrganization]=useState('');
  const [country,setCountry]=useState('');
  const [fundingPurpose,setFundingPurpose]=useState('');
  const [amountRequested,setAmountRequested]=useState('');
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();
  useEffect(()=>{
    
    if(typeof window.ethereum !== 'undefined'){
      checkWallet();
     /* web3ModalRef.current = new Web3Modal({
        network:'rinkeby',
        providerOptions:{},
        disableInjectedProvider:false,
      })*/
    }else{
      console.log('MetaMask is not installed!');
      alert('Please install MetaMask!');
    }
  },[])
  const checkWallet = async ()=>{
    try{
      await getProviderOrSigner();
    }catch(err){
      console.error(err);
    }
  }
  const getProviderOrSigner = async (needSigner =false)=>{
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const {chainId} = await web3Provider.getNetwork();
    if(chainId !== 4){
      window.alert("Please change the network to Rinkeby");
      throw new Error("Please change the network to Rinkeby");
    }
    if(needSigner){
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  }
  /**register startup organization */
   const addOrganization = async (e)=>{
     try{
       e.preventDefault();
       const signer = await getProviderOrSigner(true);
       const researchFundingContract = new Contract(
         RESEARCHFUNDING_CONTRACT_ADDRESS, abi,signer
       );
       const tx = await researchFundingContract.addOrg(address,organization,country,fundingPurpose,amountRequested);
       setLoading(true);
       await tx.wait();
       setLoading(false);

     }
     catch(err){
        console.error(err);
     }
   }
  return (
    <div>
      <Navbar/>
      <Typography variant="h4" align="center" gutterBottom>
        Register your research Organization
      </Typography>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "650px",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          //border:'1px solid #00A86B'
        }}
        onSubmit={addOrganization}
      >
        <TextField
          id="outlined-address"
          label="Address"
          fullWidth
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          sx={{ margin: 1 }}
        />
        <TextField
          id="outlined-organization"
          label="Organization"
          fullWidth
          value={organization}
          onChange={(e)=>setOrganization(e.target.value)}
          sx={{ margin: 2 }}
        />
        <TextField
          id="outlined-country"
          label="Country"
          fullWidth
          value={country}
          onChange={(e)=>setCountry(e.target.value)}
          sx={{ margin: 2 }}
        />
        <TextField
          id="outlined-fund"
          label="FundingPurpose"
          value={fundingPurpose}
          onChange={(e)=>setFundingPurpose(e.target.value)}
          fullWidth
          sx={{ margin: 2 }}
        />
        <TextField
          id="outlined-amount"
          label="AmountRequested"
          value={amountRequested}
          onChange={(e)=>setAmountRequested(e.target.value)}
          fullWidth
          sx={{ margin: 2 }}
        />
        <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Button variant="contained" type='submit'sx={{ backgroundColor: "#00A86B" }}>
          Submit
        </Button>
      </Box>
      </form>
      
    </div>
  );
};

export default register;
