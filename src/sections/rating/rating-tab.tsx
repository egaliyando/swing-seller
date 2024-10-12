'use client';

import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import TableBody from '@mui/material/TableBody';
import CircularProgress from '@mui/material/CircularProgress';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { SWButtonIcon } from 'src/components/button';
import { Form, Field } from 'src/components/hook-form';
import { TableHeadCustom, TablePaginationCustom } from 'src/components/table';
import { useDateRangePicker, CustomDateRangePicker } from 'src/components/custom-date-range-picker';

import { TABLE_HEAD, TABLE_DATA } from './default';
import { RatingTableRow } from './rating-table-row';

type OptionType = {
  value: string;
  label: string;
};

const OPTIONS = [{ value: 'option 1', label: 'Option 1' }];

export function RatingTab() {
  const rangeInputPicker = useDateRangePicker(dayjs(), dayjs());

  const methods = useForm({
    defaultValues: {},
  });

  const {
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        {isSubmitting && (
          <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
            <CircularProgress color="primary" />
          </Backdrop>
        )}
        <Grid
          container
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2, whiteSpace: 'nowrap' }}
        >
          <Grid item container xs={12} md={9} spacing={1}>
            <Grid item xs={12} sm={3}>
              <Field.Text name="keyword" placeholder="Find buyer or item name" />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Button
                variant="outlined"
                sx={{ py: 0.8 }}
                fullWidth
                size="medium"
                onClick={rangeInputPicker.onOpen}
              >
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
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field.Autocomplete
                name="sort"
                placeholder="Sort: recently created"
                options={OPTIONS}
                getOptionLabel={(option: OptionType | string) => (option as OptionType).label}
                isOptionEqualToValue={(option, value) => option.value === value}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field.Autocomplete
                name="sort"
                placeholder="Sort: recently created"
                options={OPTIONS}
                getOptionLabel={(option: OptionType | string) => (option as OptionType).label}
                isOptionEqualToValue={(option, value) => option.value === value}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={3}
            spacing={1}
            justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
          >
            <Grid item xs={12} sm="auto">
              <SWButtonIcon onClick={() => null} icon={<Iconify icon="solar:import-bold" />}>
                Download ratings & review data
              </SWButtonIcon>
            </Grid>
          </Grid>
        </Grid>
      </Form>
      <Card sx={{ mt: 2 }}>
        <Box sx={{ position: 'relative' }}>
          <Scrollbar>
            <Table size="medium" sx={{ minWidth: 960, whiteSpace: 'nowrap' }}>
              <TableHeadCustom headLabel={TABLE_HEAD} rowCount={10} />

              <TableBody>
                {TABLE_DATA.map((row) => (
                  <RatingTableRow
                    key={row.id}
                    row={row}
                  // onSelectRow={() => table.onSelectRow(row.id)}
                  // onDeleteRow={() => handleDeleteRow(row.id)}
                  // onViewRow={() => handleViewRow(row.id)}
                  />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </Box>
        <TablePaginationCustom
          page={1}
          count={1}
          rowsPerPage={10}
          onPageChange={() => null}
          onRowsPerPageChange={() => null}
        />
      </Card>
    </>
  );
}
