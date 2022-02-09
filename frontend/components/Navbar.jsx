import { AppBar, Button, Container, Hidden, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import NextJSLink from "next/link";
import { RESEARCHFUNDING_CONTRACT_ADDRESS, abi } from "../constants";

const Navbar = () => {
  //let userAddress;
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
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
  /**connect wallet */
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();

      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };
  const walletAddress = async () => {
    const signer = await getProviderOrSigner(true);
    const userAddress = await signer.getAddress();
    setAddress(userAddress);
    console.log("userAddress is", userAddress);
  };
  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
      walletAddress();
      console.log(address);
    }
  }, [walletConnected]);
  const router = useRouter();
  return (
    <div>
      <AppBar
        position="sticky"
        elevation={3}
        //color="transparent"
        sx={{ height: "10vh", marginBottom: 6, backgroundColor: "black" }}
      >
        <Container maxWidth="lg" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Typography variant="h6" color="white">
              Research Funding DApp
            </Typography>
          <Hidden mdDown>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <NextJSLink href="/">
                <a style={{paddingLeft:20,color:'#00A86B'}}>Home</a>
              </NextJSLink>

              <NextJSLink href="/donations">
                <a style={{paddingLeft:30,color:'#00A86B'}}>Donation</a>
              </NextJSLink>

              <NextJSLink href="/register">
                <a style={{paddingLeft:30,color:'#00A86B'}}>RegisterOrganization</a>
              </NextJSLink>
            </div>
            </Hidden>
            <Box sx={{ backgroundColor: "pink" }}>
              {walletConnected ? (
                <div>
                  <Typography variant="h6" color="#00A86B">
                    Wallet Connected
                  </Typography>
                  <Typography color="white">
                    {address.slice(0, 3)}...{address.slice(35)}
                  </Typography>
                </div>
              ) : (
                <Button variant="contained" sx={{ backgroundColor: "#00A86B" }}>
                  Connect Wallet
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
