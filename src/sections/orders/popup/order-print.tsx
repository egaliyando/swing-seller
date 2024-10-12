import * as React from 'react';

import { Box, Paper, Button, colors, Dialog, Typography, DialogTitle, DialogContent, DialogActions } from '@mui/material';



export interface IAppProps {
    show: boolean,
    close: () => void,
    row: any
}

const stepPrint = [
    "Print the shipping label or write the booking code on the package.",
    "Just deliver the package directly to the nearest outlet without having to pay shipping costs to the courier.",
    "No need to enter tracking ID manually because they will automatically be updated in the system.",
    "Delivery confirmation will automatically be updated  max. within 3 hours after the package is handed over to the courier.",
]

export default function OrderPrintPopup(props: IAppProps) {
    const { show, close, row } = props
    // console.log('row: ', row);
    return (

        <Dialog fullWidth maxWidth="sm" open={show} onClose={close}>
            <DialogTitle>Print label</DialogTitle>

            <DialogContent>
                <Paper variant='outlined' sx={{ padding: 2 }}>
                    <Typography variant='h4'>Check important information here first before printing labels</Typography>
                    <hr style={{ border: `0.1px solid ${colors.grey[200]}`, marginBottom: 20, marginTop: 18 }} />
                    {
                        stepPrint.map((item, i) =>
                            <Box key={i} display="flex" alignItems='center' marginTop={2}>
                                <Box sx={{ marginRight: 1.5, display: "flex", justifyContent: "center", alignItems: "center", width: "38px", height: "38px", borderRadius: '50%', backgroundColor: colors.blue[50], color: colors.blue[500] }}>
                                    <Typography fontSize={18} fontWeight={800}>{i + 1}</Typography>
                                </Box>
                                <Typography width={450} fontSize={14} fontWeight={400}>{item}</Typography>
                            </Box>)
                    }

                </Paper>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={close} autoFocus>
                    Continue print label
                </Button>
            </DialogActions>
        </Dialog>
    );
}
