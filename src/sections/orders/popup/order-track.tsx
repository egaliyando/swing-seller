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

export interface IAppProps {
  show: boolean;
  close: () => void;
  row: any;
}

export default function OrderTrackPopup(props: IAppProps) {
  const { show, close, row } = props;

  return (
    <Dialog fullWidth maxWidth="sm" open={show} onClose={close}>
      <DialogTitle>Track delivery status</DialogTitle>

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
            <Typography fontSize={12}>Estimated time arrival</Typography>
            <Typography fontSize={12}>22-24 Aug 2024</Typography>
          </Box>
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontSize={12}>Method</Typography>
            <Typography width={250} textAlign="right" fontSize={12}>
              {row?.fulfillment_method}
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
            <Typography fontSize={12}>Tracking number</Typography>
            <Typography fontSize={12}>SPX193NGTY6BU</Typography>
          </Box>
        </Paper>
        <Paper variant="outlined" sx={{ padding: 2, marginTop: 2 }}>
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
