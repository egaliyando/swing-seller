'use client';

import type { TransitionProps } from '@mui/material/transitions';

import { useForm } from 'react-hook-form';
import { useRef, useEffect, forwardRef } from 'react';

import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

import {
  FormItemSpecs,
  FormItemDetail,
  FormItemweight,
  FormItemVariant,
  FormItemInformation,
} from '../form';

// ----------------------------------------------------------------------

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

export function FullScreenDialog({ dialog }: any) {
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

  const descriptionElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (dialog.value) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement) {
        descriptionElement.focus();
      }
    }
  }, [dialog.value]);
  return (
    <>
      {/* <Button variant="outlined" color="error" onClick={dialog.onTrue}>
        Full screen dialogs
      </Button> */}

      <Dialog
        fullScreen
        open={dialog.value}
        onClose={dialog.onFalse}
        TransitionComponent={Transition}
      >
        <AppBar position="relative" color="default">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={dialog.onFalse}>
              <Iconify icon="mingcute:close-line" />
            </IconButton>

            <Typography variant="h6" sx={{ flex: 1, ml: 2 }} justifyContent="center">
              Add an item
            </Typography>

            <Button
              autoFocus
              color="inherit"
              variant="contained"
              sx={{ mr: 1 }}
              onClick={dialog.onFalse}
            >
              Save and add another
            </Button>
            <Button autoFocus color="inherit" variant="contained" onClick={dialog.onFalse}>
              Save item
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent dividers sx={{ mt: 2 }}>
          <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
            <Form methods={methods} onSubmit={onSubmit}>
              <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
                <FormItemInformation />
                <FormItemDetail />
                <FormItemSpecs />
                <FormItemVariant />
                <FormItemweight />
              </Stack>
            </Form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
