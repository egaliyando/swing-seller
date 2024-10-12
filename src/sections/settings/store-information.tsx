import * as React from 'react';
import { toast, Toaster } from 'sonner';
import { useForm } from 'react-hook-form';

import { Box, Paper, colors, Button, Typography } from '@mui/material';

import axiosInstance from 'src/utils/axios';

import { Form, Field } from 'src/components/hook-form';

export interface IStoreInformationProps {}

export default function StoreInformation(props: IStoreInformationProps) {
  const methods: any = useForm({
    defaultValues: {},
  });

  const { handleSubmit } = methods;

  const [id, setid] = React.useState('');
  const [setsubmitting, setsetsubmitting] = React.useState(false);

  const onSubmit = handleSubmit(async (data: any) => {
    setsetsubmitting(true);
    const payload = { ...data };
    payload.logo_id = data?.logo_id?.id;

    try {
      const res = await axiosInstance.put(`/v1/partner/marketplace/shop/${id}`, payload);
      if (res.status === 200) {
        toast.success('Store information updated', { position: 'top-right' });
        setsetsubmitting(false);
      } else {
        toast.error('Error update', { position: 'top-right' });
        setsetsubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setsetsubmitting(false);
      toast.error('Error update', { position: 'top-right' });
    }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => {
    const res = await axiosInstance.get('/v1/partner/marketplace/shop');
    if (res.status === 200) {
      setid(res?.data?.data?.id);
      methods.setValue('name', res?.data?.data?.name);
      methods.setValue('description', res?.data?.data?.description);
      methods.setValue('logo_id', {
        error: '',
        path: res?.data?.data?.logo?.path,
        id: res?.data?.data?.logo?.id,
      });
    }
  };

  React.useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Toaster />
      <Paper sx={{ width: '100%', height: '100%', padding: 2, marginTop: 1 }} variant="outlined">
        <Field.Text
          sx={{ marginTop: 2 }}
          InputLabelProps={{ shrink: true }}
          label="Store name"
          name="name"
          placeholder="Please input store name"
        />

        <Box marginTop={3}>
          <Typography variant="subtitle2">Store description</Typography>
          <Field.Editor sx={{ marginTop: 1 }} name="description" />
        </Box>

        <Box marginTop={3} marginBottom={2}>
          <Typography variant="subtitle2">Store logo</Typography>
          <Typography color={colors.grey[500]} fontWeight={400} variant="subtitle2">
            Optimal size 300 x 300 pixels with file size Max. 10MB. Allowed file extensions: JPG,
            JPEG, PNG
          </Typography>
          <Field.Upload
            thumbnail
            name="logo_id"
            maxSize={3145728}
            onDelete={() => methods.setValue('logo_id', null)}
            sx={{ marginTop: 1 }}
          />
        </Box>

        <Button type="submit" sx={{ float: 'right' }} variant="contained" color="primary">
          {setsubmitting ? 'loading..' : 'Continue to upload'}
        </Button>
      </Paper>
    </Form>
  );
}
