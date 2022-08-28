import { Box, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import CircleInfoIcon from 'assets/images/circleinfo.svg';
import { CurrencyLogo, NumericalInput } from 'components';
import { GlobalConst } from 'constants/index';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DualStakingInfo, StakingInfo } from 'types';
import {
  formatMulDivTokenAmount,
  formatNumber,
  formatTokenAmount,
} from 'utils';
import { unwrappedToken } from 'utils/wrappedCurrency';

const FarmCardDetails: React.FC<{
  stakingInfo: StakingInfo | DualStakingInfo;
  stakingAPY: number;
  isLPFarm?: boolean;
}> = ({ stakingInfo, stakingAPY, isLPFarm }) => {
  const { t } = useTranslation();
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('xs'));
  const [stakeAmount, setStakeAmount] = useState('');
  const [attemptUnstaking, setAttemptUnstaking] = useState(false);
  const [attemptClaiming, setAttemptClaiming] = useState(false);
  const [unstakeAmount, setUnStakeAmount] = useState('');

  const lpStakingInfo = stakingInfo as StakingInfo;
  const dualStakingInfo = stakingInfo as DualStakingInfo;

  // const currency0 = token0 ? unwrappedToken(token0) : undefined;
  // const currency1 = token1 ? unwrappedToken(token1) : undefined;

  // const userLiquidityUnstaked = useTokenBalance(
  //   account ?? undefined,
  //   stakingInfo.stakedAmount?.token,
  // );

  // const stakedAmounts = getStakedAmountStakingInfo(
  //   stakingInfo,
  //   userLiquidityUnstaked,
  // );

  // let apyWithFee: number | string = 0;

  // if (
  //   stakingInfo &&
  //   stakingInfo.perMonthReturnInRewards &&
  //   stakingAPY &&
  //   stakingAPY > 0
  // ) {
  //   apyWithFee = formatAPY(
  //     getAPYWithFee(stakingInfo.perMonthReturnInRewards, stakingAPY),
  //   );
  // }

  // const stakingContract = useStakingContract(stakingInfo?.stakingRewardAddress);

  // const { parsedAmount: unstakeParsedAmount } = useDerivedStakeInfo(
  //   unstakeAmount,
  //   stakingInfo.stakedAmount?.token,
  //   stakingInfo.stakedAmount,
  // );

  return (
    <>
      <Box
        className={`farmCardDetails ${
          stakingInfo?.ended ? 'justify-end' : 'justify-between'
        }`}
      >
        {stakingInfo && (
          <>
            {isMobile && (
              <>
                <Box className='farmCardMobileRow'>
                  <small className='text-secondary'>{t('tvl')}</small>
                  <small>{12334}</small>
                </Box>
                <Box className='farmCardMobileRow'>
                  <small className='text-secondary'>{t('rewards')}</small>
                  <Box textAlign='right'>
                    <small>$1,234 /{t('day')}</small>
                    <br />
                    <small>{12.343}</small>
                  </Box>
                </Box>
                <Box className='farmCardMobileRow'>
                  <Box className='flex items-center'>
                    <small className='text-secondary'>{t('apy')}</small>
                    <Box ml={0.5} height={16}>
                      <img src={CircleInfoIcon} alt={'arrow up'} />
                    </Box>
                  </Box>
                  <small className='text-success'>{2}%</small>
                </Box>
              </>
            )}
            {!stakingInfo.ended && (
              <Box className='buttonWrapper'>
                <Box className='flex justify-between'>
                  <small>{t('inwallet')}:</small>
                  <Box className='flex flex-col items-end'>
                    <small>12,345 {t('lp')} 12,235$</small>
                    <Link
                      to={`/pools?currency0=0X000&currency1=0X0000`}
                      className='text-primary'
                    >
                      {t('get')} TOKEN 1 / TOKEN 2 {t('lp')}
                    </Link>
                  </Box>
                </Box>
                <Box className='inputVal' mb={2} mt={2} p={2}>
                  <NumericalInput
                    placeholder='0.00'
                    value={stakeAmount}
                    fontSize={16}
                    onUserInput={(value) => {
                      setStakeAmount(value);
                    }}
                  />
                  <small
                    className={
                      //   ? 'text-primary'
                      //   : 'text-hint'
                      'text-primary'
                    }
                    // onClick={() => {
                    //   if (
                    //     userLiquidityUnstaked &&
                    //     userLiquidityUnstaked.greaterThan('0')
                    //   ) {
                    //     setStakeAmount(userLiquidityUnstaked.toExact());
                    //   } else {
                    //     setStakeAmount('');
                    //   }
                    // }}
                  >
                    {t('max')}
                  </small>
                </Box>
                <Box
                  className={true ? 'buttonClaim' : 'buttonToken'}
                  mt={2}
                  p={2}
                >
                  <p>{t('stakingLPTokens')}</p>
                </Box>
              </Box>
            )}
            <Box className='buttonWrapper' mx={isMobile ? 0 : 2} my={2}>
              <Box className='flex justify-between'>
                <small>{t('mydeposits')}:</small>
                <small>12,124 {t('lp')} 123$</small>
              </Box>
              <Box className='inputVal' mb={2} mt={4.5} p={2}>
                <NumericalInput
                  placeholder='0.00'
                  value={unstakeAmount}
                  fontSize={16}
                  onUserInput={(value) => {
                    setUnStakeAmount(value);
                  }}
                />
                <small
                  className={
                    stakingInfo.stakedAmount &&
                    stakingInfo.stakedAmount.greaterThan('0')
                      ? 'text-primary'
                      : 'text-hint'
                  }
                  onClick={() => {
                    if (
                      stakingInfo.stakedAmount &&
                      stakingInfo.stakedAmount.greaterThan('0')
                    ) {
                      setUnStakeAmount(stakingInfo.stakedAmount.toExact());
                    } else {
                      setUnStakeAmount('');
                    }
                  }}
                >
                  {t('max')}
                </small>
              </Box>
              <Box
                className={true ? 'buttonClaim' : 'buttonToken'}
                mt={2}
                p={2}
                // onClick={() => {
                //   if (unstakeEnabled) {
                //     onWithdraw();
                //   }
                // }}
              >
                <p>
                  {attemptUnstaking
                    ? t('unstakingLPTokens')
                    : t('unstakeLPTokens')}
                </p>
              </Box>
            </Box>
            <Box className='buttonWrapper'>
              <Box className='flex flex-col items-center justify-between'>
                <Box mb={1}>
                  <small>{t('unclaimedRewards')}:</small>
                </Box>
                {isLPFarm ? (
                  <>
                    <Box mb={1}>
                      <CurrencyLogo currency={lpStakingInfo.rewardToken} />
                    </Box>
                    <Box mb={1} textAlign='center'>
                      <p className='text-secondary'>
                        {formatTokenAmount(lpStakingInfo.earnedAmount)}
                        &nbsp;{lpStakingInfo.rewardToken.symbol}
                      </p>
                      <small>earnedUSDStr</small>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box mb={1} display='flex'>
                      <CurrencyLogo
                        currency={unwrappedToken(dualStakingInfo.rewardTokenA)}
                      />
                      <CurrencyLogo
                        currency={unwrappedToken(dualStakingInfo.rewardTokenB)}
                      />
                    </Box>
                    <Box mb={1} textAlign='center'>
                      <p>earnedUSDStr</p>
                      <p className='text-secondary'>
                        {formatTokenAmount(dualStakingInfo.earnedAmountA)}
                        <span>&nbsp;{dualStakingInfo.rewardTokenA.symbol}</span>
                      </p>
                      <p className='text-secondary'>
                        {formatTokenAmount(dualStakingInfo.earnedAmountB)}
                        <span>&nbsp;{dualStakingInfo.rewardTokenB.symbol}</span>
                      </p>
                    </Box>
                  </>
                )}
              </Box>
              <Box
                className={true ? 'buttonClaim' : 'buttonToken'}
                p={2}
                // onClick={() => {
                //   if (claimEnabled) {
                //     onClaimReward();
                //   }
                // }}
              >
                <p>{attemptClaiming ? t('claiming') : t('claim')}</p>
              </Box>
            </Box>
          </>
        )}
      </Box>
      {true && (
        <Box className='dailyRateWrapper'>
          <Box>
            <Box>
              <small className='text-secondary'>
                {t('yourRate', {
                  symbol: isLPFarm ? '' : dualStakingInfo.rewardTokenA.symbol,
                })}
                :
              </small>
            </Box>
            <small>Rate/day TOKEN 1 / {t('day')}</small>
          </Box>
          {!isLPFarm && (
            <Box>
              <Box>
                <small className='text-secondary'>
                  {t('yourRate', {
                    symbol: dualStakingInfo.rewardTokenB.symbol,
                  })}
                  :
                </small>
              </Box>
              <small>
                {formatMulDivTokenAmount(
                  dualStakingInfo.rewardRateB,
                  GlobalConst.utils.ONEDAYSECONDS,
                )}{' '}
                {dualStakingInfo.rewardTokenB.symbol} / {t('day')}
              </small>
            </Box>
          )}
          <Box>
            <Box>
              <small className='text-secondary'>{t('yourFees')}:</small>
            </Box>
            <small>
              ${formatNumber(stakingInfo.accountFee)} / {t('day')}
            </small>
          </Box>
        </Box>
      )}
    </>
  );
};

export default FarmCardDetails;
