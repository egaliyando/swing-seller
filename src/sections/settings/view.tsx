'use client';

import { Box, Tab, Tabs, Grid } from '@mui/material';

import { useTabs } from 'src/hooks/use-tabs';

import { DashboardContent } from 'src/layouts/dashboard';

import StoreInformation from './store-information';
import FullFilmentServices from './fullfilment-services';

export function SettingsView() {
  const settingsTab = useTabs('INFO');

  return (
    <DashboardContent maxWidth="xl">
      <Box>
        <Tabs sx={{ paddingBottom: 2 }} value={settingsTab.value} onChange={settingsTab.onChange}>
          {MENU.map((items) => (
            <Tab key={items.value} value={items.value} label={items.label} iconPosition="end" />
          ))}
        </Tabs>
        <Grid container spacing={1} justifyContent="start" alignItems="center">
          {settingsTab.value === 'INFO' ? <StoreInformation /> : <FullFilmentServices />}
        </Grid>
      </Box>
    </DashboardContent>
  );
}

const MENU = [
  { value: 'INFO', label: 'Store information' },
  { value: 'SERVICES', label: 'Fulfillment services' },
];
