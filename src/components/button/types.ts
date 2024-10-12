export type Props = {
  onClick?: () => void;
  icon?: React.ReactNode;
  loading?: boolean;
  children: string;
  className?: string;
  variant?: 'text' | 'contained' | 'outlined' | 'soft';
  color?: 'inherit' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
};
