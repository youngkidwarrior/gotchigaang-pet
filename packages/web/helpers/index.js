export const getGotchiOwners = (contract) => {
  return new Promise((resolve, reject) => {
    const gotchiOwners = contract.getGotchiOwners();
    gotchiOwners
      .then((gotchiOwners) => {
        resolve(gotchiOwners);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addGotchiOwner = (contract, address) => {
  return new Promise((resolve, reject) => {
    contract
      .addGotchiOwner(address)
      .then((tx) => {
        tx.wait().then((receipt) => {
          if (receipt.status) resolve(receipt);
          else reject(receipt);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};


