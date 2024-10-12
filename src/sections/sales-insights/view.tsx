/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import type { DashboardChart, DashboardSummary } from 'src/types/dashboards';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import { Box, Card, Grid, Stack, Table, Divider, TableBody, Typography } from '@mui/material';

import axios from 'src/utils/axios';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { SWButtonIcon } from 'src/components/button';
import { Scrollbar } from 'src/components/scrollbar';
import { Form, Field } from 'src/components/hook-form';
import { TableHeadCustom, TablePaginationCustom } from 'src/components/table';

import { ChartLine } from './chart-line';
import { TABLE_HEAD, TABLE_DATA } from './default';
import { InvoiceAnalytic } from './invoice-analytic';
import { SalesInsightsTableRow } from './item-table-row';

export function SalesInsightsView() {
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

  const [summary, setSummary] = useState<DashboardSummary>({} as DashboardSummary);

  const getSummary = async () => {
    try {
      // mp_shop_id dari mana
      const res = await axios.get(
        `/v1/partner/marketplace/analytics?mp_shop_id=3167e195-1095-4544-8827-4bb30a2ed9c1&days=30`
      );
      setSummary(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSummary();
  }, []);

  // State untuk setiap kategori
  const [chartConversion, setChartConversion] = useState<DashboardChart>({} as DashboardChart);
  const [chartShopVisit, setChartShopVisit] = useState<DashboardChart>({} as DashboardChart);
  const [chartRevenue, setChartRevenue] = useState<DashboardChart>({} as DashboardChart);
  const [chartPageViews, setChartPageViews] = useState<DashboardChart>({} as DashboardChart);

  // Fungsi untuk memanggil API berdasarkan kategori
  const getChart = async (
    category: string,
    setter: React.Dispatch<React.SetStateAction<DashboardChart>>
  ) => {
    try {
      const res = await axios.get(
        `/v1/partner/marketplace/analytics/chart?mp_shop_id=3167e195-1095-4544-8827-4bb30a2ed9c1&days=30&category=${category}`
      );
      setter(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Memanggil API untuk setiap kategori
  useEffect(() => {
    getChart('conversion_paid_orders', setChartConversion);
    getChart('shop_visit_count', setChartShopVisit);
    getChart('revenue', setChartRevenue);
    getChart('product_detail_page_views', setChartPageViews);
  }, []);

  // Fungsi untuk memformat tanggal ke format 'dd/mm' (buatkan utils)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  type ChartItem = {
    date: string;
    conversion_paid_orders?: number;
    shop_visit_count?: number;
    revenue?: number;
    product_detail_page_views?: number;
  };

  const getChartData = (
    chartData: DashboardChart | null,
    chartName: string,
    category: keyof ChartItem
  ) => {
    if (!chartData || !chartData.chart) {
      return { categories: [], series: [] }; // Return empty data if chartData is not available
    }

    return {
      categories: chartData.chart.map((item) => formatDate(item.date)),
      series: [
        {
          name: chartName,
          data: chartData.chart
            .map((item) => item[category])
            .filter((value): value is number => typeof value === 'number'),
        },
      ],
    };
  };

  return (
    <DashboardContent maxWidth="xl">
      <Form methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={1} justifyContent="space-between" alignItems="center">
          <Grid item container xs={12} md={8} spacing={1}>
            <Grid item xs={12} sm={4}>
              <Field.Text name="keyword" placeholder="Last 30 days" />
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={4}
            spacing={1}
            justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
          >
            <Grid item xs={12} sm="auto">
              <SWButtonIcon onClick={() => null} icon={<Iconify icon="mingcute:add-line" />}>
                Download data
              </SWButtonIcon>
            </Grid>
          </Grid>
        </Grid>
      </Form>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item>
          <Typography gutterBottom variant="h4">
            Statistical summary
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item>
          <Typography gutterBottom variant="body2">
            Regularly monitor your store performance to increase your sales.
          </Typography>
        </Grid>
      </Grid>

      {/* summary */}
      <Card sx={{ mb: { xs: 3, md: 5 }, mt: 2 }}>
        <Scrollbar sx={{ minHeight: 108 }}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
            sx={{ py: 2 }}
          >
            <InvoiceAnalytic
              title="Item page views"
              subTitle={`${summary?.start?.product_detail_page_views} views`}
              progress={`-11.2% from the last ${summary.diff_in_days} days`}
            />
            <InvoiceAnalytic
              title="Conversion"
              subTitle={`${summary?.start?.conversion_paid_orders} %`}
              progress={`+12.3% from the last ${summary.diff_in_days} days`}
            />
            <InvoiceAnalytic
              title="Orders"
              subTitle={`${summary?.start?.revenue} Orders`}
              progress={`-5.4% from the last ${summary.diff_in_days} days`}
            />
          </Stack>
        </Scrollbar>
      </Card>

      {/*  chart conversion trend */}
      <Card sx={{ mb: { xs: 3, md: 5 }, mt: 2 }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
          sx={{ py: 2 }}
        >
          <Stack
            spacing={2.5}
            direction="row"
            alignItems="center"
            sx={{ width: 1, minWidth: 200, px: 2 }}
          >
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">Conversion trend</Typography>

              <Box component="span" sx={{ color: 'text.disabled', typography: 'body2' }}>
                {chartConversion?.summary?.start?.conversion_paid_orders} %
              </Box>

              <Typography variant="subtitle2">
                +12.3% from the last {chartConversion?.summary?.diff_in_days} days
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <ChartLine
          chart={getChartData(chartConversion, 'Conversion Paid Orders', 'conversion_paid_orders')}
        />
      </Card>
      <Card sx={{ mb: { xs: 3, md: 5 }, mt: 2 }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
          sx={{ py: 2 }}
        >
          <Stack
            spacing={2.5}
            direction="row"
            alignItems="center"
            sx={{ width: 1, minWidth: 200, px: 2 }}
          >
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">Orders trend</Typography>

              <Box component="span" sx={{ color: 'text.disabled', typography: 'body2' }}>
                {chartPageViews?.summary?.start?.product_detail_page_views} % orders
              </Box>

              <Typography variant="subtitle2">
                -5.4% from the last {chartPageViews?.summary?.diff_in_days} days
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <ChartLine
          chart={getChartData(chartPageViews, 'Orders trend', 'product_detail_page_views')}
        />
      </Card>
      <Card sx={{ mb: { xs: 3, md: 5 }, mt: 2 }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
          sx={{ py: 2 }}
        >
          <Stack
            spacing={2.5}
            direction="row"
            alignItems="center"
            sx={{ width: 1, minWidth: 200, px: 2 }}
          >
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">Item page views trend</Typography>

              <Box component="span" sx={{ color: 'text.disabled', typography: 'body2' }}>
                {chartShopVisit?.summary?.start?.shop_visit_count} views
              </Box>

              <Typography variant="subtitle2">
                -11.2% from the last {chartShopVisit?.summary?.diff_in_days} days
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <ChartLine
          chart={getChartData(chartShopVisit, 'Item page views trend', 'shop_visit_count')}
        />
      </Card>

      <Typography variant="h4">Performance graph</Typography>

      <Card sx={{ mb: { xs: 3, md: 5 }, mt: 2 }}>
        <Card sx={{ mb: { xs: 3, md: 5 }, mt: 2, mx: 2 }}>
          <Scrollbar sx={{ minHeight: 108 }}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <InvoiceAnalytic
                title="New net earnings"
                subTitle="Rp. 450,000,000"
                progress="+24.5% from the last 30 days"
              />
              <InvoiceAnalytic
                title="Items sold"
                subTitle="1,762 sold"
                progress="-11.2% from the last 30 days"
              />
              <InvoiceAnalytic
                subTitle="Items viewed"
                title="19,000 views"
                progress="+12.3% from the last 30 days"
              />
              <InvoiceAnalytic
                subTitle="Conversion"
                title="11.76%"
                progress="-5.4% from the last 30 days"
              />
              <InvoiceAnalytic
                subTitle="Added to cart"
                title="5,345 in cart"
                progress="-5.4% from the last 30 days"
              />
            </Stack>
          </Scrollbar>
        </Card>

        <ChartLine
          chart={{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            series: [{ name: 'Series A', data: [32, 40, 28, 42, 64, 72, 56, 80, 100] }],
          }}
        />
      </Card>
      <Typography variant="h4">Items performance list</Typography>
      <Form methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={1} justifyContent="space-between" alignItems="center">
          <Grid item container xs={12} md={8} spacing={1}>
            <Grid item xs={12} sm={4}>
              <Field.Text name="keyword" placeholder="Search item name" />
            </Grid>
          </Grid>
        </Grid>
      </Form>
      <Card sx={{ mt: 3 }}>
        <Box sx={{ position: 'relative' }}>
          <Scrollbar>
            <Table size="medium" sx={{ minWidth: 960, whiteSpace: 'nowrap' }}>
              <TableHeadCustom headLabel={TABLE_HEAD} rowCount={10} />

              <TableBody>
                {TABLE_DATA.map((row, i) => (
                  <SalesInsightsTableRow
                    key={i}
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
    </DashboardContent>
  );
}
