'use client';

import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { useDateRangePicker, CustomDateRangePicker } from 'src/components/custom-date-range-picker';

import { AverageRating } from './average-rating';
import { ChartColumnSingle } from './chart-column-single';

// import { EmptyContent } from 'src/components/empty-content';

export function DistributionTab() {
  const rangeInputPicker = useDateRangePicker(dayjs(), dayjs());

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <Button sx={{ py: 1 }} variant="outlined" size="medium" onClick={rangeInputPicker.onOpen}>
          {rangeInputPicker.shortLabel}
        </Button>

        <CustomDateRangePicker
          variant="calendar"
          title="Choose due date"
          open={rangeInputPicker.open}
          startDate={rangeInputPicker.startDate}
          endDate={rangeInputPicker.endDate}
          onChangeStartDate={rangeInputPicker.onChangeStartDate}
          onChangeEndDate={rangeInputPicker.onChangeEndDate}
          onClose={rangeInputPicker.onClose}
          error={rangeInputPicker.error}
        />
      </Box>
      {/*
       * logic render table and empty
       */}
      <Box sx={{ mt: 2 }}>
        <Card sx={{ mb: { xs: 3, md: 5 }, background: '#FFF9EE' }}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
            sx={{ py: 2 }}
          >
            <AverageRating title="Average ratings" subTitle="4.9 stars from 132 reviews" />
          </Stack>
        </Card>
        <Card sx={{ mb: { xs: 3, md: 5 } }}>
          <ChartColumnSingle
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [{ data: [32, 40, 28, 42, 64, 72, 56, 80, 100] }],
            }}
          />
        </Card>
        {/* <EmptyContent filled sx={{ py: 10, maxHeight: { md: 480 } }} /> */}
      </Box>
    </>
  );
}
