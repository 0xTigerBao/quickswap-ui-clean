import { Box, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import CircleInfoIcon from 'assets/images/circleinfo.svg';
import { CurrencyLogo, DoubleCurrencyLogo } from 'components';
import 'components/styles/FarmCard.scss';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DualStakingInfo, StakingInfo } from 'types';
import FarmCardDetails from './FarmCardDetails';

const FarmCard: React.FC<{
  stakingInfo: StakingInfo | DualStakingInfo;
  stakingAPY: number;
  isLPFarm?: boolean;
}> = ({ stakingInfo, stakingAPY, isLPFarm }) => {
  const { t } = useTranslation();
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('xs'));
  const [isExpandCard, setExpandCard] = useState(false);

  const lpStakingInfo = stakingInfo as StakingInfo;

  const renderPool = (width: number) => (
    <Box className='flex items-center' width={width}>
      <DoubleCurrencyLogo
        // currency0={currency0}
        // currency1={currency1}
        size={28}
      />
      <Box ml={1.5}>
        <small>TOKEN 1 / TOKEN 2 LP</small>
      </Box>
    </Box>
  );

  return (
    <Box className={`farmLPCard ${isExpandCard ? 'highlightedCard' : ''}`}>
      <Box
        className='farmLPCardUp'
        onClick={() => setExpandCard(!isExpandCard)}
      >
        {isMobile ? (
          <>
            {renderPool(isExpandCard ? 0.95 : 0.7)}
            {!isExpandCard && (
              <Box width={0.25}>
                <Box className='flex items-center'>
                  <span className='text-secondary'>{t('apy')}</span>
                  <Box ml={0.5} height={16}>
                    <img src={CircleInfoIcon} alt={'arrow up'} />
                  </Box>
                </Box>
                <Box mt={0.5}>
                  <small className='text-success'>100%</small>
                </Box>
              </Box>
            )}
            <Box width={0.05} className='flex justify-end text-primary'>
              {isExpandCard ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </Box>
          </>
        ) : (
          <>
            {renderPool(0.3)}
            <Box width={0.2} textAlign='center'>
              <small>${100034}</small>
            </Box>
            <Box width={0.25} textAlign='center'>
              <p className='small'>$124 / {t('day')}</p>
              <p className='small'>
                {/* {lpPoolRate} */}
                2.4
              </p>
            </Box>
            <Box
              width={0.15}
              className='flex justify-center items-center text-success'
            >
              <small>{2}%</small>
              <Box ml={0.5} height={16}>
                <img src={CircleInfoIcon} alt={'arrow up'} />
              </Box>
            </Box>
            <Box width={0.2} textAlign='right'>
              <small>$12,378</small>
              <Box className='flex items-center justify-end'>
                <CurrencyLogo
                  currency={lpStakingInfo.rewardToken}
                  size='16px'
                />
                <small style={{ marginLeft: 5 }}>
                  {134}
                  &nbsp; TOKEN
                </small>
              </Box>
            </Box>
          </>
        )}
      </Box>
      {isExpandCard && (
        <FarmCardDetails
          stakingInfo={stakingInfo}
          stakingAPY={stakingAPY}
          isLPFarm={isLPFarm}
        />
      )}
    </Box>
  );
};

export default FarmCard;
