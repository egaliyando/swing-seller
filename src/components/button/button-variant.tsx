import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import type { Props } from './types';

const DEFAULT_VARIANT = 'contained';
const DEFAULT_SIZE = 'medium';
const DEFAULT_COLOR = 'primary';
const DEFAULT_TYPE = 'submit';

export const SWButton = ({
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  className,
  children,
  loading,
  type = DEFAULT_TYPE,
  onClick,
  ...other
}: Props) => (
  <>
    {loading ? (
      <LoadingButton loading variant={variant}>
        Submit
      </LoadingButton>
    ) : (
      <Button
        type={type}
        {...other}
        className={className}
        variant={variant}
        color={color}
        size={size}
        onClick={onClick}
      >
        {children}
      </Button>
    )}
  </>
);
