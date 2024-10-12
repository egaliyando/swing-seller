import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';

import { Field } from 'src/components/hook-form';

type OptionType = {
  value: string;
  label: string;
};

export function FormItemInformation() {
  return (
    <Card>
      <CardHeader title="Item information" sx={{ mb: 3 }} />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="name" label="Item name" />
        <Field.Autocomplete
          label="Item category"
          name="categories"
          placeholder="Select category"
          options={[{}]}
          getOptionLabel={(option: OptionType | string) => (option as OptionType).label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          )}
        />
      </Stack>
    </Card>
  );
}
