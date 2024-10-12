import * as React from 'react';

import {
  Box,
  Step,
  Paper,
  Button,
  colors,
  Dialog,
  Stepper,
  StepLabel,
  Typography,
  DialogTitle,
  StepContent,
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

export default function OrderDetailPopup(props: IAppProps) {
  const { show, close, row } = props;

  return (
    <Dialog fullWidth maxWidth="sm" open={show} onClose={close}>
      <DialogTitle>Order details</DialogTitle>

      <DialogContent>
        <Paper variant="outlined" sx={{ padding: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4">Order {row?.order_num}</Typography>
            <Label
              variant={row.order_status_fmt === 'Completed' ? 'filled' : 'soft'}
              color={
                row.order_status_fmt === 'Completed' || row.order_status_fmt === 'On delivery'
                  ? 'success'
                  : row.order_status_fmt === 'Cancelled'
                    ? 'default'
                    : 'warning'
              }
            >
              {row.order_status_fmt}
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
            <Typography fontSize={12}>Fulfillment method</Typography>
            <Typography fontSize={12}>{row?.fulfillment_method}</Typography>
          </Box>
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontSize={12}>Destination address</Typography>
            <Typography width={250} textAlign="right" fontSize={12}>
              {row?.user?.address}
            </Typography>
          </Box>
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontSize={12}>Invoice</Typography>
            <Typography color={colors.blue[500]} fontSize={12}>
              {row?.invoice}
            </Typography>
          </Box>
          <hr style={{ border: `0.1px solid ${colors.grey[200]}` }} />

          {row?.summary?.details?.length &&
            row?.summary?.details?.map((summary: any, index: number) => (
              <Box
                key={index}
                sx={{
                  marginBottom: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography fontSize={12}>{summary?.title}</Typography>
                <Typography fontSize={12}>{summary?.value}</Typography>
              </Box>
            ))}

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
              Estimated total earned
            </Typography>
            <Typography fontSize={14} fontWeight={700}>
              {row?.est_total_earned}
            </Typography>
          </Box>
          <Box
            sx={{
              color: colors.grey[500],
              marginBottom: 2,
              marginTop: 3,
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
            }}
          >
            <Iconify width={24} icon="material-symbols-light:info-outline" />
            <Typography width={400} fontSize={14} fontWeight={400} marginLeft={1}>
              Before the order is completed, the estimated total earned can still change according
              to the order conditions.
            </Typography>
          </Box>
        </Paper>
        <Paper variant="outlined" sx={{ padding: 2, marginTop: 2 }}>
          <Typography variant="h4" marginBottom={1}>
            Status history
          </Typography>

          <Stepper orientation="vertical">
            {row?.histories?.map((step: any) => (
              <Step key={step.label}>
                <StepLabel>{step.description}</StepLabel>
                <StepContent>
                  <Typography color={colors.grey[500]} fontSize={12}>
                    {step.time_fmt}
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
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
