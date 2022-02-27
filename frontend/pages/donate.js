import { Button, TextField, Box } from "@mui/material";
import React, {useContext,useState} from "react";
import Navbar from "../components/Navbar";
import { LoginContext } from "../context/LoginContext";
import { ethers } from "ethers";

const donate = () => {
    const { donateFunds,xaddress,xamount,setXaddress,setXamount } = useContext(LoginContext);
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");
    //const price = ethers.utils.parseUnits(amount.toString(), "ether")
  return (
    <div>
      <Navbar />
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "650px",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        onSubmit={donateFunds}
      >
        <TextField
          id="outlined-address"
          label="Enter Copied Address"
          fullWidth
          sx={{ margin: 1 }}
          value={xaddress}
          onChange={(e) => setXaddress(e.target.value)}
        />
        <TextField
          id="outlined-amount"
          label="Enter Amount to Donate"
          fullWidth
          sx={{ margin: 1 }}
          value={xamount}
          onChange={(e) => setXamount(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "#00A86B" }}
          >
            Donate
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default donate;
