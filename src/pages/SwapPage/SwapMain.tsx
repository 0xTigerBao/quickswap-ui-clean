import { Box } from '@material-ui/core';
import { ReactComponent as SettingsIcon } from 'assets/images/SettingsIcon.svg';
import { SettingsModal, Swap } from 'components';
import { useCurrency } from 'hooks/Tokens';
import useParsedQueryString from 'hooks/useParsedQueryString';
import React, { useState } from 'react';

const SwapMain: React.FC = () => {
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const parsedQuery = useParsedQueryString();
  const currency0 = useCurrency(
    parsedQuery && parsedQuery.currency0
      ? (parsedQuery.currency0 as string)
      : undefined,
  );
  const currency1 = useCurrency(
    parsedQuery && parsedQuery.currency1
      ? (parsedQuery.currency1 as string)
      : undefined,
  );

  return (
    <>
      {openSettingsModal && (
        <SettingsModal
          open={openSettingsModal}
          onClose={() => setOpenSettingsModal(false)}
        />
      )}
      <Box className={`flex flex-wrap items-center justify-between`}>
        <Box my={1} className='flex items-center'>
          <Box className='headingItem'>
            <span>Swap</span>
          </Box>
        </Box>
        <Box my={1} className='flex items-center'>
          <Box className='headingItem'>
            <SettingsIcon onClick={() => setOpenSettingsModal(true)} />
          </Box>
        </Box>
      </Box>
      <Box mt={3.5}>
        <Swap
          currency0={currency0 ?? undefined}
          currency1={currency1 ?? undefined}
        />
      </Box>
    </>
  );
};

export default SwapMain;
