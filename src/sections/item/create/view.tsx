'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Stack from '@mui/material/Stack';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Form } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import {
  FormItemSpecs,
  FormItemDetail,
  FormItemweight,
  FormItemVariant,
  FormItemInformation,
} from '../form';

export function ItemCreateView() {
  const methods = useForm<any>({ defaultValues: { condition: [], images: [] } });

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Add an item"
        links={[{ name: 'Items', href: paths.items }, { name: 'New item' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
          <FormItemInformation />
          <FormItemDetail />
          <FormItemSpecs />
          <FormItemVariant />
          <FormItemweight />
        </Stack>
      </Form>
    </DashboardContent>
  );
}
