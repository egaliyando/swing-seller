import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useBoolean } from 'src/hooks/use-boolean';

// ----------------------------------------------------------------------

type AlertDialogProps = {
  title: string;
  firstActiontitle: string;
  secondActiontitle: string;
  children: any;
}

export function AlertDialog(props: AlertDialogProps) {
  const { title, children, firstActiontitle, secondActiontitle } = props
  const dialog = useBoolean();

  return (
    <>
      <Button color="info" variant="outlined" onClick={dialog.onTrue}>
        Open alert dialog
      </Button>

      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          {children}
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={dialog.onFalse}>
            {firstActiontitle}
          </Button>
          <Button variant="contained" onClick={dialog.onFalse} autoFocus>
            {secondActiontitle}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
