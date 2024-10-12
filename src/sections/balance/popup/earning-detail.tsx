import * as React from 'react';

import {
  Box,
  Paper,
  Alert,
  Button,
  colors,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

export interface IAppProps {
  show: boolean;
  close: () => void;
  row: any;
}

export default function EarningDetailPopup(props: IAppProps) {
  const { show, close, row } = props;
  console.log('row: ', row);

  return (
    <Dialog fullWidth maxWidth="sm" open={show} onClose={close}>
      <DialogTitle>Earning details</DialogTitle>

      <DialogContent>
        {row?.status === 'PENDING' && (
          <Alert severity="info" variant="filled" color="info" sx={{ alignItems: 'center' }}>
            Earnings will be completed and added to your balance once order has been confirmed and
            completed by the buyer.
          </Alert>
        )}
        <Paper variant="outlined" sx={{ padding: 2, marginTop: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4">{row?.transaction_type}</Typography>
              <Typography sx={{ color: colors.blue[500], fontWeight: 700, fontSize: '12px' }}>
                {row?.invoice_number}
              </Typography>
            </Box>
            <Label
              variant={row?.status === 'COMPLETED' ? 'filled' : 'soft'}
              color={
                row?.status === 'COMPLETED' || row?.status === 'On delivery'
                  ? 'success'
                  : row?.status === 'Cancelled'
                    ? 'default'
                    : 'warning'
              }
            >
              {row?.status}
            </Label>
          </Box>

          <hr
            style={{ border: `0.1px solid ${colors.grey[200]}`, marginBottom: 20, marginTop: 18 }}
          />

          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontSize={12}>Item subtotal</Typography>
            <Typography fontSize={12}>Rp. 15,490,000</Typography>
          </Box>
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontSize={12}>Delivery fee</Typography>
            <Typography fontSize={12}>Rp. 10,000</Typography>
          </Box>
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontSize={12}>Delivery fee paid to courier</Typography>
            <Typography fontSize={12}>-Rp. 10,000</Typography>
          </Box>

          <hr style={{ border: `0.1px solid ${colors.grey[200]}` }} />

          <Box
            sx={{
              marginBottom: 2,
              marginTop: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontSize={14} fontWeight={700}>
              {row?.status === 'Pending' ? 'Estimated total earned' : 'Total earned'}{' '}
            </Typography>
            <Typography fontSize={14} fontWeight={700}>
              Rp. 15,490,000
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Iconify color={colors.grey[400]} icon="material-symbols:info-outline" />
            <Typography fontSize={12} marginLeft={1} fontWeight={600} color={colors.grey[400]}>
              Before the order is completed, the estimated total earned can still change according
              to the order conditions.
            </Typography>
          </Box>
        </Paper>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={close} autoFocus>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
