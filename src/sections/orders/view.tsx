'use client';

import dayjs from 'dayjs';
import React, { useState } from 'react';
import debounce from 'debounce-promise';
import { useForm } from 'react-hook-form';
import { PulseLoader } from 'react-spinners';

import Table from '@mui/material/Table';
import {
  Box,
  Tab,
  Tabs,
  Grid,
  Card,
  colors,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Typography,
} from '@mui/material';

import { useTabs } from 'src/hooks/use-tabs';

import axios from 'src/utils/axios';

import { typography } from 'src/theme/core';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { SWButtonIcon } from 'src/components/button';
import { Scrollbar } from 'src/components/scrollbar';
import { Form, Field } from 'src/components/hook-form';
import { TableHeadCustom, TablePaginationCustom } from 'src/components/table';
import { useDateRangePicker, CustomDateRangePicker } from 'src/components/custom-date-range-picker';

import { ItemTableRow } from './item-table-row';
import { TABLE_HEAD, TABLE_DATA } from './default';

const debouncedGetData = debounce(axios.get, 1500);

type OptionType = {
  value: string;
  label: string;
};

export function OrderView() {
  const ordersTab = useTabs('All orders');

  const [selectedItems, setSelectedItems] = React.useState([]);
  const [filter, setFilter] = useState<any>({
    limit: 10,
    page: 1,
    status: '',
    // start_date: moment().format('YYYY-MM-DD'),
    // end_date: moment().format('YYYY-MM-DD'),
    q: '',
    shippings: '',
  });
  const [data, setData] = React.useState([]);
  const [statusLabel, setStatusLabel] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [shipping, setShipping] = useState<any>([]);

  const [isFetching, setIsFetching] = useState(false);

  const methods = useForm({
    defaultValues: {},
  });

  const { reset, handleSubmit } = methods;
  const rangeInputPicker: any = useDateRangePicker(dayjs(), dayjs());

  // Action Handler
  const handleSelect = (items: any) => {
    const _sel: any = [...selectedItems];
    const findExist = _sel.find((f: any) => f === items);

    if (findExist)
      _sel.forEach((item: any, index: number) => item === items && _sel.splice(index, 1));
    else _sel.push(items);

    setSelectedItems(_sel);
  };

  const handleCheckAll = (checked: boolean) => {
    let _sel: any = [...selectedItems];

    const all: any = TABLE_DATA.map((t: any) => t?.id);

    if (checked) _sel = all;
    else _sel = [];

    setSelectedItems(_sel);
  };

  const onChangeFilter = (name: string, value: any) => {
    const _filter: any = { ...filter };
    _filter[name] = value;
    if (name !== 'page' && name !== 'limit') {
      _filter.page = 1;
      _filter.limit = 10;
    }
    setFilter(_filter);
  };

  const onSubmit = handleSubmit(async (dataSubmit) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      console.info('DATA', dataSubmit);
    } catch (error) {
      console.error(error);
    }
  });

  // Fetch data
  const getData = async () => {
    setIsFetching(true);
    try {
      const res: any = await debouncedGetData('/v1/partner/marketplace/orders', { params: filter });
      setData(res?.data?.data?.orders);
      setTotalData(res?.data?.data?.total);
      setIsFetching(false);
    } catch (error) {
      console.log('error: ', error);
      setIsFetching(false);
    }
  };

  const getLabelStatus = async () => {
    try {
      const res: any = await axios.get('/v1/partner/marketplace/orders/labels');
      setStatusLabel(res?.data?.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const getShipping = async () => {
    try {
      const res: any = await axios.get('/v1/partner/marketplace/shipments');
      const opt: { label: string; value: any }[] = [];
      res?.data?.data.forEach((item: any) => {
        opt.push({ label: item?.name, value: item?.code });
      });
      setShipping(opt);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  React.useEffect(() => {
    getShipping();
  }, []);

  React.useEffect(() => {
    getData();
    getLabelStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // TAB Elements
  const renderTab = (items: any, index: number) => {
    const suffix = (
      <Box
        sx={{
          backgroundColor: colors.grey[200],
          color: colors.grey[600],
          borderRadius: 500,
          padding: 0.5,
        }}
      >
        <Typography sx={typography.caption}>{items.count}</Typography>
      </Box>
    );
    return (
      <Tab
        onClick={() => onChangeFilter('status', items?.filters?.join(','))}
        key={index}
        value={items.label}
        label={items.label}
        icon={suffix}
        iconPosition="end"
      />
    );
  };

  return (
    <DashboardContent maxWidth="xl">
      <Box>
        <Form methods={methods} onSubmit={onSubmit}>
          <Grid container spacing={1} justifyContent="space-between" alignItems="center">
            <Grid item xs={12} sm={2}>
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
                  // setFilter({
                  //   ...filter,
                  //   start_date: moment(rangeInputPicker?.startDate?.$d).format('YYYY-MM-DD'),
                  //   end_date: moment(rangeInputPicker?.endDate?.$d).format('YYYY-MM-DD'),
                  // });
                  rangeInputPicker.onClose();
                }}
                error={rangeInputPicker.error}
                variant="calendar"
              />
            </Grid>

            <Grid item xs={12} sm="auto">
              <SWButtonIcon icon={<Iconify icon="tdesign:download" />}>
                Download orders data
              </SWButtonIcon>
            </Grid>
          </Grid>
          <Tabs
            sx={{ paddingTop: 1.5, paddingBottom: 2 }}
            value={ordersTab.value}
            onChange={ordersTab.onChange}
          >
            {statusLabel.map((items, index) => renderTab(items, index))}
          </Tabs>
          <Grid
            container
            spacing={1}
            justifyContent={selectedItems?.length > 0 ? 'space-between' : 'start'}
            alignItems="center"
          >
            <Grid item sm={5}>
              {selectedItems?.length > 0 ? (
                <Typography variant="h5">{selectedItems?.length} orders selected</Typography>
              ) : (
                <Field.Text
                  name="keyword"
                  placeholder="Search order ID, buyer name, or item name"
                  onChange={(e: any) => onChangeFilter('q', e.target.value)}
                />
              )}
            </Grid>
            <Grid item sm={3}>
              {selectedItems?.length > 0 ? (
                <Button sx={{ float: 'right' }} variant="soft" color="secondary">
                  Accept order {selectedItems?.length > 1 ? '(s)' : ''}{' '}
                </Button>
              ) : (
                <Field.Autocomplete
                  name="fulfillment_method"
                  placeholder="Fulfillment method"
                  options={shipping}
                  getOptionLabel={(option: OptionType | undefined) => (option as OptionType).label}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                      {option.label}
                    </li>
                  )}
                  onChange={(e: any, v: any) => onChangeFilter('shippings', v?.value)}
                />
              )}
            </Grid>
          </Grid>
        </Form>
        <Card sx={{ mt: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <Scrollbar>
              <Table size="medium" sx={{ minWidth: 960, whiteSpace: 'nowrap' }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={6}
                  numSelected={selectedItems.length}
                  onSelectAllRows={
                    ordersTab.value === 'Pending' ? (checked) => handleCheckAll(checked) : undefined
                  }
                />

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

                  {data?.length === 0 && filter?.q?.length === 0 && !isFetching && (
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
                    data?.map((row: any, i) => (
                      <ItemTableRow
                        key={i}
                        row={row}
                        selected={selectedItems}
                        onSelectRow={() => handleSelect(row?.id)}
                        onDeleteRow={() => console.log(row.id)}
                        onViewRow={() => console.log(row.id)}
                        status={ordersTab.value}
                      />
                    ))}
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
    </DashboardContent>
  );
}
