import * as React from 'react';
import { toast, Toaster } from 'sonner';
import { useForm } from 'react-hook-form';

import { Box, Grid, Paper, Alert, colors, Button, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import axios from 'src/utils/axios';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import AddPickupPopup from './add-pickup-popup';

export interface IFullFilmentServicesProps {}

export default function FullFilmentServices(props: IFullFilmentServicesProps) {
  const isPickupPopup = useBoolean();

  const hookForm: any = useForm({
    defaultValues: {},
  });

  const { handleSubmit } = hookForm;

  const onSubmit = handleSubmit(async (data: any) => {
    console.log('data: ', data);
  });

  const [shipping, setShipping] = React.useState<any>([]);
  const [selfPickupData, setSelfPickupData] = React.useState<any>([]);

  const getShipping = async () => {
    try {
      const res: any = await axios.get('/v1/partner/marketplace/shipments');
      setShipping(res?.data?.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const getSelfPickup = async () => {
    try {
      const res: any = await axios.get('/v1/partner/marketplace/shop/warehouses');
      setSelfPickupData(res?.data?.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const updateSwitchSelfPickup = async (checked: string, id: string) => {
    const checkedPayload = {
      enable: checked,
    };
    try {
      const res: any = await axios.put(
        `/v1/partner/marketplace/shop/warehouses/${id}/self-pickup`,
        checkedPayload
      );
      if (res.status === 200) {
        const _data = [...selfPickupData];
        const findIndex = _data?.findIndex((v: any) => v?.id === id);

        _data[findIndex].self_pickup_enabled = checked;

        setSelfPickupData(_data);
        toast.success('Self pickup updated', { position: 'top-right' });
      } else {
        toast.error('Error update', { position: 'top-right' });
      }
    } catch (error) {
      console.log('error: ', error);
      toast.error('Error update', { position: 'top-right' });
    }
  };

  React.useEffect(() => {
    getShipping();
    getSelfPickup();
  }, []);

  return (
    <Form methods={hookForm} onSubmit={onSubmit}>
      <Toaster />
      <Box>
        <Paper sx={{ width: '100%', height: '100%', padding: 2, marginTop: 1 }} variant="outlined">
          <Box>
            <Typography variant="h4">Delivery couriers</Typography>
            <Typography color={colors.grey[500]} fontWeight={400} variant="subtitle2">
              Select the courier services you’d want to provide in your store.
            </Typography>
          </Box>
          <hr
            style={{ border: `0.1px solid ${colors.grey[200]}`, marginBottom: 20, marginTop: 18 }}
          />
          <Alert severity="info" variant="filled" color="info">
            All courier and delivery services are required to be enabled and active.
          </Alert>

          <Grid container spacing={2} marginTop={1}>
            {shipping?.length &&
              shipping?.map((item: any, index: number) => (
                <Grid item sm={4} key={index}>
                  <Paper variant="outlined" sx={{ padding: 2 }}>
                    <Box display="flex" alignItems="center">
                      <Field.Checkbox
                        disabled
                        label={
                          <Typography fontWeight={700} variant="subtitle2">
                            {item?.name}
                          </Typography>
                        }
                        name="shipping_method"
                      />
                      <div style={{ width: '40px' }}>
                        <img alt="shipping" src={item?.logo} />
                      </div>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: colors.grey[100],
                        paddingBottom: 1,
                        paddingTop: 1,
                        paddingLeft: 2,
                        paddingRight: 2,
                        borderRadius: 1,
                      }}
                    >
                      {item?.services?.map((types: any, j: number) => (
                        <Field.Checkbox
                          disabled
                          key={j}
                          label={types?.name}
                          name={`shipping_method${j}`}
                        />
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Paper>
        <Paper sx={{ width: '100%', height: '100%', padding: 2, marginTop: 2 }} variant="outlined">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4">Self pickup</Typography>
              <Typography color={colors.grey[500]} fontWeight={400} variant="subtitle2">
                Enter & configure the available locations where buyer can self pickup the purchased
                items.
              </Typography>
            </Box>
            <Button onClick={isPickupPopup.onTrue} variant="contained" color="primary">
              Add self pickup location
            </Button>
          </Box>

          <Grid container spacing={2} marginTop={1}>
            {selfPickupData?.length &&
              selfPickupData?.map((item: any) => (
                <Grid item sm={4} key={item?.id}>
                  <Paper variant="outlined" sx={{ padding: 2 }}>
                    <Typography fontWeight={700} fontSize={14}>
                      {item?.name}
                    </Typography>
                    <Box sx={{ height: 45 }}>
                      <Typography
                        marginTop={1}
                        color={colors.grey[500]}
                        fontWeight={400}
                        variant="subtitle2"
                      >
                        {item?.address}
                      </Typography>
                    </Box>
                    <Box marginBottom={4} marginTop={1} display="flex" alignItems="center">
                      <Iconify color={colors.grey[600]} icon="ri:time-line" />
                      <Typography
                        marginLeft={1}
                        color={colors.grey[600]}
                        fontWeight={700}
                        variant="subtitle2"
                      >
                        {item?.ops_hour}
                      </Typography>
                    </Box>
                    <Field.Switch
                      checked={item?.self_pickup_enabled}
                      label="Self pickup enabled"
                      name={`enable_pickup${item.id}`}
                      customOnChange={(e: any) => updateSwitchSelfPickup(e.target.checked, item.id)}
                    />
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Paper>
        <AddPickupPopup show={isPickupPopup.value} close={isPickupPopup.onFalse} />
      </Box>
    </Form>
  );
}
