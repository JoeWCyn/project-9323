import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

export default function TransitionMessage (props) {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    setOpen(props.visible);
  }, [props]);

  return (
    props.visible &&
      <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity={props.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={(e) => {
                e.preventDefault()
                props.setVisible();
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {props.message}
        </Alert>
      </Collapse>
    </Box>
  )
}
TransitionMessage.propTypes = {
  setVisible: PropTypes.func,
  message: PropTypes.string,
  severity: PropTypes.string,
  visible: PropTypes.bool,
};
