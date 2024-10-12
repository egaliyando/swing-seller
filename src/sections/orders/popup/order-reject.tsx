import * as React from 'react';

import { Box, Paper, Radio, Button, colors, Dialog, Typography, DialogTitle, DialogContent, DialogActions } from '@mui/material';



export interface IAppProps {
    show: boolean,
    close: () => void,
    row: any
}

const reason = [
    { title: "Stock unavailable", desc: "(Item will be set to inactive)" },
    { title: "Shop or seller is unavailable", desc: "" },
    { title: "Courier or fulfillment issues", desc: "(Stock will be returned without changing the item status)" },
    { title: "No response from buyer", desc: "(Stock will be returned without changing the item status)" },
    { title: "Others", desc: "(Stock will be returned without changing the item status)" },
]

export default function OrderRejectPopup(props: IAppProps) {
    const { show, close, row } = props
    // console.log('row: ', row);
    return (

        <Dialog fullWidth maxWidth="sm" open={show} onClose={close}>
            <DialogTitle>Reject order</DialogTitle>

            <DialogContent>
                <Paper variant='outlined' sx={{ padding: 2 }}>
                    <Typography variant='h4'>Why are you rejecting this order?</Typography>
                    <hr style={{ border: `0.1px solid ${colors.grey[200]}`, marginBottom: 20, marginTop: 18 }} />
                    <Typography fontWeight={700} fontSize={14}>Select a reason</Typography>
                    <Box sx={{ backgroundColor: '#F2F2F5', borderRadius: '8px', padding: '16px', marginTop: 1 }}>
                        {
                            reason.map((item, index) =>
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginTop: 0.5 }}>
                                    <Radio sx={{ marginRight: 0.5 }} id={`${index}`} />
                                    <label htmlFor={`${index}`}>
                                        <Typography fontWeight={700}>{item.title}</Typography>
                                        <Typography fontWeight={400}>{item.desc}</Typography>
                                    </label>
                                </Box>)
                        }

                    </Box>
                </Paper>
            </DialogContent>

            <DialogActions>
                <Box display="flex" justifyContent='space-between' sx={{ width: "100%" }}>
                    <Button variant="soft" onClick={close} autoFocus>
                        Continue process order
                    </Button>
                    <Button variant="contained" onClick={close} autoFocus>
                        Continue
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}
