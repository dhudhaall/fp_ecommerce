import { Dialog, DialogTitle, IconButton, DialogContent, Slide } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import CloseIcon  from '@mui/icons-material/Close';
import './warningCommonDialog.scss'
function Transition(props: any) {
  return <Slide direction="down" {...props} />;
}
export interface warningCommonDialogProps {
    open: boolean;
    onClose:(value:boolean)=>void;
    title:string;
    component:ReactElement;
    color:string;
    errorText?:string;
}

function WarningCommonDialog(props:warningCommonDialogProps){
  const { onClose, open, title , component,color,errorText} = props;
  
  const warningCloseDialog = () => {
    onClose(false);
  };

   return(
    <div className='warning'>
    <Dialog
      open={props.open}
      onClose={warningCloseDialog}
      sx={{'.MuiPaper-root':{boxShadow:'0 5px 20px rgb(0 153 255 / 50%) !important',backgroundColor:color,borderRadius:0,color:'#ffffff'},'MuiSvgIcon-root':{fontSize:'20px'}}}
      TransitionComponent={Transition}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
          {/* {warningCloseDialog ? (
            <IconButton
              aria-label="close"
              onClick={warningCloseDialog}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
                <CloseIcon />
            </IconButton>
          ) : null} */}
        </DialogTitle>
        <DialogContent>
        <div className='d-flex justify-content-between align-items-center modalHeading mb-5 ' >
            <h1 className='modal-title' style={{ fontSize: "3.2rem", fontWeight: 700,color:"#ffffff" }}> {title}</h1>
            <CloseIcon className="warning-modal-icon arrow"   onClick={warningCloseDialog} />
          </div>
          {component &&
          <div>
               {component}             
          </div>
          }
          {errorText &&
          <div className='error-text' style={{padding:"29px 7px ",margin:"20px",fontSize:"18px"}}>
               {errorText}             
          </div>
          }
         
      </DialogContent>
    </Dialog>
    </div>
   )
}
export default WarningCommonDialog