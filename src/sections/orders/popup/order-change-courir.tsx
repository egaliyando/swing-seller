import * as React from 'react';
import { useForm } from 'react-hook-form';

import { Box, Grid, Paper, Button, colors, Dialog, Typography, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';



export interface IAppProps {
    show: boolean,
    close: () => void,
    row: any
}

type OptionType = {
    value: string;
    label: string;
};

const OPTIONS_COURIR = [{ value: 'option 1', label: 'Option 1' }];


export default function OrderChangeCourir(props: IAppProps) {
    const { show, close, row } = props
    const methods = useForm({
        defaultValues: {},
    });

    const {
        reset,
        handleSubmit,
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

        <Dialog fullWidth maxWidth="sm" open={show} onClose={close}>
            <DialogTitle>Change courier</DialogTitle>

            <DialogContent>
                <Paper variant='outlined' sx={{ padding: 2 }}>
                    <Typography variant='h4'>Enter new courier and delivery details</Typography>
                    <hr style={{ border: `0.1px solid ${colors.grey[200]}`, marginBottom: 20, marginTop: 18 }} />
                    <Form methods={methods} onSubmit={onSubmit}>
                        <Grid container spacing={1} justifyContent="start" alignItems="center">
                            <Grid item sm={6} marginTop={1}>
                                <Field.Autocomplete
                                    label='New courier'
                                    name="new_courier"
                                    placeholder="Select courier"
                                    options={OPTIONS_COURIR}
                                    getOptionLabel={(option: OptionType | string) => (option as OptionType).label}
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    renderOption={(p, option) => (
                                        <li {...p} key={option.value}>
                                            {option.label}
                                        </li>
                                    )}
                                />
                            </Grid>
                            <Grid item sm={6} marginTop={1}>
                                <Field.Autocomplete
                                    label='Delivery service'
                                    name="select_delivery"
                                    placeholder="Select delivery"
                                    options={OPTIONS_COURIR}
                                    getOptionLabel={(option: OptionType | string) => (option as OptionType).label}
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    renderOption={(p, option) => (
                                        <li {...p} key={option.value}>
                                            {option.label}
                                        </li>
                                    )}
                                />
                            </Grid>
                            <Grid item sm={12} marginTop={1}>
                                <Field.Text label="Tracking number" name="keyword" placeholder="Enter tracking number" />
                            </Grid>
                        </Grid>
                    </Form>
                </Paper>
            </DialogContent>

            <DialogActions>
                <Box display="flex" justifyContent='space-between' sx={{ width: "100%" }}>
                    <Button variant="soft" onClick={close} autoFocus>
                        Cancel change courier
                    </Button>
                    <Button variant="contained" onClick={close} autoFocus>
                        Confirm change courier
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}
