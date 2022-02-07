//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ResearchFunding is AccessControl, ReentrancyGuard {
    bytes32 private constant GRO_ROLE = keccak256("GRO_ROLE");
    bytes32 private constant RESEARCHORG_ROLE = keccak256("RESEARCHORG_ROLE");
    constructor(){
    _setupRole(GRO_ROLE, msg.sender);
}
struct ROrganizations{
 string orgName;
 string orgCountry;
 string fundingPurpose;
 uint256 amtNeeded;
 uint256 amtRaised;
}
mapping(address => ROrganizations) organisation;
address[] public orgAccts;
event donate(address, uint256); 
    
function addOrg(address _address, string memory _orgName, string memory _orgCountry, string memory _fundingPurpose, uint256 _amtNeeded) public{
     require(hasRole(GRO_ROLE, msg.sender),"!ONLY THE GRO CAN ADD ORGANIZATIONS");
     ROrganizations storage org = organisation[_address];
     org.orgName = _orgName;
     org.orgCountry = _orgCountry;
     org.fundingPurpose = _fundingPurpose;
     org.amtNeeded = _amtNeeded;
     org.amtRaised = 0;
     _setupRole(RESEARCHORG_ROLE, _address);
     orgAccts.push(_address);
}
function getOrgs() view public returns(address[] memory){
    return orgAccts;
}
function getOrg( address _address) view public returns(string memory, string memory, string memory, uint256, uint256 ){
return(organisation[_address].orgName,organisation[_address].orgCountry,organisation[_address].fundingPurpose,organisation[_address].amtNeeded,organisation[_address].amtRaised);
}
function donateFunds(address _toOrg) external payable{
    organisation[_toOrg].amtRaised += msg.value;
    emit donate(_toOrg, msg.value);
}
function getBalance() public view returns(uint256){
    return address(this).balance;
}
function withdrawFunds(address _toOrg) public nonReentrant{
    require(hasRole(RESEARCHORG_ROLE,msg.sender),"!YOU ARE NOT PERMITTED TO WITHDRAW FUNDS, PLEASE USE THE CORRECT ADDRESS");
    uint256 _amtRaised = organisation[_toOrg].amtRaised;
    organisation[_toOrg].amtRaised = 0;
    _toOrg.call{value:_amtRaised}("");
}
}