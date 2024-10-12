import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { colors, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import axios from 'src/utils/axios';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

import EarningDetailPopup from './popup/earning-detail';
import WithDrawlDetailPopup from './popup/withdrawl-detail';

type Props = {
  row: any;
};

export function ItemTableRow({ row }: Props) {
  const popover = usePopover();

  const popupEarning = useBoolean();
  const popupWithdrawl = useBoolean();

  const [dataDetail, setDataDetail] = React.useState(null);

  const getBalanceDetail = async () => {
    const res = await axios.get(`/v1/partner/marketplace/balance/logs/${row?.id}`);
    if (res.status === 200) {
      setDataDetail(res?.data?.data?.shop_balance_logs);
      if (res?.data?.data?.shop_balance_logs?.amount_type === 'IN') {
        setTimeout(() => {
          popupEarning.onTrue();
        }, 500);
      } else {
        setTimeout(() => {
          popupWithdrawl.onTrue();
        }, 500);
      }
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Box component="span" sx={{ fontWeight: 700, fontSize: '12px' }}>
                {row.amount_type === 'IN' ? 'Item Sale' : 'Withdraw'}
              </Box>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                <Typography sx={{ color: colors.blue[500], fontWeight: 700, fontSize: '10px' }}>
                  {row.invoice}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </TableCell>
        <TableCell sx={{ fontSize: '12px' }}>{row?.date ?? '-'}</TableCell>
        <TableCell
          sx={{
            color: row.type === 'Withdraw' ? colors.red[500] : colors.green[500],
            fontWeight: 700,
            fontSize: '12px',
          }}
        >
          {row.amount}
        </TableCell>
        <TableCell>
          <Label
            variant={row.status === 'COMPLETED' ? 'filled' : 'soft'}
            color={
              row.status === 'COMPLETED'
                ? 'success'
                : row.status === 'Pending'
                  ? 'warning'
                  : 'error'
            }
          >
            {row.status}
          </Label>
        </TableCell>

        <TableCell
          onClick={getBalanceDetail}
          // onClick={row.type === 'Withdraw' ? popupWithdrawl.onTrue : popupEarning.onTrue}
          align="right"
          sx={{ px: 1 }}
        >
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="iconoir:nav-arrow-right" />
          </IconButton>
        </TableCell>
      </TableRow>
      <EarningDetailPopup row={dataDetail} show={popupEarning.value} close={popupEarning.onFalse} />
      <WithDrawlDetailPopup
        row={dataDetail}
        show={popupWithdrawl.value}
        close={popupWithdrawl.onFalse}
      />
    </>
  );
}
