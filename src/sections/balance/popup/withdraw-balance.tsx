import * as React from 'react';
import { useForm } from 'react-hook-form';

import {
  Box,
  Paper,
  Button,
  Dialog,
  colors,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

type OptionType = {
  value: string;
  label: string;
};
export interface IAppProps {
  show: boolean;
  close: () => void;
}

export default function WithdrawBalancePopup(props: IAppProps) {
  const { show, close } = props;

  const [step, setStep] = React.useState(0);

  const methods = useForm({
    defaultValues: {},
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const summaryListClass = {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${colors.grey[200]}`,
    paddingBottom: 2,
    marginTop: 2,
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={show} onClose={close}>
      <DialogTitle>Withdraw balance</DialogTitle>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography
          fontWeight={step === 0 ? 700 : 500}
          color={step === 0 ? colors.blue[500] : colors.grey[500]}
        >
          Withdraw details
        </Typography>
        <Iconify icon="weui:arrow-filled" />
        <Typography
          fontWeight={step === 1 ? 700 : 500}
          color={step === 1 ? colors.blue[500] : colors.grey[500]}
        >
          Withdraw summary
        </Typography>
      </Box>

      <DialogContent>
        <Form methods={methods} onSubmit={onSubmit}>
          {step === 0 ? (
            <>
              {' '}
              <Paper variant="outlined" sx={{ padding: 2, marginTop: 2 }}>
                <Typography variant="h4" fontWeight={700}>
                  Withdraw details
                </Typography>
                <hr
                  style={{
                    border: `0.1px solid ${colors.grey[200]}`,
                    marginBottom: 25,
                    marginTop: 18,
                  }}
                />
                <Field.Text
                  InputProps={{ startAdornment: <Typography>Rp.</Typography> }}
                  label="Withdraw amount"
                  name="amount"
                  size="medium"
                />
                <Box marginTop={1} display="flex" alignItems="center" color="#8F90A6">
                  <Iconify width={14} icon="material-symbols:info-outline" />
                  <Typography marginLeft={0.5} fontSize="12px">
                    Available amount: Rp. 500,000,000
                  </Typography>
                </Box>
              </Paper>
              <Paper variant="outlined" sx={{ padding: 2, marginTop: 2 }}>
                <Typography variant="h4" fontWeight={700}>
                  Bank account details
                </Typography>
                <hr
                  style={{
                    border: `0.1px solid ${colors.grey[200]}`,
                    marginBottom: 25,
                    marginTop: 18,
                  }}
                />
                <Field.Autocomplete
                  label="Bank"
                  name="bank"
                  placeholder="Select bank"
                  options={[]}
                  getOptionLabel={(option: OptionType | string) => (option as OptionType).label}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  size="medium"
                  renderOption={(p, option) => (
                    <li {...p} key={option.value}>
                      {option.label}
                    </li>
                  )}
                />
                <Field.Text
                  InputLabelProps={{ shrink: true }}
                  sx={{ marginTop: 3 }}
                  label="Account number"
                  name="account_number"
                  placeholder="Enter account number"
                  size="medium"
                />
                <Field.Text
                  InputLabelProps={{ shrink: true }}
                  sx={{ marginTop: 3 }}
                  label="Account holder name"
                  name="account_number"
                  placeholder="Enter account holder name"
                  size="medium"
                />
              </Paper>
            </>
          ) : (
            <Paper variant="outlined" sx={{ padding: 2, marginTop: 2 }}>
              <Typography variant="h4" fontWeight={700}>
                Withdraw details
              </Typography>
              <hr
                style={{
                  border: `0.1px solid ${colors.grey[200]}`,
                  marginBottom: 25,
                  marginTop: 18,
                }}
              />
              <Box sx={summaryListClass}>
                <Typography>Available balance</Typography>
                <Typography>Rp. 500,000,000</Typography>
              </Box>
              <Box sx={summaryListClass}>
                <Typography>Withdraw amount</Typography>
                <Typography>(Rp. 100,000,000)</Typography>
              </Box>
              <Box sx={summaryListClass}>
                <Typography>Transfer fee</Typography>
                <Typography>(Rp. 5,000)</Typography>
              </Box>
              <Box sx={summaryListClass}>
                <Typography sx={{ fontWeight: 700 }}>Amount received</Typography>
                <Typography sx={{ fontWeight: 700 }}>Rp. 99,995,000</Typography>
              </Box>
              <Box sx={summaryListClass}>
                <Typography sx={{ fontWeight: 700 }}>Ending balance</Typography>
                <Typography sx={{ fontWeight: 700 }}>Rp. 400,000,000</Typography>
              </Box>
            </Paper>
          )}
        </Form>
      </DialogContent>

      <DialogActions>
        {step === 1 ? (
          <Box sx={{ width: '100%' }} display="flex" justifyContent="space-between">
            <Button variant="soft" onClick={() => setStep(0)} autoFocus>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setStep(0);
                close();
              }}
              autoFocus
            >
              Confirm & withdraw
            </Button>
          </Box>
        ) : (
          <Button variant="contained" onClick={() => setStep(1)} autoFocus>
            Continue
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
