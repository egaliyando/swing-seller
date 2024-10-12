'use client';

import { useState } from 'react';

import {
  Tab,
  Box,
  Tabs,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import { varAlpha } from 'src/theme/styles';

import { SWButton } from 'src/components/button';

import { ItemsWithVariants } from './items-with-variants';
import { ItemsWithoutVariants } from './items-without-variants';

const OPTION = [
  { value: 1, label: 'Items without variants' },
  { value: 2, label: 'Items with variants' },
];

export function BulkView({ dialog, scroll, descriptionElementRef }: any) {
  const [tab, setTab] = useState<number>(1);

  const [step, setStep] = useState<number>(1);
  return (
    <Dialog fullWidth maxWidth="sm" open={dialog.value} onClose={dialog.onFalse} scroll={scroll}>
      <DialogTitle sx={{ pb: 2, borderBottom: '0.5px solid' }}>Bulk add items</DialogTitle>

      <DialogContent dividers={scroll === 'paper'}>
        <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
          <Tabs
            value={tab}
            onChange={(event: React.SyntheticEvent, newValue: number) => {
              setTab(newValue);
              setStep(1);
            }}
            sx={{
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {OPTION.map((option: { value: number; label: string }) => (
              <Tab
                key={option.value}
                iconPosition="end"
                value={option.value}
                label={option.label}
              />
            ))}
          </Tabs>
          <Box sx={{ position: 'relative' }}>
            {tab === 1 ? <ItemsWithoutVariants step={step} /> : <ItemsWithVariants step={step} />}
          </Box>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        {/* {step === 1 && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} container justifyContent="flex-end">
              <SWButton type="button" onClick={() => setStep(2)} variant="contained">
                Continue to upload
              </SWButton>
            </Grid>
          </Grid>
        )}
        {step === 2 && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={2}>
              <SWButton variant="outlined">Previous</SWButton>
            </Grid>
            <Grid item xs={12} sm={12} container>
              <SWButton type="button" onClick={() => setStep(2)} variant="contained">
                Continue to upload
              </SWButton>
            </Grid>
          </Grid>
        )} */}

        <Grid container spacing={1}>
          {step === 1 && (
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} container justifyContent="flex-end">
                <SWButton type="button" onClick={() => setStep(2)} variant="contained">
                  Continue to upload
                </SWButton>
              </Grid>
            </Grid>
          )}
          {step === 2 && (
            <>
              <Grid item xs={12} sm={2}>
                <SWButton type="button" variant="outlined" onClick={() => setStep(1)}>
                  Previous
                </SWButton>
              </Grid>

              <Grid item xs={12} sm={10} container justifyContent="flex-end">
                <SWButton type="button" onClick={() => setStep(2)} variant="contained">
                  Add items to list
                </SWButton>
              </Grid>
            </>
          )}
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
