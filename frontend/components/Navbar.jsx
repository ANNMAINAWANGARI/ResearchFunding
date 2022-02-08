import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useRouter } from "next/router";

const Navbar = () => {
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
            <Box>
              <Button variant="contained" sx={{ backgroundColor: "black" }}>
                Connect Wallet
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
