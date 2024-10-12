import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import Image from 'next/image';
import { css } from '@emotion/react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Paper, Button, colors, Collapse, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import axios from 'src/utils/axios';

import { ProductPlacehoder } from 'src/assets/image';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import OrderPrintPopup from './popup/order-print';
import OrderTrackPopup from './popup/order-track';
import OrderDetailPopup from './popup/order-detail';
import OrderRejectPopup from './popup/order-reject';
import OrderCancelPopup from './popup/order-cancel';
import OrderChangeCourir from './popup/order-change-courir';

type Props = {
  row: any;
  selected?: any;
  onViewRow: () => void;
  onSelectRow: () => void;
  onDeleteRow: () => void;
  status: string;
};

export function ItemTableRow({
  row,
  selected,
  onViewRow,
  onSelectRow,
  onDeleteRow,
  status,
}: Props) {
  const [detailOrder, setDetailOrder] = React.useState({});
  const [isFetching, setIsFetching] = React.useState(false);
  console.log('detailOrder: ', detailOrder);

  const popover = usePopover();
  const collapsible = useBoolean();
  const dialogOrder = useBoolean();
  const dialogReject = useBoolean();
  const dialogCancel = useBoolean();
  const dialogPrint = useBoolean();
  const dialogChangeWritter = useBoolean();
  const dialogTrack = useBoolean();

  const isPending = row?.order_status === 'PAID' || row?.order_status === 'CREATED';
  const isCancelled = row?.order_status === 'CANCELED';
  const isCompleted = row?.order_status === 'COMPLETED';

  const isOnDelivery =
    row?.order_status === 'DELIVERED' ||
    row?.order_status === 'OTW' ||
    row?.order_status === 'COMPLAINT';

  const isToDeliver =
    row?.order_status === 'PROCESSED' ||
    row?.order_status === 'REQUEST_PICKUP' ||
    row?.order_status === 'REJECTED';

  const handleOrderDetail = async (type = 'detail') => {
    setIsFetching(true);
    const res = await axios.get(`/v1/partner/marketplace/orders/${row?.id}`);
    if (res.status === 200) {
      setDetailOrder(res.data?.data);
      setIsFetching(false);
      setTimeout(() => {
        if (type === 'track') dialogTrack.onTrue();
        else dialogOrder.onTrue();
      }, 300);
    } else {
      setIsFetching(false);
    }
  };

  return (
    <>
      {isFetching && (
        <Box
          sx={{
            position: 'fixed',
            width: '100%',
            height: '100vh',
            top: 0,
            left: 0,
            zIndex: 100,
            cursor: 'not-allowed',
          }}
        />
      )}
      <TableRow hover>
        {status === 'Pending' && (
          <TableCell padding="checkbox">
            <Checkbox
              checked={selected?.includes(row.id)}
              onClick={onSelectRow}
              inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
            />
          </TableCell>
        )}

        <TableCell
          onClick={() => handleOrderDetail('detail')}
          sx={{ color: colors.blue[500], fontWeight: 700, cursor: 'pointer' }}
        >
          {row.order_num}
        </TableCell>
        <TableCell sx={{ maxWidth: 250 }}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Box component="span" sx={{ fontWeight: 700 }}>
                {row?.user?.name}
              </Box>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                <Typography sx={{ whiteSpace: 'break-spaces' }}>{row?.user?.address}</Typography>
              </Box>
            </Stack>
          </Stack>
        </TableCell>
        <TableCell>{moment(row.order_date_fmt).format('HH:mm, DD MMM YYYY')}</TableCell>
        <TableCell>{row?.fulfillment_method}</TableCell>
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Box
              sx={{
                typography: 'body2',
                display: 'flex',
                alignItems: 'center',
                color: collapsible.value ? colors.blue[600] : colors.common.black,
              }}
            >
              <Box marginRight={2}>
                <Box component="span" sx={{ fontWeight: 700 }}>
                  {row?.items?.length} Items
                </Box>
                <Box component="span">
                  <Typography sx={{ whiteSpace: 'nowrap', fontSize: 14, fontWeight: 700 }}>
                    {row?.total_price}
                  </Typography>
                </Box>
              </Box>
              <Iconify
                onClick={collapsible.onToggle}
                icon={collapsible.value ? 'ep:arrow-up-bold' : 'ep:arrow-down-bold'}
                width={14}
              />
            </Box>
          </Stack>
        </TableCell>
        <TableCell>
          <Label
            variant={isCompleted ? 'filled' : 'soft'}
            color={isCompleted || isOnDelivery ? 'success' : isCancelled ? 'default' : 'warning'}
          >
            {row?.order_status_fmt}
          </Label>
          {isCancelled && (
            <Typography sx={labelStatus}>
              by {row?.order_status_fmt === 'Cancelled by Buyer' ? 'Buyer' : 'Seller'}
            </Typography>
          )}
        </TableCell>
        <TableCell align="right" sx={{ px: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {isOnDelivery && (
              <Button
                onClick={() => handleOrderDetail('track')}
                sx={{ width: 'max-content' }}
                variant="soft"
                color="primary"
              >
                Track delivery
              </Button>
            )}
            {isCompleted && (
              <Button
                onClick={() => handleOrderDetail('detail')}
                sx={{ width: 'max-content' }}
                variant="soft"
                color="primary"
              >
                See details
              </Button>
            )}
            {isCancelled && (
              <Button
                onClick={() => handleOrderDetail('detail')}
                sx={{ width: 'max-content' }}
                variant="soft"
                color="primary"
              >
                See details
              </Button>
            )}
            {isToDeliver && (
              <Button
                onClick={dialogPrint.onTrue}
                sx={{ width: 'max-content' }}
                variant="contained"
                color="primary"
              >
                Print label
              </Button>
            )}
            {isPending && (
              <Button sx={{ width: 'max-content' }} variant="contained" color="primary">
                Accept order
              </Button>
            )}

            {isPending && (
              <Box sx={{ display: 'flex', marginTop: 1, color: colors.red[500] }}>
                <Iconify width={14} icon="ph:clock-bold" />
                <Typography
                  sx={{ fontSize: 10, fontWeight: 700, textAlign: 'center', marginLeft: 0.2 }}
                >
                  {row?.auto_cancel ?? '-'}
                </Typography>
              </Box>
            )}
            {isToDeliver && (
              <Box sx={{ display: 'flex', marginTop: 1, color: colors.grey[500] }}>
                <Iconify width={14} icon="ph:clock-bold" />
                <Typography
                  sx={{ fontSize: 10, fontWeight: 700, textAlign: 'center', marginLeft: 0.2 }}
                >
                  {row?.auto_cancel?.length > 0 ? row?.auto_cancel : '-'}
                </Typography>
              </Box>
            )}
          </Box>
        </TableCell>
        <TableCell align="right" sx={{ px: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-horizontal-fill" />
          </IconButton>
        </TableCell>

        <CustomPopover
          open={popover.open}
          anchorEl={popover.anchorEl}
          onClose={popover.onClose}
          slotProps={{ arrow: { placement: 'right-top' } }}
        >
          <MenuList>
            <MenuItem
              onClick={() => {
                popover.onClose();
                handleOrderDetail('detail');
              }}
            >
              <Iconify icon="solar:eye-bold" />
              See order details
            </MenuItem>

            {isPending ||
              (row?.order_status === 'PROCESSED' && (
                <MenuItem
                  onClick={() => {
                    dialogChangeWritter.onTrue();
                    popover.onClose();
                  }}
                >
                  <Iconify icon="akar-icons:arrow-cycle" />
                  Change courier
                </MenuItem>
              ))}

            {row?.order_status !== 'PAID' && row?.order_status !== 'PROCESSED' && (
              <MenuItem
                onClick={() => {
                  dialogPrint.onTrue();
                  popover.onClose();
                }}
              >
                <Iconify icon="material-symbols:print" />
                Print label
              </MenuItem>
            )}

            <Divider sx={{ borderStyle: 'dashed' }} />
            {isPending || row?.order_status === 'PROCESSED' ? (
              <Box>
                {isPending ? (
                  <MenuItem
                    onClick={() => {
                      dialogReject.onTrue();
                      popover.onClose();
                    }}
                    sx={{ color: 'error.main' }}
                  >
                    <Iconify icon="carbon:close-outline" />
                    Reject order
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => {
                      dialogCancel.onTrue();
                      popover.onClose();
                    }}
                    sx={{ color: 'error.main' }}
                  >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    Cancel order
                  </MenuItem>
                )}
              </Box>
            ) : (
              ''
            )}
          </MenuList>
        </CustomPopover>
      </TableRow>
      {row?.items?.length
        ? row?.items?.map((item: any, i: number) => (
            <TableRow key={i}>
              <TableCell sx={{ py: 0 }} colSpan={9}>
                <Collapse in={collapsible.value} timeout="auto" unmountOnExit>
                  <Paper
                    sx={{
                      p: 2,
                      my: 2,
                      borderRadius: 1.5,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  >
                    <Stack sx={{ marginLeft: 16 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Image src={ProductPlacehoder.src} width={48} height={48} alt="" />
                        <Box sx={{ marginLeft: 2 }}>
                          <Typography component="div" sx={{ fontSize: 12, fontWeight: 700 }}>
                            {item?.name}
                          </Typography>
                          <Typography component="div" sx={{ fontSize: 10, color: 'text.disabled' }}>
                            {item?.sku}
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                    <Typography
                      component="div"
                      sx={{ marginRight: 5, fontSize: 12, color: 'text.disabled' }}
                    >
                      {item?.price_fmt} x1
                    </Typography>
                  </Paper>
                </Collapse>
              </TableCell>
            </TableRow>
          ))
        : null}

      <OrderDetailPopup row={detailOrder} show={dialogOrder.value} close={dialogOrder.onFalse} />
      <OrderRejectPopup row={row} show={dialogReject.value} close={dialogReject.onFalse} />
      <OrderPrintPopup row={row} show={dialogPrint.value} close={dialogPrint.onFalse} />
      <OrderCancelPopup row={row} show={dialogCancel.value} close={dialogCancel.onFalse} />
      <OrderChangeCourir
        row={row}
        show={dialogChangeWritter.value}
        close={dialogChangeWritter.onFalse}
      />
      <OrderTrackPopup row={detailOrder} show={dialogTrack.value} close={dialogTrack.onFalse} />
    </>
  );
}

const labelStatus = css`
  color: ${colors.grey[400]};
  text-align: 'start';
  margin-left: 7px;
  font-size: 10px;
`;
