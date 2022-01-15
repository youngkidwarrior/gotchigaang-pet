// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.0;

import { PokeMeReady } from './PokeMeReady.sol';

interface AavegotchiFacet {
  function tokenIdsOfOwner(address _owner)
    external
    view
    returns (uint32[] memory tokenIds_);

  function setPetOperatorForAll(address _operator, bool _approved) external;
}

interface AavegotchiGameFacet {
  function interact(uint256[] calldata _tokenIds) external;
}

contract LazyPetter is PokeMeReady {
  uint256 public lastExecuted;
  address[] private gotchiOwners;
  AavegotchiFacet private af;
  AavegotchiGameFacet private agf;

  event AddGotchiOwners(address[] gotchiOwners);
  event RemoveGotchiOwners(address[] gotchiOwners);

  constructor(
    address payable _pokeMe,
    address gotchiDiamond,
    address[] _gotchiOwners
  ) PokeMeReady(_pokeMe) {
    af = AavegotchiFacet(gotchiDiamond);
    agf = AavegotchiGameFacet(gotchiDiamond);
    gotchiOwners = _gotchiOwners;
  }

  function addGotchiOwners(address[] _gotchiOwners) external {
    for (uint256 i = 0; i < _gotchiOwners.length; i++) {
      uint32[] memory gotchis = af.tokenIdsOfOwner(gotchiOwners[i]);
      require(gotchis.length > 0, 'Addresses must have at least one gotchi');
      af.setPetOperatorForAll(address(this), true);
      gotchiOwners.push(_gotchiOwners[i]);
    }
    emit AddGotchiOwners(_gotchiOwners);
  }

  function removeGotchiOwners(address[] _gotchiOwners) external {
    for (uint256 i = 0; i < _gotchiOwners.length; i++) {
      for (uint256 j = 0; j < gotchiOwners.length; j++) {
        if (gotchiOwners[j] == _gotchiOwners[i]) {
          af.setPetOperatorForAll(address(this), false);
          delete gotchiOwners[j];
        }
      }
    }
    emit RemoveGotchiOwners(_gotchiOwners);
  }

  function petGotchis() external onlyPokeMe {
    require(
      ((block.timestamp - lastExecuted) > 43200),
      'LazyPetter: pet: 12 hours not elapsed'
    );
    for (uint256 i = 0; i < gotchiOwners.length; i++) {
      uint32[] memory gotchis = af.tokenIdsOfOwner(gotchiOwners[i]);
      uint256[] memory gotchiIds = new uint256[](gotchis.length);
      for (uint256 i = 0; i < gotchis.length; i++) {
        gotchiIds[i] = uint256(gotchis[i]);
      }
      agf.interact(gotchiIds);
    }

    lastExecuted = block.timestamp;
  }
}