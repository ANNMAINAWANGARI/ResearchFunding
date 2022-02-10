import {
  
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React,{useEffect,useRef,useState} from "react";
import Navbar from "../components/Navbar";
import { providers, Contract } from "ethers";
import { RESEARCHFUNDING_CONTRACT_ADDRESS, abi } from "../constants";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

function createData(
  address,
  organisation,
  country,
  fundingPurpose,
  AmountRequested,
  AmountRaised
) {
  return {
    address,
    organisation,
    country,
    fundingPurpose,
    AmountRequested,
    AmountRaised,
  };
}

const rows = [
  createData(
    "0x857689820989",
    "Startup A",
    "Kenya",
    "Technical Startup",
    "2ETH",
    0
  ),
  createData(
    "0x682749878689",
    "Startup B",
    "Ethiopia",
    "Medical Research",
    "4ETH",
    0
  ),
  createData(
    "0x376665920654",
    "Startup C",
    "Nigeria",
    "COVID-19 Research",
    "10ETH",
    0
  ),
  createData(
    "0x784779830288",
    "Startup D",
    "Tanzania",
    "School Project",
    "15ETH",
    0
  ),
  createData(
    "0x799354823489",
    "Startup E",
    "Uganda",
    "Documentary Show Premiere",
    "20ETH",
    0
  ),
];

const donations = () => {
  const [orgs,setOrgs]=useState([])
  const web3ModalRef = useRef();
  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Please change the network to Rinkeby");
      throw new Error("Please change the network to Rinkeby");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };
  /**get startup organizations */
  const getOrganizations = async ()=>{
    try{
      const signer = await getProviderOrSigner(true);
      const researchFundingContract = new Contract(
        RESEARCHFUNDING_CONTRACT_ADDRESS, abi,signer
      );
      //price = ethers.utils.parseUnits(amountRequested.toString(),'ether')
      const tx = await researchFundingContract.getOrgs();
      
      //setLoading(true);
      //await tx.wait();
      setOrgs(tx);
      console.log('before orgs areee:',orgs);
      console.log('orgs are:',tx)
      //setLoading(false);
    }
    catch(err){
       console.error(err);
    }
  }
  const getOrganization =async ()=>{
    try{
      const signer = await getProviderOrSigner(true);
      const researchFundingContract = new Contract(
        RESEARCHFUNDING_CONTRACT_ADDRESS, abi,signer
      );
      
      orgs.map(async(orgAddress)=>{
        let orgsInfo = await researchFundingContract.getOrg(orgAddress);
        let AllorgsInfo = await Promise.all(orgsInfo);
        console.log('orgsInfo:',AllorgsInfo)
        //rows.push(createData(orgAddress,orgAddress.orgName,orgAddress.orgCountry,orgAddress.fundingPurpose,orgAddress.amtNeeded,orgAddress.AmountRaised));
        rows.push(createData(AllorgsInfo));
        console.log(rows)
      });
    }catch(err){
      console.error(err);
    }
  }
  
  useEffect(()=>{
    web3ModalRef.current = new Web3Modal({
      network: "rinkeby",
      providerOptions: {},
      disableInjectedProvider: false,
    });
    getOrganization();
   })
  return (
    <div>
      <Navbar/>
      <Typography variant="h4" align="center">
        Research & Startups Funding Request
      </Typography>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#00A86B" }}>
              <TableRow>
                <TableCell>Donation Address</TableCell>
                <TableCell>Organization</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Funding Purpose</TableCell>
                <TableCell>Amount Requested</TableCell>
                <TableCell>Amount Raised</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.address}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.address}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.organisation}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.country}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.fundingPurpose}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.AmountRequested}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.AmountRaised}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Box
        mt={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography align="center" gutterBottom>
          Copy the address first to make a donation
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: "#00A86B" }}>Donate</Button>
      </Box>
      <Button onClick={getOrganizations}>getorgs</Button>
    </div>
  );
};

export default donations;
