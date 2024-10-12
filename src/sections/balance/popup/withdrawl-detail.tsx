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

export interface IAppProps {
  show: boolean;
  close: () => void;
  row: any;
}

export default function WithdrawlDetailPopup(props: IAppProps) {
  const { show, close, row } = props;

  return (
    <Dialog fullWidth maxWidth="sm" open={show} onClose={close}>
      <DialogTitle>Withdraw details</DialogTitle>

      <DialogContent>
        {row?.status === 'PENDING' && (
          <Alert severity="info" variant="filled" color="info" sx={{ alignItems: 'center' }}>
            Fund transfer might take up to 2-3 business days to be completed.
          </Alert>
        )}
        <Paper variant="outlined" sx={{ padding: 2, marginTop: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4">Withdrawal</Typography>
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
            <Typography fontSize={12}>Date</Typography>
            <Typography fontSize={12}>22 Aug 202, 06:00 PM</Typography>
          </Box>
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontSize={12}>Account destination</Typography>
            <Typography fontSize={12}>1054859854 - Bank Central Asia (BCA)</Typography>
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontSize={12}>Available balance</Typography>
            <Typography fontSize={12}>Rp. 100,000,000</Typography>
          </Box>
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontSize={12}>Withdraw amount</Typography>
            <Typography fontSize={12}>(Rp. 100,000,000)</Typography>
          </Box>
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontSize={12}>Withdraw fee</Typography>
            <Typography fontSize={12}>(Rp. 5,000)</Typography>
          </Box>
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontSize={12}>Amount received</Typography>
            <Typography fontSize={12}>Rp. 99,995,000</Typography>
          </Box>
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontSize={12}>Ending balance</Typography>
            <Typography fontSize={12}>Rp. 400,000,000</Typography>
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
