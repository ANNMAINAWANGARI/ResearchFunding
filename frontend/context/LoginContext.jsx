import React, { useState, useEffect, useRef } from "react";
import { RESEARCHFUNDING_CONTRACT_ADDRESS, abi } from "../constants";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { ethers } from "ethers";
export const LoginContext = React.createContext();


export const LoginProvider = ({ children }) => {
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

  
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);
  const [dataLoading,setDataLoading]=useState(false)
  const web3ModalRef = useRef();
 
  /**get provider or signer */
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
/**get provider or signer */
  /**connect wallet */
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };
  /**connect wallet */

  /**get wallet address */
  const walletAddress = async () => {
    const signer = await getProviderOrSigner(true);
    const userAddress = await signer.getAddress();
    setAddress(userAddress);
  };
  /**get wallet address */
  /**get organization addresses */
  const getOrgAddresses = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const researchFundingContract = new Contract(
        RESEARCHFUNDING_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const txAddress = await researchFundingContract.getOrgs();
      return txAddress;
    } catch (err) {
      console.error(err);
    }
  };
  /**get startup organization */
  const getOrganizations = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const researchFundingContract = new Contract(
        RESEARCHFUNDING_CONTRACT_ADDRESS,
        abi,
        signer
      );
      let addressValue = await getOrgAddresses();
       return Promise.all(addressValue.map(async (singleAddress) => {
        const orgsInfo = await researchFundingContract.getOrg(singleAddress);
        const AllorgsInfo = await Promise.all(orgsInfo).then(allResults=>{
          return createData(
            singleAddress,
            allResults[0],
            allResults[1],
            allResults[2],
            ethers.utils.formatEther(allResults[3]),
            ethers.utils.formatEther(allResults[4]))
        })
        return AllorgsInfo;
      }))//here
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
      walletAddress();
    }
  }, [walletConnected]);

  /**get startup organization */
  useEffect(() => {
    async function getOrganizationsFunction() {
      await getOrganizations().then(data=>setData(data))
    }
    getOrganizationsFunction()
  },[]);
  return (
    <LoginContext.Provider
      value={{
        walletConnected,
        address,
        data
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
