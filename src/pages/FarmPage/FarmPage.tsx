import { Box } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
// import { getBulkPairData } from 'state/stake/hooks';
import { ChainId } from '@uniswap/sdk';
import { ReactComponent as HelpIcon } from 'assets/images/HelpIcon1.svg';
import { useActiveWeb3React } from 'hooks';
import 'pages/styles/farm.scss';
import { useTranslation } from 'react-i18next';
import { useDefaultDualFarmList } from 'state/dualfarms/hooks';
import { useDefaultFarmList } from 'state/farms/hooks';
import FarmRewards from './FarmRewards';
import FarmsList from './FarmsList';

const FarmPage: React.FC = () => {
  const { chainId } = useActiveWeb3React();
  const { t } = useTranslation();
  const [bulkPairs, setBulkPairs] = useState<any>(null);
  // const [farmIndex, setFarmIndex] = useState(
  //   GlobalConst.farmIndex.LPFARM_INDEX,
  // );
  const chainIdOrDefault = chainId ?? ChainId.MAINNET;
  const lpFarms = useDefaultFarmList();

  // const pairLists = useMemo(() => {
  //   const stakingPairLists = Object.values(lpFarms[chainIdOrDefault]).map(
  //     (item) => item.pair,
  //   );
  //   const dualPairLists = Object.values(dualFarms[chainIdOrDefault]).map(
  //     (item) => item.pair,
  //   );
  //   return stakingPairLists.concat(dualPairLists);
  // }, [chainIdOrDefault, lpFarms, dualFarms]);

  return (
    <Box width='100%' mb={3} id='farmPage'>
      <Box className='pageHeading'>
        <Box mr={2}>
          <h4>{t('farm')}</h4>
        </Box>
        <Box className='helpWrapper'>
          <small>{t('help')}</small>
          <HelpIcon />
        </Box>
      </Box>
      {/* <CustomSwitch
        width={300}
        height={48}
        items={farmCategories}
        isLarge={true}
      /> */}
      <Box my={2}>
        <FarmRewards bulkPairs={bulkPairs} />
      </Box>
      <Box className='farmsWrapper'>
        <FarmsList bulkPairs={bulkPairs} />
      </Box>
    </Box>
  );
};

export default FarmPage;
