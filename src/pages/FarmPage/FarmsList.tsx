import { Box, Divider, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import {
  CustomMenu,
  CustomSwitch,
  FarmCard,
  SearchInput,
  ToggleSwitch,
} from 'components';
import { useActiveWeb3React } from 'hooks';
import React, { useState } from 'react';
import { ArrowDown, ArrowUp } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { StakingInfo } from 'types';
import { getOneYearFee, returnFullWidthMobile } from 'utils';
import useDebouncedChangeHandler from 'utils/useDebouncedChangeHandler';
import { useInfiniteLoading } from 'utils/useInfiniteLoading';

const LOADFARM_COUNT = 10;
const POOL_COLUMN = 1;
const TVL_COLUMN = 2;
const REWARDS_COLUMN = 3;
const APY_COLUMN = 4;
const EARNED_COLUMN = 5;

interface FarmsListProps {
  bulkPairs: any;
}

const FarmsList: React.FC<FarmsListProps> = ({ bulkPairs }) => {
  const { t } = useTranslation();
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('xs'));
  const { chainId } = useActiveWeb3React();
  const [pageIndex, setPageIndex] = useState(0);
  const [isEndedFarm, setIsEndedFarm] = useState(false);
  const [sortBy, setSortBy] = useState(0);
  const [sortDesc, setSortDesc] = useState(false);
  const [stakedOnly, setStakeOnly] = useState(false);
  const [farmSearch, setFarmSearch] = useState('');
  const [farmSearchInput, setFarmSearchInput] = useDebouncedChangeHandler(
    farmSearch,
    setFarmSearch,
  );

  const getPoolApy = (pairId: string) => {
    if (!pairId || !bulkPairs) {
      return 0;
    }

    const oneDayVolume = bulkPairs?.[pairId.toLowerCase()]?.oneDayVolumeUSD;
    const reserveUSD = bulkPairs?.[pairId.toLowerCase()]?.reserveUSD;
    const oneYearFeeAPY = getOneYearFee(
      Number(oneDayVolume),
      Number(reserveUSD),
    );
    return oneYearFeeAPY;
  };

  const loadNext = () => {
    setPageIndex(pageIndex + 1);
  };

  const { loadMoreRef } = useInfiniteLoading(loadNext);

  const sortColumns = [
    { text: t('pool'), index: POOL_COLUMN, width: 0.3, justify: 'flex-start' },
    { text: t('tvl'), index: TVL_COLUMN, width: 0.2, justify: 'center' },
    {
      text: t('rewards'),
      index: REWARDS_COLUMN,
      width: 0.25,
      justify: 'center',
    },
    { text: t('apy'), index: APY_COLUMN, width: 0.15, justify: 'center' },
    {
      text: t('earned'),
      index: EARNED_COLUMN,
      width: 0.2,
      justify: 'flex-end',
    },
  ];

  const sortByDesktopItems = sortColumns.map((item) => {
    return {
      ...item,
      onClick: () => {
        if (sortBy === item.index) {
          setSortDesc(!sortDesc);
        } else {
          setSortBy(item.index);
          setSortDesc(false);
        }
      },
    };
  });

  const sortByMobileItems = sortColumns.map((item) => {
    return { text: item.text, onClick: () => setSortBy(item.index) };
  });

  const renderStakedOnly = () => (
    <Box className='flex items-center'>
      <small className='text-disabled' style={{ marginRight: 8 }}>
        {t('stakedOnly')}
      </small>
      <ToggleSwitch
        toggled={stakedOnly}
        onToggle={() => setStakeOnly(!stakedOnly)}
      />
    </Box>
  );

  const farmStatusItems = [
    {
      text: t('active'),
      onClick: () => setIsEndedFarm(false),
      condition: !isEndedFarm,
    },
    {
      text: t('ended'),
      onClick: () => setIsEndedFarm(true),
      condition: isEndedFarm,
    },
  ];

  const stakingInfos: any = [
    {
      rewardToken: '',
      rewardTokenPrice: 12,
      rate: 123,
    },
  ];

  return (
    <>
      <Box className='farmListHeader'>
        <Box>
          <h5>EARN TOKEN</h5>
          <small>
            Stake LP Tokens to earn Token
            {/* {t(
              farmIndex === GlobalConst.farmIndex.LPFARM_INDEX
                ? 'stakeMessageLP'
                : 'stakeMessageDual',
            )} */}
          </small>
        </Box>
        <Box className='flex flex-wrap'>
          <Box
            className='flex justify-between'
            width={returnFullWidthMobile(isMobile)}
          >
            <Box width={isMobile ? 'calc(100% - 150px)' : 1} mr={2} my={2}>
              <SearchInput
                placeholder={isMobile ? t('search') : t('searchPlaceHolder')}
                value={farmSearchInput}
                setValue={setFarmSearchInput}
              />
            </Box>
            {isMobile && renderStakedOnly()}
          </Box>
          <Box
            width={returnFullWidthMobile(isMobile)}
            className='flex flex-wrap items-center'
          >
            <Box mr={2}>
              <CustomSwitch width={160} height={40} items={farmStatusItems} />
            </Box>
            {isMobile ? (
              <>
                <Box height={40} flex={1}>
                  <CustomMenu
                    title={t('sortBy')}
                    menuItems={sortByMobileItems}
                  />
                </Box>
                <Box mt={2} width={1} className='flex items-center'>
                  <small className='text-disabled' style={{ marginRight: 8 }}>
                    {sortDesc ? t('sortdesc') : t('sortasc')}
                  </small>
                  <ToggleSwitch
                    toggled={sortDesc}
                    onToggle={() => setSortDesc(!sortDesc)}
                  />
                </Box>
              </>
            ) : (
              renderStakedOnly()
            )}
          </Box>
        </Box>
      </Box>
      <Divider />
      {!isMobile && (
        <Box mt={2.5} display='flex' paddingX={2}>
          {sortByDesktopItems.map((item) => (
            <Box
              key={item.index}
              width={item.width}
              className={`flex items-center cursor-pointer ${
                sortBy === item.index ? '' : 'text-secondary'
              }`}
              justifyContent={item.justify}
              onClick={item.onClick}
            >
              <small>{item.text}</small>
              <Box display='flex' ml={0.5}>
                {sortBy === item.index && sortDesc ? (
                  <ArrowDown size={20} />
                ) : (
                  <ArrowUp size={20} />
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}
      {!stakingInfos && (
        <>
          <Skeleton width='100%' height={100} />
          <Skeleton width='100%' height={100} />
          <Skeleton width='100%' height={100} />
          <Skeleton width='100%' height={100} />
          <Skeleton width='100%' height={100} />
        </>
      )}
      {stakingInfos &&
        stakingInfos.map((info: StakingInfo, index: number) => (
          <FarmCard
            key={index}
            stakingInfo={info}
            stakingAPY={123}
            isLPFarm={true}
          />
        ))}
      <div ref={loadMoreRef} />
    </>
  );
};

export default FarmsList;
