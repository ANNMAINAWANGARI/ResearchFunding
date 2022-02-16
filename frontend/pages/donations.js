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
import React,{ useContext } from "react";
import Navbar from "../components/Navbar";
import { LoginContext } from "../context/LoginContext";


const donations = () => {
  const { data} =useContext(LoginContext);
  return (
    <div>
      <Navbar />

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
              {data.map((row) => (
                <TableRow
                  key={row.address}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.address.slice(0, 4)}...{row.address.slice(35)}
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
                    {row.AmountRequested}ETH
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.AmountRaised}ETH
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
        <Button variant="contained" sx={{ backgroundColor: "#00A86B" }}>
          Donate
        </Button>
      </Box>
    </div>
  );
};

export default donations;
