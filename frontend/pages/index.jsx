import Head from "next/head";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Research Funding DApp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <AppBar
          position="sticky"
          elevation={0}
          color="transparent"
          sx={{ height: "10vh" }}
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
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <Box>
            <Typography variant="h2" align="center" color='black'>
              Fund Your Research Startup
            </Typography>
            <Typography variant="h5" align="center" color="gray" >
              Research, Innovate, Make and Produce with Crypto Funding.
            </Typography>
          </Box>
          <img
            src="./researcher.png"
            alt="Home_Image"
            style={{ width: "60%", height: "80%", objectFit:'cover' }}
          />
        </Container>
      </Box>
    </div>
  );
}