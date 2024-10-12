import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { UploadIllustration } from 'src/assets/illustrations';

// ----------------------------------------------------------------------

export function UploadPlaceholder({ ...other }: BoxProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      {...other}
    >
      <UploadIllustration hideBackground sx={{ width: 200 }} />

      <Stack spacing={1} sx={{ textAlign: 'center' }}>
        <Box sx={{ typography: 'h6' }}>Drop or select file</Box>
        <Box sx={{ typography: 'body2', color: 'text.secondary' }}>
          <Box
            component="span"
            sx={{ mx: 0.5, color: 'primary.main', textDecoration: 'underline' }}
          >
            Select file
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
