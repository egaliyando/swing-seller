'use client';

import { Controller, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Radio from '@mui/material/Radio';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Field } from 'src/components/hook-form';
import { TableHeadCustom } from 'src/components/table';

export function FormItemVariant() {
  const fookHook = useFormContext();

  const watchUseVariant = fookHook.watch('useVariant');
  return (
    <Card>
      <CardHeader title="Variants" sx={{ mb: 3 }} />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          sx={{
            gap: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              gap: 0.5,
              minWidth: 0,
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
            }}
          >
            <Link noWrap sx={{ color: 'text.primary', typography: 'subtitle2' }}>
              Enable item variants
            </Link>
            <Box sx={{ gap: 0.5, display: 'flex', typography: 'body2', color: 'text.secondary' }}>
              <Box component="span">
                Add variants so buyers can choose the right and specific product.
              </Box>
            </Box>
          </Box>
          <Controller
            name="useVariant"
            control={fookHook.control}
            render={({ field }) => (
              <FormControlLabel control={<Switch {...field} checked={field.value} />} label="" />
            )}
          />
        </Box>
      </Stack>

      {/*
       * todo buat ui sesuai figma
       */}
      {watchUseVariant && (
        <Stack spacing={3} sx={{ px: 3 }}>
          <TableVariant />
        </Stack>
      )}
    </Card>
  );
}

function createData(
  name: string,
  calories: string,
  fat: string,
  carbs: string,
  protein: string,
  a: string
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    a,
  };
}

const TABLE_DATA = [
  createData('9°', 'Black', '', '', '', ''),
  createData('9°', 'White', '', '', '', ''),
];
const TABLE_HEAD = [
  { id: 'dessert', label: 'Loft' },
  { id: 'calories', label: 'Color', align: 'right' },
  { id: 'fat', label: 'Price', align: 'right' },
  { id: 'carbs', label: 'Stock', align: 'right' },
  { id: 'protein', label: 'Active', align: 'right' },
  { id: 'protein', label: 'Default', align: 'right' },
];
function TableVariant() {
  return (
    <Table>
      <TableHeadCustom headLabel={TABLE_HEAD} />
      <TableBody>
        {TABLE_DATA.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">
              <Field.Text name="price" placeholder="Rp. Unit Price" />
              <Field.Text name="discount" placeholder="Rp. Disc Price" />
            </TableCell>
            <TableCell align="right">
              <Field.Text name="stock" placeholder="Stock" />
            </TableCell>
            <TableCell align="right">
              <Field.Checkbox name="checkbox" label="" />
            </TableCell>
            <TableCell align="right">
              <Radio name="radio" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
