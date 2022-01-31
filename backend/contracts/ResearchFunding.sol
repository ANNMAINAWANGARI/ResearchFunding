//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "../node_modules/hardhat/console.sol";
import "@openzeppelin/contracts/access/Roles.sol";

contract ResearchFunding {
     using Roles for Roles.Role;
    /** @dev GRO:Global Research Organization**/
     Roles.Role private _GRO;
     Roles. Role private _ResearchOrg;

/**  @dev think of it like an object that stores each organizations metadata**/
     struct ROrganizations{
         string orgName;
         string orgCountry;
         string fundingPurpose;
         uint256 amtNeeded;
         uint256 amtRaised;
}
/** @dev mapping that maps each organization address to the struct ROrganizations**/
mapping(address => ROrganizations) organization;


/** @dev address array that stores research organization accounts**/ 
address[] public orgAccts;


/** @dev donate event that will be emmited from the frontend**/
event donate(address, uint256); 
constructor() public{
_GRO.add(msg.sender);
}    
function addOrg(address _address, string memory _orgName, string memory _orgCountry, string memory _fundingPurpose, uint256 _amtNeeded){
    /**
     * @dev Check if an account has this role.
     */
     require(_GRO.has(msg.sender),"!ONLY THE GRO CAN ADD ORGANIZATIONS");
     ROrganizations storage org = organization[_address];
     org.orgName = _orgName;
     org.orgCountry = _orgCountry;
     org.fundingPurpose = _fundingPurpose;
     org.amtNeeded = _amtNeeded;
     org.amtRaised = 0;
     _ResearchOrg.add(_address);
     orgAccts.push(_address);
}
function getOrgs() view public returns(address[] memory){
    return orgAccts;
}
function getOrg() view public returns(address, string memory, string memory, string memory, uint256, uint256 ){
return(organisation[_address].orgName,organisation[_address].orgCountry,organisation[_address].fundingPurpose,organisation[_address].amtNeeded,organisation[_address].amtRaised);
}
function donateFunds(address _toOrg, uint256 _amount) external payable{
    organisation[_toOrg].amtRaised += msg.value;
    emit donate(_toOrg, msg.value);
}
function getBalance() public view returns(uint256){
    return address(this).balance;
}
function withdrawFunds(address _toOrg) public{
    require(_ResearchOrg.has(msg.sender),"!YOU ARE NOT PERMITTED TO WITHDRAW FUNDS, PLEASE USE THE CORRECT ADDRESS");
    uint256 _amtRaised = organization[_toOrg].amtRaised;
    _toOrg.call.value(_amtRaised)("");
    organization[_toOrg].amtRaised = 0;
}
}