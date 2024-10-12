'use client';

import { useState } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import { RatingTab } from './rating-tab';
import { DistributionTab } from './distribution-tab';

const OPTION = [
  { value: 1, label: 'Ratings distribution' },
  { value: 2, label: 'Ratings & reviews list' },
];

export function RatingView() {
  const [tab, setTab] = useState<number>(1);
  return (
    <DashboardContent maxWidth="xl">
      <Tabs
        value={tab}
        onChange={(event: React.SyntheticEvent, newValue: number) => setTab(newValue)}
        sx={{
          boxShadow: (theme) =>
            `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
        }}
      >
        {OPTION.map((option: { value: number; label: string }) => (
          <Tab key={option.value} iconPosition="end" value={option.value} label={option.label} />
        ))}
      </Tabs>
      <Box sx={{ position: 'relative' }}>{tab === 1 ? <DistributionTab /> : <RatingTab />}</Box>
    </DashboardContent>
  );
}
