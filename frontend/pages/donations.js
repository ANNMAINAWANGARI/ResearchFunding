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
import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { LoginContext } from "../context/LoginContext";
import copy from "copy-to-clipboard";
import { tableCellClasses } from "@mui/material/TableCell";
import { useRouter } from "next/router";

const donations = () => {
  const { data } = useContext(LoginContext);
  const [copyText, setCopyText] = useState(false);
  const router = useRouter();
  return (
    <div>
      <Navbar />

      <Typography variant="h4" align="center">
        Research & Startups Funding Request
      </Typography>

      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        {copyText && (
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: 1,
              textAlign: "center",
            }}
          >
            Address Copied
          </div>
        )}
        <TableContainer component={Paper}>
          <Table
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none",
              },
            }}
          >
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
                  <TableCell
                    component="th"
                    scope="row"
                    //className={copyText ? styles.copiedText:styles.notCopiedText}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setCopyText(true);
                      copy(row.address);
                      setTimeout(() => {
                        setCopyText(false);
                      }, 2000);
                      //setCopyText(false);
                    }}
                  >
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
          Please click the address to copy it, wait untill it is copied before
          proceeding to make a donation.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#00A86B", marginRight: 5 }}
            onClick={() => router.push("/donate")}
          >
            Donate
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#00A86B" }}
            onClick={() => router.push("/withdraw")}
          >
            Withdraw
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default donations;
