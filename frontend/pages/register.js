import {
  AppBar,
  Button,
  Container,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useRouter } from "next/router";

const register = () => {
  const router = useRouter();
  return (
    <div>
      <AppBar
        position="sticky"
        elevation={0}
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
          marginLeft:'auto',
          marginRight:'auto',
          //border:'1px solid #00A86B'
        }}
      >
        <TextField id="outlined-address" label="Address" fullWidth sx={{margin:1}}/>
        <TextField id="outlined-organization" label="Organization" fullWidth sx={{margin:2}}/>
        <TextField id="outlined-country" label="Country" fullWidth sx={{margin:2}}/>
        <TextField id="outlined-fund" label="FundingPurpose" fullWidth sx={{margin:2}}/>
        <TextField id="outlined-amount" label="AmountRequested" fullWidth sx={{margin:2}}/>
        <TextField id="outlined-amtRaised" label="AmountRaised" fullWidth sx={{margin:2}}/>
      </form>
      <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Button variant='contained'sx={{backgroundColor:'#00A86B'}}>Submit</Button>
      </Box>
    </div>
  );
};

export default register;
