'use client';

import { useState, useCallback } from 'react';

import { Box, Card, Typography } from '@mui/material';

import { Upload } from 'src/components/upload';
import { Iconify } from 'src/components/iconify';
import { SWButtonIcon } from 'src/components/button';

type Props = {
  step: number;
};

export function ItemsWithoutVariants({ step }: Props) {
  const [file, setFile] = useState<File | string | null>(null);
  const handleDropSingleFile = useCallback((acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    setFile(newFile);
  }, []);
  return (
    <Box sx={{ mt: 2 }}>
      <Card sx={{ p: 3 }}>
        {step === 1 && (
          <>
            <Typography sx={{ mb: 3, fontSize: 12 }}>
              Add item variants from up to 10 different categories. The template can only be filled
              with
              <b>MS. Excel 2007 and above or Libre Office.</b>
            </Typography>
            <SWButtonIcon
              variant="outlined"
              onClick={() => null}
              icon={<Iconify icon="solar:import-bold" />}
            >
              Download template
            </SWButtonIcon>
          </>
        )}

        {step === 2 && (
          <>
            <Typography sx={{ mb: 3, fontSize: 12 }}>
              Select or drop your Excel file (.xlsx) here. Max. 300 products in one file.
            </Typography>
            <Upload
              excel
              value={file}
              onDrop={handleDropSingleFile}
              onDelete={() => setFile(null)}
            />
          </>
        )}
      </Card>
    </Box>
  );
}
