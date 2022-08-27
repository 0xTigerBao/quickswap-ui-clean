import { Box, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { ReactComponent as LightIcon } from 'assets/images/LightIcon.svg';
import QuickIcon from 'assets/images/quickIcon.svg';
import QuickLogo from 'assets/images/quickLogo.png';
import { ReactComponent as ThreeDotIcon } from 'assets/images/ThreeDot.svg';
import WalletIcon from 'assets/images/WalletIcon.png';
import { WalletModal } from 'components';
import 'components/styles/Header.scss';
import { useActiveWeb3React } from 'hooks';
import useENSName from 'hooks/useENSName';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useWalletModalToggle } from 'state/application/hooks';
import {
  isTransactionRecent,
  useAllTransactions,
} from 'state/transactions/hooks';
import { TransactionDetails } from 'state/transactions/reducer';
import { addMaticToMetamask, isSupportedNetwork, shortenAddress } from 'utils';

const newTransactionsFirst = (a: TransactionDetails, b: TransactionDetails) => {
  return b.addedTime - a.addedTime;
};

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { account } = useActiveWeb3React();
  const { ethereum } = window as any;
  const { ENSName } = useENSName(account ?? undefined);
  const [openDetailMenu, setOpenDetailMenu] = useState(false);
  const theme = useTheme();
  const allTransactions = useAllTransactions();
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);

  const pending = sortedRecentTransactions
    .filter((tx: any) => !tx.receipt)
    .map((tx: any) => tx.hash);
  const confirmed = sortedRecentTransactions
    .filter((tx: any) => tx.receipt)
    .map((tx: any) => tx.hash);
  const tabletWindowSize = useMediaQuery(theme.breakpoints.down('sm'));
  const mobileWindowSize = useMediaQuery(theme.breakpoints.down('xs'));
  const toggleWalletModal = useWalletModalToggle();
  const menuItems = [
    {
      link: '/swap',
      text: t('swap'),
      id: 'swap-page-link',
    },
    {
      link: '/pools',
      text: t('pool'),
      id: 'pools-page-link',
    },
    {
      link: '/farm',
      text: t('farm'),
      id: 'farm-page-link',
    },
    {
      link: '/dragons',
      text: t('Staking'),
      id: 'dragons-page-link',
    },
  ];

  return (
    <Box className='header'>
      <WalletModal
        ENSName={ENSName ?? undefined}
        pendingTransactions={pending}
        confirmedTransactions={confirmed}
      />
      <Link to='/'>
        <img
          src={mobileWindowSize ? QuickIcon : QuickLogo}
          alt='QuickLogo'
          height={60}
        />
      </Link>
      {!tabletWindowSize && (
        <Box className='mainMenu'>
          {menuItems.map((val, index) => (
            <Link
              to={val.link}
              key={index}
              id={val.id}
              className={`menuItem ${
                pathname.indexOf(val.link) > -1 ? 'active' : ''
              }`}
            >
              <small>{val.text}</small>
            </Link>
          ))}
        </Box>
      )}
      {tabletWindowSize && (
        <Box className='mobileMenuContainer'>
          <Box className='mobileMenu'>
            {menuItems.slice(0, 4).map((val, index) => (
              <Link
                to={val.link}
                key={index}
                className={
                  pathname.indexOf(val.link) > -1 ? 'active' : 'menuItem'
                }
              >
                <small>{val.text}</small>
              </Link>
            ))}
            <Box className='flex menuItem'>
              <ThreeDotIcon
                onClick={() => setOpenDetailMenu(!openDetailMenu)}
              />
              {openDetailMenu && (
                <Box className='subMenuWrapper'>
                  <Box className='subMenu'>
                    {menuItems.slice(4, menuItems.length).map((val, index) => (
                      <Link
                        to={val.link}
                        key={index}
                        className='menuItem'
                        onClick={() => setOpenDetailMenu(false)}
                      >
                        <small>{val.text}</small>
                      </Link>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
      <Box>
        <Box className='headerIconWrapper'>
          <Box className='styledPollingDot' />
          <LightIcon />
        </Box>
        {account && (!ethereum || isSupportedNetwork(ethereum)) ? (
          <Box
            id='web3-status-connected'
            className='accountDetails'
            onClick={toggleWalletModal}
          >
            <p>{shortenAddress(account)}</p>
            <img src={WalletIcon} alt='Wallet' />
          </Box>
        ) : (
          <Box
            className={`connectButton ${
              ethereum && !isSupportedNetwork(ethereum)
                ? 'bg-error'
                : 'bg-primary'
            }`}
            onClick={() => {
              if (!ethereum || isSupportedNetwork(ethereum)) {
                toggleWalletModal();
              }
            }}
          >
            {ethereum && !isSupportedNetwork(ethereum)
              ? t('wrongNetwork')
              : t('connectWallet')}
            {ethereum && !isSupportedNetwork(ethereum) && (
              <Box className='wrongNetworkWrapper'>
                <Box className='wrongNetworkContent'>
                  <small>{t('switchWalletToPolygon')}</small>
                  <Box mt={2.5} onClick={addMaticToMetamask}>
                    {t('switchPolygon')}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
