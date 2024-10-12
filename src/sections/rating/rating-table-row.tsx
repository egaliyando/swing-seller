import type { DialogProps } from '@mui/material/Dialog';

import { useRef, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Dialog from '@mui/material/Dialog';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { useBoolean } from 'src/hooks/use-boolean';

import { varAlpha } from 'src/theme/styles';

type Props = {
  row: any;
};

export function RatingTableRow({ row }: Props) {
  const dialog = useBoolean();
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

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
  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }} onClick={handleClickOpen('paper')}>
        <TableCell>
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box
              component="span"
              sx={{
                display: 'block',
                fontWeight: 'bold',
                maxWidth: '200px', // Adjust this value as needed
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {row.name}
            </Box>
            <Box component="span" sx={{ color: 'text.disabled', display: 'block' }}>
              Loft : 9
            </Box>
          </Stack>
        </TableCell>
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar
              alt={row.name}
              src={row.Avatar}
              variant="rounded"
              sx={{ width: 36, height: 36, mr: 2 }}
            />
            <Rating name="read-only" value={row.star_ratings} readOnly />
            {row.star_ratings} stars
          </Stack>
        </TableCell>
        <TableCell
          sx={{
            maxWidth: '150px', // Adjust this value as needed
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {row.comment}
        </TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.given_by}</TableCell>
      </TableRow>
      <Dialog fullWidth maxWidth="sm" open={dialog.value} onClose={dialog.onFalse} scroll={scroll}>
        <DialogTitle sx={{ pb: 2 }}>Ratings & reviews details</DialogTitle>

        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
            <Card sx={{ mt: 3 }}>
              <Grid
                container
                spacing={1}
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  mt: 2,
                  whiteSpace: 'nowrap',
                  px: 2,
                  pb: 2,
                  borderBottom: (theme) =>
                    `solid 0.5px ${varAlpha(theme.vars.palette.primary.darkChannel, 0.24)}`,
                }}
              >
                <Grid item xs={12} sm={3} sx={{ display: 'block', fontWeight: 'bold' }}>
                  5 stars
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Stack spacing={2} direction="row" alignItems="center">
                    <Rating name="read-only" value={5} readOnly />
                  </Stack>
                </Grid>
              </Grid>

              <Grid
                sx={{
                  my: 1,
                  whiteSpace: 'nowrap',
                  px: 2,
                }}
                container
                spacing={1}
                justifyContent="space-between"
              >
                <Grid item xs={12} sm={4}>
                  <span className="text-small">Date & time given</span>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ justifyContent: 'end' }}>
                  <span className="text-small">03 Mar 2022, 06:00</span>
                </Grid>
              </Grid>
              <Grid
                sx={{
                  mb: 1,
                  whiteSpace: 'nowrap',
                  px: 2,
                }}
                container
                spacing={1}
                justifyContent="space-between"
              >
                <Grid item xs={12} sm={4}>
                  <span className="text-small">GIven by</span>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ justifyContent: 'end' }}>
                  <span className="text-small">Alvin Lianto</span>
                </Grid>
              </Grid>

              <Grid
                sx={{
                  my: 1,
                  whiteSpace: 'nowrap',
                  px: 2,
                }}
                container
                spacing={1}
              >
                <Grid item xs={12} sm={12}>
                  <span className="text-small">Item reviewed</span>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: 'capitalize', flexGrow: 1, color: 'blue' }}
                  >
                    DRIVER TAYLORMADE QI10 MAX SPEEDER NX BLUE US (24) GP #9 R {' > '}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
            <Card sx={{ mt: 2 }}>
              <Grid
                container
                spacing={1}
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  mt: 2,
                  whiteSpace: 'nowrap',
                  px: 2,
                  pb: 2,
                  borderBottom: (theme) =>
                    `solid 0.5px ${varAlpha(theme.vars.palette.primary.darkChannel, 0.24)}`,
                }}
              >
                <Grid item xs={12} sm={3} sx={{ display: 'block', fontWeight: 'bold' }}>
                  Comments
                </Grid>
              </Grid>
              <Grid
                sx={{
                  my: 1,

                  px: 2,
                }}
                container
                spacing={1}
              >
                <Grid item xs={12} sm={12}>
                  <Typography>
                    “I recently upgraded to this golf driver and I {`couldn't`} be happier! The
                    distance and accuracy improvements are remarkable.
                  </Typography>
                </Grid>
              </Grid>
            </Card>

            <Card sx={{ mt: 2 }}>
              <Grid
                container
                spacing={1}
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  mt: 2,
                  whiteSpace: 'nowrap',
                  px: 2,
                  pb: 2,
                  borderBottom: (theme) =>
                    `solid 0.5px ${varAlpha(theme.vars.palette.primary.darkChannel, 0.24)}`,
                }}
              >
                <Grid item xs={12} sm={3} sx={{ display: 'block', fontWeight: 'bold' }}>
                  Review photos
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ mb: 2, p: 2 }}>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      width: '100%',
                      height: 150,
                      backgroundColor: 'gray',
                      borderRadius: 1,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      width: '100%',
                      height: 150,
                      backgroundColor: 'gray',
                      borderRadius: 1,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      width: '100%',
                      height: 150,
                      backgroundColor: 'gray',
                      borderRadius: 1,
                    }}
                  />
                </Grid>
              </Grid>
            </Card>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={2}>
              <Button variant="outlined" onClick={dialog.onFalse}>
                Previous
              </Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button variant="outlined" onClick={dialog.onFalse}>
                Next
              </Button>
            </Grid>
            <Grid item xs={12} sm={8} container justifyContent="flex-end">
              <Button variant="contained" onClick={dialog.onFalse}>
                Done
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
