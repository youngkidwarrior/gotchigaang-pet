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
    const added = contract.addGotchiOwners([address]);
    added
      .then((a) => {
        resolve(a);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
