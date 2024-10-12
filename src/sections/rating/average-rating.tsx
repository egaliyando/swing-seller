import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type Props = {
  title: string;
  subTitle: string;
};

export function AverageRating({ title, subTitle }: Props) {
  return (
    <Stack spacing={2.5} direction="row" sx={{ width: 1, minWidth: 200, px: 2 }}>
      <Stack spacing={0.5}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="subtitle2">{subTitle}</Typography>
      </Stack>
    </Stack>
  );
}
