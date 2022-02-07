import {
  AppBar,
  Button,
  Container,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, {useEffect,useState} from "react";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { RESEARCHFUNDING_CONTRACT_ADDRESS, abi } from "../constants";

const register = () => {
  const [address,setAddress]=useState('');
  const [organization,setOrganization]=useState('');
  const [country,setCountry]=useState('');
  const [fundingPupose,setFundingPurpose]=useState('');
  const [amountRequested,setAmountRequested]=useState('');
  const [amountRaised,setAmountRaised]=useState('');
  useEffect(()=>{
    if (typeof window.ethereum == 'undefined') {
      console.log('MetaMask is not installed!');
      alert('Please install MetaMask!');
    }
    function register(){
      try{

      }catch{

      }
    }
    
  },[])
  const router = useRouter();
  return (
    <div>
      <AppBar
        position="sticky"
        elevation={3}
        color="transparent"
        sx={{ height: "10vh", marginBottom: 6 }}
      >
        <Container maxWidth="lg" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Research Funding DApp</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: "#00A86B", marginRight: 2 }}
                onClick={() => router.push("/")}
              >
                Home
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#00A86B", marginRight: 2 }}
                onClick={() => router.push("/donations")}
              >
                Donations
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#00A86B" }}
                onClick={() => router.push("/register")}
              >
                Register Organization
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
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
          value={fundingPupose}
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
        <TextField
          id="outlined-amtRaised"
          label="AmountRaised"
          value={amountRaised}
          onChange={(e)=>setAmountRaised(e.target.value)}
          fullWidth
          sx={{ margin: 2 }}
        />
      </form>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Button variant="contained" sx={{ backgroundColor: "#00A86B" }}>
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default register;
