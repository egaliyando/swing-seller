import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';

import { Field } from 'src/components/hook-form';

type OptionType = {
  value: string;
  label: string;
};

export function FormItemSpecs() {
  return (
    <Card>
      <CardHeader title="Item specs" sx={{ mb: 3 }} />
      <Divider />
      <Stack spacing={3} sx={{ px: 3, pt: 3 }}>
        <Alert severity="warning" variant="outlined">
          Please select the item category first to be able to fill in the item specs.
        </Alert>
      </Stack>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Autocomplete
            label="Brand"
            name="brand"
            placeholder="Select brand"
            options={[{}]}
            getOptionLabel={(option: OptionType | string) => (option as OptionType).label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
          />
          <Field.Autocomplete
            label="Gender"
            name="gender"
            placeholder="Select gender"
            options={[{}]}
            getOptionLabel={(option: OptionType | string) => (option as OptionType).label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
          />
          <Field.Autocomplete
            label="Hand"
            name="hand"
            placeholder="Select Hand"
            options={[{}]}
            getOptionLabel={(option: OptionType | string) => (option as OptionType).label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
          />
          <Field.Autocomplete
            label="Difficulty"
            name="difficulty"
            placeholder="Select difficulty"
            options={[{}]}
            getOptionLabel={(option: OptionType | string) => (option as OptionType).label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
          />
        </Box>
      </Stack>
    </Card>
  );
}
