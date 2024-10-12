/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import type { DialogProps } from '@mui/material/Dialog';
import type { Product, Products } from 'src/types/products';

import { useForm } from 'react-hook-form';
import { useRef, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import Backdrop from '@mui/material/Backdrop';
import TableBody from '@mui/material/TableBody';
import CircularProgress from '@mui/material/CircularProgress';

import { useBoolean } from 'src/hooks/use-boolean';

import axios from 'src/utils/axios';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { Form, Field } from 'src/components/hook-form';
import { EmptyContent } from 'src/components/empty-content';
import { SWButton, SWButtonIcon } from 'src/components/button';
import { useTable, TableHeadCustom, TablePaginationCustom } from 'src/components/table';

import { BulkView } from './bulk';
import { TABLE_HEAD } from './default';
import { FullScreenDialog } from './create';
import { ItemTableRow } from './item-table-row';

type OptionType = {
  value: string;
  label: string;
};

const OPTIONS = [{ value: 'option 1', label: 'Option 1' }];

export function ItemView({ categories }: { categories: OptionType[] }) {
  const table = useTable();
  const dialog = useBoolean();
  const dialogCreate = useBoolean();

  const methods = useForm<{ categoryIds: []; keyword: string }>({
    defaultValues: { categoryIds: [], keyword: '' },
  });
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
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

  const handleClickOpen = useCallback(
    (scrollType: DialogProps['scroll']) => () => {
      dialog.onTrue();
      setScroll(scrollType);
    },
    [dialog]
  );

  const descriptionElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (dialog.value) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement) {
        descriptionElement.focus();
      }
    }
  }, [dialog.value]);

  const [data, setData] = useState<Products>([]);

  const [pages, setPages] = useState<number>(0);

  /**
   * todo
   * setup ssr / redux
   */

  const categoryIds = watch('categoryIds');
  const keywordWatch = watch('keyword');
  const getProducts = async () => {
    try {
      const res = await axios.get(`/v1/partner/marketplace/products`, {
        params: {
          page: table.page + 1,
          limit: table.rowsPerPage,
          keyword: keywordWatch,
          category_ids: categoryIds.join(','),
        },
        // paramsSerializer: (params) =>
        //   // Mengubah parameter array jadi format yang diinginkan
        //   Object.keys(params)
        //     .map((key) => {
        //       if (Array.isArray(params[key])) {
        //         return params[key]
        //           .map((val: string | number) => `${key}[]=${encodeURIComponent(val)}`)
        //           .join('&');
        //       }
        //       return `${key}=${encodeURIComponent(params[key])}`;
        //     })
        //     .join('&'),
      });
      setData(res.data.data);

      setPages(res.data.pages);
      setPages(res.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [table.page, table.rowsPerPage, categoryIds]);

  return (
    <DashboardContent maxWidth="xl">
      <Form methods={methods} onSubmit={onSubmit}>
        {isSubmitting && (
          <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
            <CircularProgress color="primary" />
          </Backdrop>
        )}
        <Grid container spacing={1} justifyContent="space-between" alignItems="center">
          <Grid item container xs={12} md={8} spacing={1}>
            <Grid item xs={12} sm={4}>
              <Field.Text name="keyword" placeholder="Search item name" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field.MultiSelect
                name="categoryIds"
                placeholder="All categories"
                options={categories}
                chip
                checkbox
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
            md={4}
            spacing={1}
            justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
          >
            <Grid item xs={12} sm="auto">
              <SWButton type="button" onClick={handleClickOpen('paper')} variant="outlined">
                Bulk add items
              </SWButton>
              <BulkView
                dialog={dialog}
                scroll={scroll}
                descriptionElementRef={descriptionElementRef}
              />
            </Grid>
            <Grid item xs={12} sm="auto">
              <SWButtonIcon
                type="button"
                onClick={() => dialogCreate.onTrue()}
                icon={<Iconify icon="mingcute:add-line" />}
              >
                Add an item
              </SWButtonIcon>
              <FullScreenDialog dialog={dialogCreate} />
            </Grid>
          </Grid>
        </Grid>
      </Form>
      {data.length === 0 ? (
        <EmptyContent filled sx={{ py: 10, mt: 5, maxHeight: { md: 480 } }} />
      ) : (
        <Card sx={{ mt: 5 }}>
          <Box sx={{ position: 'relative' }}>
            <Scrollbar>
              <Table size="medium" sx={{ minWidth: 960, whiteSpace: 'nowrap' }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={pages}
                  numSelected={table.selected.length}
                  onSelectAllRows={(checked) => {
                    table.onSelectAllRows(
                      checked,
                      data.map((row) => row.id)
                    );
                  }}
                />

                <TableBody>
                  {data.map((row: Product) => (
                    <ItemTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      // onDeleteRow={() => handleDeleteRow(row.id)}
                      // onViewRow={() => handleViewRow(row.id)}
                    />
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>
          <TablePaginationCustom
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            count={pages}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      )}
    </DashboardContent>
    // Akhir dari Pemilihan
  );
}
