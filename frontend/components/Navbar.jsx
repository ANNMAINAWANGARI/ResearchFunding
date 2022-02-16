import { AppBar, Button, Container, Hidden, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import NextJSLink from "next/link";
import Web3Modal from "web3modal";
import { useContext,useEffect } from 'react'
import { LoginContext } from "../context/LoginContext";
const Navbar = () => {
  const {walletConnected,address,connectWallet,walletAddress}=useContext(LoginContext)
  const router = useRouter();
  return (
    <div>
      <AppBar
        position="sticky"
        elevation={3}
        sx={{ marginBottom: 6, backgroundColor: "black" }}
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
            <Box >
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
