import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

type Props = {
  title: string;
  subTitle: string;
  progress: string;
};

export function InvoiceAnalytic({ title, subTitle, progress }: Props) {
  return (
    <Stack
      spacing={2.5}
      direction="row"
      alignItems="center"
      sx={{ width: 1, minWidth: 200, px: 2 }}
    >
      <Stack spacing={0.5}>
        <Typography variant="subtitle1">{title}</Typography>

        <Box component="span" sx={{ color: 'text.disabled', typography: 'body2' }}>
          {subTitle}
        </Box>

        <Typography variant="subtitle2">{progress}</Typography>
      </Stack>
    </Stack>
  );
}
