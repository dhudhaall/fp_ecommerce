import { Button, Dialog, DialogActions, DialogContent, DialogProps, Menu, MenuItem, Slide } from '@mui/material';
import React, { Component, ReactElement, useState ,useRef} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import "./CommonDialog.scss"
function Transition(props: any) {
  return <Slide direction="down" {...props} />;
}

export interface commonDialogProps {
  open: boolean;
  onClose: (value: boolean) => void;
  title: string;
  maxWidth: string;
  component: ReactElement,
}

function CommonDialog(props: commonDialogProps) {
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('xl');
  const { onClose, title, open, component } = props;
  const ref = useRef();

  const handleCloseDialog = () => {
    onClose(false);
  };
  return (

  <>
      <div className="vehicle_popup">

        <Dialog
          open={open}
          onClose={handleCloseDialog}
          maxWidth={maxWidth}
          TransitionComponent={Transition}
          sx={{ boxShadow: '0 0 30px rgb(0 0 0 / 50%)' }}
        >
          <DialogContent>
            <div className='d-flex justify-content-between align-items-center modalHeading mt-5 mb-5' >
              <h1 className='modal-title' style={{ fontSize: "3.2rem", fontWeight: 700 }}  >{title}</h1>
              <CloseIcon className='position-absolute arrow' style={{ right: '10px', top: '10px', fontSize: '40px !important' }} onClick={handleCloseDialog} />
            </div>

            <div className='searchbox seachInModal '>
              <div className='searchbox__panel-vehicle searchbox__panel search-custom' >

                {component}
              </div>
            </div>

          </DialogContent>

        </Dialog>
      </div>
    </>

    
  );
}

export default CommonDialog;