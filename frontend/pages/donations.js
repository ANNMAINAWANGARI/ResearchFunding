import {
  AppBar,
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
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

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
  const router = useRouter();
  return (
    <div>
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{ height: "10vh", marginBottom: 8 }}
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
    </div>
  );
};

export default donations;
