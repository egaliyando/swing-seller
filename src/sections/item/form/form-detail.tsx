// import { useCallback } from 'react';
// import { useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { varAlpha } from 'src/theme/styles';

import { Field } from 'src/components/hook-form';

import { JOB_BENEFIT_OPTIONS } from '../default';

export function FormItemDetail() {
  // const formHook: any = useFormContext();
  // const values = formHook.watch();

  // const handleRemoveFile = useCallback(

  //   (inputFile: File | string) => {
  //     const filtered = values.images && values.images?.filter((file: any) => file !== inputFile);
  //     formHook.setValue('images', filtered);
  //   },
  //   [formHook, formHook.setValue, values.images]
  // );

  // const handleRemoveAllFiles = useCallback(() => {
  //   formHook.setValue('images', [], { shouldValidate: true });
  // }, [formHook.setValue]);
  return (
    <Card>
      <CardHeader title="Item Details" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ px: 3, pt: 3 }}>
        <Alert severity="info" variant="filled">
          For better clarity, please include images for other variants well.
        </Alert>
      </Stack>

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography variant="subtitle2">Item images</Typography>
        <Field.Upload
          multiple
          thumbnail
          name="images"
          maxSize={3145728}
          onRemove={() => null}
          onRemoveAll={() => null}
          onUpload={() => console.info('ON UPLOAD')}
        />

        <Alert severity="info" variant="outlined">
          Photo format must be .jpg .jpeg .png and min size. 300 x 300 px (for optimal images, use a
          min. size of 1,200 x 1,200 px).
        </Alert>
      </Stack>

      <Stack spacing={3} sx={{ p: 3 }}>
        {/* todo image belum dislicing */}
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Item description</Typography>
          <Field.Editor name="description" sx={{ maxHeight: 480 }} />
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle2">Item condition</Typography>
          <Box
            sx={{
              p: 2,
              width: 1,
              borderRadius: 2,
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
              border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
            }}
          >
            <Field.RadioGroup
              name="radioGroup"
              label=""
              options={JOB_BENEFIT_OPTIONS}
              sx={{ display: 'grid' }}
            />
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}
