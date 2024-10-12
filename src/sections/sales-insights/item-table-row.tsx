import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

type Props = {
  row: any;

  // onViewRow: () => void;
  // onSelectRow: () => void;
  // onDeleteRow: () => void;
};

export function SalesInsightsTableRow({ row }: Props) {
  const popover = usePopover();
  return (
    <TableRow hover>
      <TableCell>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar
            alt={row.name}
            src={row.Avatar}
            variant="rounded"
            sx={{ width: 36, height: 36, mr: 2 }}
          />

          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box component="span">{row.name}</Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              SKU - {}
            </Box>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell>{row.category}</TableCell>
      <TableCell>{row.condition}</TableCell>
      <TableCell>{row.stock}</TableCell>
      <TableCell>{row.sold}</TableCell>
      <TableCell>{row.price}</TableCell>
      <TableCell>
        <Label variant="soft" color="info">
          {row.status}
        </Label>
      </TableCell>
      <TableCell align="right" sx={{ px: 1 }}>
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>

      {/* <TableCell> {fCurrency(row.subtotal)} </TableCell> */}
    </TableRow>
  );
}
