import type { IconButtonProps } from '@mui/material/IconButton';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { checkFileType } from 'src/utils/helper';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from '../../iconify';

import type { SingleFilePreviewProps } from '../types';

// ----------------------------------------------------------------------

export function SingleFilePreview({ file }: SingleFilePreviewProps) {
  const fileName = typeof file === 'string' ? file : file.name;
  const previewUrl: any = typeof file === 'string' || file?.path ? file : URL.createObjectURL(file);
  const fileType = checkFileType(file);

  if (fileType === 'Image' || fileType === 'URL') {
    return (
      <Box
        sx={{
          p: 1,
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          position: 'absolute',
        }}
      >
        <Box
          component="img"
          alt={fileName}
          src={previewUrl?.path ? previewUrl?.path : previewUrl}
          sx={{
            width: 1,
            height: 1,
            borderRadius: 1,
            objectFit: 'cover',
          }}
        />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    >
      <Iconify icon="ph:folder-open-light" sx={{ width: 100, color: 'grey.500' }} />
      <Box sx={{ mt: 2, fontSize: 14, color: 'grey.700', wordWrap: 'break-word' }}>{fileName}</Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function DeleteButton({ sx, ...other }: IconButtonProps) {
  return (
    <IconButton
      size="small"
      sx={{
        top: 16,
        right: 16,
        zIndex: 9,
        position: 'absolute',
        color: (theme) => varAlpha(theme.vars.palette.common.whiteChannel, 0.8),
        bgcolor: (theme) => varAlpha(theme.vars.palette.grey['900Channel'], 0.72),
        '&:hover': { bgcolor: (theme) => varAlpha(theme.vars.palette.grey['900Channel'], 0.48) },
        ...sx,
      }}
      {...other}
    >
      <Iconify icon="mingcute:close-line" width={18} />
    </IconButton>
  );
}
