import { Box, Grid } from '@material-ui/core';
import 'pages/styles/swap.scss';
import React from 'react';
import SwapMain from './SwapMain';

const SwapPage: React.FC = () => {
  // const [pairId, setPairId] = useState<string | undefined>(undefined);
  // const [transactions, setTransactions] = useState<any[] | undefined>(
  //   undefined,
  // );
  // const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));

  // const { currencies } = useDerivedSwapInfo();
  // const { chainId } = useActiveWeb3React();

  // const token1 = wrappedCurrency(currencies[Field.INPUT], chainId);
  // const token2 = wrappedCurrency(currencies[Field.OUTPUT], chainId);

  // // this is for refreshing data of trades table every 60 seconds
  // // useEffect(() => {
  // //   const interval = setInterval(() => {
  // //     const _currentTime = Math.floor(Date.now() / 1000);
  // //     setCurrentTime(_currentTime);
  // //   }, 60000);
  // //   return () => clearInterval(interval);
  // // }, []);

  // // useEffect(() => {
  // //   async function getPairId(token1Address: string, token2Address: string) {
  // //     const pairData = await getPairAddress(token1Address, token2Address);
  // //     if (pairData) {
  // //       // setPairTokenReversed(pairData.tokenReversed);
  // //       setPairId(pairData.pairId);
  // //     }
  // //   }
  // //   if (token1?.address && token2?.address) {
  // //     getPairId(token1?.address, token2?.address);
  // //   }
  // // }, [token1?.address, token2?.address]);

  // // useEffect(() => {
  // //   (async () => {
  // //     if (pairId && transactions && transactions.length > 0) {
  // //       const txns = await getSwapTransactions(
  // //         pairId,
  // //         Number(transactions[0].transaction.timestamp),
  // //       );
  // //       if (txns) {
  // //         const filteredTxns = txns.filter(
  // //           (txn) =>
  // //             !transactions.filter(
  // //               (tx) => tx.transaction.id === txn.transaction.id,
  // //             ).length,
  // //         );
  // //         setTransactions([...filteredTxns, ...transactions]);
  // //       }
  // //     }
  // //   })();
  // //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // // }, [currentTime]);

  // // useEffect(() => {
  // //   async function getTradesData(pairId: string) {
  // //     setTransactions(undefined);
  // //     const transactions = await getSwapTransactions(pairId);
  // //     setTransactions(transactions);
  // //   }
  // //   if (pairId && isProMode) {
  // //     getTradesData(pairId);
  // //   }
  // // }, [pairId, isProMode]);

  return (
    <Box width='100%' mb={3} id='swap-page'>
      <Grid container spacing={4} justifyContent='center'>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <Box className='wrapper'>
            <SwapMain />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SwapPage;
