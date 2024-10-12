'use client';

import React from 'react';
import dayjs from 'dayjs';
import moment from 'moment';
import debounce from 'debounce-promise';
import { useForm } from 'react-hook-form';
import { PulseLoader } from 'react-spinners';

import Table from '@mui/material/Table';
import {
  Box,
  Grid,
  Card,
  colors,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Typography,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import axios from 'src/utils/axios';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { SWButtonIcon } from 'src/components/button';
import { Scrollbar } from 'src/components/scrollbar';
import { Form, Field } from 'src/components/hook-form';
import { TableHeadCustom, TablePaginationCustom } from 'src/components/table';
import { useDateRangePicker, CustomDateRangePicker } from 'src/components/custom-date-range-picker';

import { ItemTableRow } from './item-table-row';
import WithdrawBalancePopup from './popup/withdraw-balance';
import { TABLE_HEAD, TRANSACTION_TYPE_OPTIONS } from './default';

const debouncedGetData = debounce(axios.get, 1500);

type OptionType = {
  value: string;
  label: string;
};

export function BalanceView() {
  const popupWithdraw = useBoolean();

  const [filter, setFilter] = React.useState<any>({
    limit: 10,
    page: 1,
    status: '',
    // start_date: moment().format('YYYY-MM-DD'),
    // end_date: moment().format('YYYY-MM-DD'),
  });
  const [data, setData] = React.useState([]);
  const [totalData, setTotalData] = React.useState(0);
  const [isFetching, setIsFetching] = React.useState(false);
  const [balance, setBalance] = React.useState<any>(null);

  const methods = useForm({
    defaultValues: {},
  });

  const { reset, handleSubmit } = methods;

  const onChangeFilter = (name: string, value: any) => {
    const _filter: any = { ...filter };
    _filter[name] = value;
    if (name !== 'page' && name !== 'limit') {
      _filter.page = 1;
      _filter.limit = 10;
    }
    setFilter(_filter);
  };

  const onSubmit = handleSubmit(async (value: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      console.info('DATA', value);
    } catch (error) {
      console.error(error);
    }
  });

  const rangeInputPicker: any = useDateRangePicker(dayjs(), dayjs());

  // Fetch data
  const getData = async () => {
    setIsFetching(true);
    try {
      const res: any = await debouncedGetData('/v1/partner/marketplace/balance/logs', {
        params: filter,
      });
      setData(res?.data?.data?.shop_balance_logs);
      setTotalData(res?.data?.data?.total);
      setIsFetching(false);
    } catch (error) {
      console.log('error: ', error);
      setIsFetching(false);
    }
  };

  const getBalance = async () => {
    setIsFetching(true);
    try {
      const res: any = await axios.get('/v1/partner/marketplace/balance');
      setBalance(res?.data?.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  React.useEffect(() => {
    getData();
    getBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <DashboardContent maxWidth="xl">
      <Box>
        <Form methods={methods} onSubmit={onSubmit}>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h4">Active balance:</Typography>
            <Typography variant="h4" color={colors.blue[500]} marginLeft={1}>
              {balance?.balance_fmt}
            </Typography>
          </Box>
          <Typography variant="body1" color={colors.grey[500]} marginY={1}>
            This is where all funds from finished orders are stored safely. <br />
            Easily see how many balance you have left, make transfers, and look back on past
            transfers.
          </Typography>
          <Grid
            marginTop={2}
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item sm={6} container justifyContent="start">
              <Grid item sm="auto">
                <Button
                  variant="outlined"
                  sx={{ py: 0.8, width: 'max-content' }}
                  size="medium"
                  onClick={rangeInputPicker.onOpen}
                >
                  {rangeInputPicker.label}
                </Button>

                <CustomDateRangePicker
                  open={rangeInputPicker.open}
                  startDate={rangeInputPicker.startDate}
                  endDate={rangeInputPicker.endDate}
                  onChangeStartDate={rangeInputPicker.onChangeStartDate}
                  onChangeEndDate={rangeInputPicker.onChangeEndDate}
                  onClose={() => {
                    setFilter({
                      ...filter,
                      start_date: moment(rangeInputPicker?.startDate?.$d).format('YYYY-MM-DD'),
                      end_date: moment(rangeInputPicker?.endDate?.$d).format('YYYY-MM-DD'),
                    });
                    rangeInputPicker.onClose();
                  }}
                  error={rangeInputPicker.error}
                  variant="calendar"
                />
              </Grid>
              <Grid item sm={5} marginLeft={2}>
                <Field.Autocomplete
                  name="trx_type"
                  placeholder="Transaction type"
                  options={TRANSACTION_TYPE_OPTIONS}
                  getOptionLabel={(option: OptionType | string) => (option as OptionType).label}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                      {option.label}
                    </li>
                  )}
                />
              </Grid>
            </Grid>
            <Grid item sm={6} container justifyContent="end">
              <Grid item xs={5} sm="auto" marginRight={2}>
                <SWButtonIcon icon={<Iconify icon="tdesign:download" />}>
                  Download withdraw data
                </SWButtonIcon>
              </Grid>
              <Grid item xs={2} sm="auto">
                <SWButtonIcon onClick={popupWithdraw.onTrue} variant="soft">
                  Withdraw balance
                </SWButtonIcon>
              </Grid>
            </Grid>
          </Grid>
        </Form>
        <Card sx={{ mt: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <Scrollbar>
              <Table size="medium" sx={{ minWidth: 960, whiteSpace: 'nowrap' }}>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {isFetching && (
                    <TableRow>
                      <TableCell colSpan={9}>
                        <Box textAlign="center" paddingY={10}>
                          <PulseLoader color={colors.blue[500]} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}

                  {data?.length === 0 && !isFetching && (
                    <TableRow>
                      <TableCell colSpan={9}>
                        <Box textAlign="center" paddingY={10}>
                          <Typography color={colors.grey[400]}>Empty</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}

                  {data?.length > 0 &&
                    !isFetching &&
                    data?.map((row: any, i) => <ItemTableRow key={i} row={row} />)}
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>
          {!isFetching && (
            <TablePaginationCustom
              page={filter.page - 1}
              count={totalData}
              rowsPerPage={filter.limit}
              onPageChange={(val, page) => onChangeFilter('page', page + 1)}
              onRowsPerPageChange={(e: any) => onChangeFilter('limit', e.target.value)}
            />
          )}
        </Card>
      </Box>
      <WithdrawBalancePopup show={popupWithdraw.value} close={popupWithdraw.onFalse} />
    </DashboardContent>
  );
}
