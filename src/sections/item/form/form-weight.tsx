import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { varAlpha } from 'src/theme/styles';

import { Field } from 'src/components/hook-form';

export function FormItemweight() {
  return (
    <Card>
      <CardHeader title="Weight & fulfillment" sx={{ mb: 3 }} />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="weight" label="Item weight" />
        <Alert severity="info" variant="outlined">
          Enter the weight by weighing the item after packaging. Make sure the weight is appropriate
          so that there is no difference in shipping costs with the courier.
        </Alert>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        >
          <Field.Text name="weight" label="Item size" placeholder="30" />
          <Field.Text name="weight" label="" placeholder="20" />
          <Field.Text name="weight" label="" placeholder="1500" />
        </Box>
        <Alert severity="info" variant="outlined">
          Enter the size of the item after packaging to calculate the volume weight
        </Alert>
      </Stack>

      <Stack spacing={3} sx={{ px: 3, pb: 3 }}>
        <Typography variant="subtitle2">Shipping insurance</Typography>
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
            options={[
              {
                value: 'true',
                label: 'Required (You require buyers to activate shipping insurance).',
              },
              {
                value: 'false',
                label: 'Optional (You give buyers the option to activate shipping insurance).',
              },
            ]}
            sx={{ display: 'grid' }}
          />
        </Box>
        <Alert severity="info" variant="outlined">
          Covers item refunds and postage for sellers and buyers if damage/loss occurs during
          delivery.
        </Alert>
      </Stack>
      <Stack spacing={3} sx={{ px: 3, pb: 3 }}>
        <Typography variant="subtitle2">Fulfillment services</Typography>
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
            options={[
              {
                value: 'true',
                label:
                  'Standard (Fulfillment services for this item will be the same as those in fulfillment settings).',
              },
              {
                value: 'false',
                label: 'Custom (Fulfillment services for this item will be different on its own).',
              },
            ]}
            sx={{ display: 'grid' }}
          />
        </Box>
        <Alert severity="info" variant="outlined">
          Configure the fulfillment services available according to your item type.
        </Alert>
      </Stack>
    </Card>
  );
}
