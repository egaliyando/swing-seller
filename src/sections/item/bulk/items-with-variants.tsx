'use client';

import { useState, useCallback } from 'react';

import {
  Box,
  Card,
  List,
  Checkbox,
  ListItem,
  IconButton,
  Typography,
  ListItemText,
} from '@mui/material';

import { Upload } from 'src/components/upload';
import { Iconify } from 'src/components/iconify';
import { SWButtonIcon } from 'src/components/button';

type Props = {
  step: number;
};

export function ItemsWithVariants({ step }: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null);

  const handleCategoryClick = (id: number) => {
    setSelectedCategoryId(selectedCategoryId === id ? null : id);
    setSelectedSubcategoryId(null); // Reset subcategory selection
  };

  const handleSubcategoryClick = (id: number) => {
    setSelectedSubcategoryId(selectedSubcategoryId === id ? null : id);
  };

  const data = [
    {
      id: 1,
      name: 'Golf clubs',
      items: [
        {
          id: 1,
          name: 'Drivers',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        {
          id: 2,
          name: 'Fairway woods',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        {
          id: 3,
          name: 'Hybrids',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        {
          id: 4,
          name: 'Single item iron',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        { id: 5, name: 'Iron set', items: [] },
        { id: 6, name: 'Wedge', items: [] },
        {
          id: 7,
          name: 'Putters',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Apparel',
      items: [
        {
          id: 1,
          name: 'Drivers',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        {
          id: 2,
          name: 'Fairway woods',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        {
          id: 3,
          name: 'Hybrids',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        {
          id: 4,
          name: 'Single item iron',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        { id: 5, name: 'Iron set', items: [] },
        { id: 6, name: 'Wedge', items: [] },
        {
          id: 7,
          name: 'Putters',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'Gears',
      items: [
        {
          id: 1,
          name: 'Drivers',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        {
          id: 2,
          name: 'Fairway woods',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        {
          id: 3,
          name: 'Hybrids',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        {
          id: 4,
          name: 'Single item iron',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        { id: 5, name: 'Iron set', items: [] },
        { id: 6, name: 'Wedge', items: [] },
        {
          id: 7,
          name: 'Putters',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
      ],
    },
    {
      id: 4,
      name: 'Accessories',
      items: [
        {
          id: 1,
          name: 'Drivers',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        {
          id: 2,
          name: 'Fairway woods',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        {
          id: 3,
          name: 'Hybrids',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        {
          id: 4,
          name: 'Single item iron',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        { id: 5, name: 'Iron set', items: [] },
        { id: 6, name: 'Wedge', items: [] },
        {
          id: 7,
          name: 'Putters',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
      ],
    },
    {
      id: 5,
      name: 'Components',
      items: [
        {
          id: 1,
          name: 'Drivers',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        {
          id: 2,
          name: 'Fairway woods',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        {
          id: 3,
          name: 'Hybrids',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        {
          id: 4,
          name: 'Single item iron',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
        { id: 5, name: 'Iron set', items: [] },
        { id: 6, name: 'Wedge', items: [] },
        {
          id: 7,
          name: 'Putters',
          items: [
            { id: 1, name: '2 wood (rocket)' },
            { id: 1, name: '3 wood ' },
            { id: 1, name: '4 wood ' },
            { id: 1, name: '5 wood ' },
            { id: 1, name: '6 wood ' },
            { id: 1, name: '7 wood ' },
          ],
        },
      ],
    },
  ];

  const getGridTemplateColumns = () => {
    if (!selectedCategoryId) {
      return '1fr'; // Only categories shown, full width
    }
    if (selectedCategoryId && !selectedSubcategoryId) {
      return '1fr 1fr'; // Categories and subcategories shown, split into 2 equal parts
    }
    return '1fr 1fr 1fr'; // Categories, subcategories, and items shown, split into 3 equal parts
  };

  const handleItemToggle = (itemName: string) => {
    // Implement toggle logic for checkboxes if needed
  };

  const [file, setFile] = useState<File | string | null>(null);
  const handleDropSingleFile = useCallback((acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    setFile(newFile);
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      {step === 1 && (
        <>
          <Card sx={{ p: 3, mb: 2 }}>
            <Typography sx={{ mb: 3, fontSize: 16, fontWeight: 'bold' }}>
              Select up to 10 item categories
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: getGridTemplateColumns(),
                gap: 2,
              }}
            >
              {/* Category List */}
              <List sx={{ borderRight: selectedCategoryId ? '1px solid #ddd' : 'none' }}>
                {data.map((category) => (
                  <ListItem
                    button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <ListItemText primary={category.name} />
                    <IconButton edge="end">
                      <Iconify icon="ep:arrow-right-bold" />
                    </IconButton>
                  </ListItem>
                ))}
              </List>

              {/* Subcategory List */}
              {selectedCategoryId && (
                <List sx={{ borderRight: selectedSubcategoryId ? '1px solid #ddd' : 'none' }}>
                  {data
                    .find((category) => category.id === selectedCategoryId)
                    ?.items.map((subcategory) => (
                      <ListItem
                        button
                        key={subcategory.id}
                        onClick={() => handleSubcategoryClick(subcategory.id)}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <ListItemText primary={subcategory.name} />
                        {subcategory.items.length === 0 ? (
                          <Checkbox
                            edge="end"
                            onChange={() => handleItemToggle(subcategory.name)}
                          />
                        ) : (
                          <IconButton edge="end">
                            <Iconify icon="ep:arrow-right-bold" />
                          </IconButton>
                        )}
                      </ListItem>
                    ))}
                </List>
              )}

              {/* Items List in a single row */}
              {selectedSubcategoryId && (
                <Box>
                  {data
                    .find((category) => category.id === selectedCategoryId)
                    ?.items.find((subcategory) => subcategory.id === selectedSubcategoryId)
                    ?.items.map((item, index) => (
                      <ListItem key={index} sx={{ minWidth: '150px', whiteSpace: 'nowrap' }}>
                        <ListItemText primary={item.name} />
                        <Checkbox edge="end" onChange={() => handleItemToggle(item.name)} />
                      </ListItem>
                    ))}
                </Box>
              )}
            </Box>
          </Card>

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
          <Upload excel value={file} onDrop={handleDropSingleFile} onDelete={() => setFile(null)} />
        </>
      )}
    </Box>
  );
}
