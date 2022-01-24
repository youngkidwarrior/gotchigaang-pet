// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.0;

import { PokeMeReady } from './PokeMeReady.sol';

interface AavegotchiFacet {
  function tokenIdsOfOwner(address _owner)
    external
    view
    returns (uint32[] memory tokenIds_);

  function isPetOperatorForAll(address _owner, address _operator)
    external
    view
    returns (bool approved_);
}

interface AavegotchiGameFacet {
  function interact(uint256[] calldata _tokenIds) external;
}

interface Moloch {
  struct Member {
    address delegateKey; // the key responsible for submitting proposals and voting - defaults to member address unless updated
    uint256 shares; // the # of voting shares assigned to this member
    uint256 loot; // the loot amount available to this member (combined with shares on ragequit)
    bool exists; // always true once a member has been created
    uint256 highestIndexYesVote; // highest proposal index # on which the member voted YES
    uint256 jailed; // set to proposalIndex of a passing guild kick proposal for this member, prevents voting on and sponsoring proposals
  }

  function members(address member)
    external
    view
    returns (
      address delegateKey,
      uint256 shares,
      uint256 loot,
      bool exists,
      uint256 highestIndexYesVote,
      uint256 jailed
    );
}

contract LazyPetter is PokeMeReady {
  uint256 public lastExecuted;
  address[] private gotchiOwners;
  AavegotchiFacet private af;
  AavegotchiGameFacet private agf;
  Moloch private moloch;

  event AddGotchiOwner(address gotchiOwner);
  event RemoveGotchiOwner(address gotchiOwner);

  constructor(
    address payable _pokeMe,
    address gotchiDiamond,
    address dao
  ) PokeMeReady(_pokeMe) {
    af = AavegotchiFacet(gotchiDiamond);
    agf = AavegotchiGameFacet(gotchiDiamond);
    moloch = Moloch(dao);
  }

  modifier onlyGaang() {
    (, uint256 shares, uint256 loot, , , ) = moloch.members(msg.sender);
    require(shares > 0 || loot > 0);
    _;
  }

  function addGotchiOwner(address _gotchiOwner) external {
    require(
      af.isPetOperatorForAll(_gotchiOwner, address(this)),
      'Not authorized to be pet by autopetter'
    );
    for (uint256 i = 0; i < gotchiOwners.length; i++) {
      require(gotchiOwners[i] != _gotchiOwner, 'Gotchis already being pet');
    }
    uint32[] memory gotchis = af.tokenIdsOfOwner(_gotchiOwner);
    require(gotchis.length > 0, 'Addresses must have at least one gotchi');
    gotchiOwners.push(_gotchiOwner);
    emit AddGotchiOwner(_gotchiOwner);
  }

  function removeGotchiOwner(address _gotchiOwner) external onlyGaang {
    for (uint256 i = 0; i < gotchiOwners.length; i++) {
      if (gotchiOwners[i] == _gotchiOwner) {
        delete gotchiOwners[i];
        emit RemoveGotchiOwner(_gotchiOwner);
      }
    }
  }

  function petGotchis() external onlyPokeMe {
    require(
      ((block.timestamp - lastExecuted) > 43200),
      'LazyPetter: pet: 12 hours not elapsed'
    );
    require(gotchiOwners.length > 0, 'LazyPetter: no gotchis to pet');
    for (uint256 i = 0; i < gotchiOwners.length; i++) {
      uint32[] memory gotchis = af.tokenIdsOfOwner(gotchiOwners[i]);
      uint256[] memory gotchiIds = new uint256[](gotchis.length);
      for (uint256 j = 0; j < gotchis.length; j++) {
        gotchiIds[j] = uint256(gotchis[j]);
      }
      agf.interact(gotchiIds);
    }

    lastExecuted = block.timestamp;
  }

  function getGotchiOwners() external view returns (address[] memory) {
    return gotchiOwners;
  }
}
