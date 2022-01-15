import { isDecodedCallTrace } from 'hardhat/internal/hardhat-network/stack-traces/message-trace';
import { useState, useEffect } from 'react';

const api =
  'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-matic';

//graphql query that fetches moloches where id=procerr.env.DAO_address data from the graph and returns it as a json object

export const useGaangMembers = () => {
  const [gaang, setGaang] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: {
          moloches
        },
      } = await (
        await fetch(api, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            query: `{
            moloches(where:{id:${process.env.DAO_ADDRESS}}) {
              id
              members{
                memberAddress
              }
            }
          }`,
          }),
        })
      ).json();
      const gaangAddresses = moloches[0].members.map(member => member.memberAddress);
      setGaang(gaangAddresses);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { gaang, error, loading };
};
