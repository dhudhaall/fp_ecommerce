import React, { ReactElement, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogProps, Slide } from "@mui/material";
import './CustomDesignedDialog.scss'
import cross from "../../assets/template/images/icons/cross.svg"
function Transition(props: any) {
  return <Slide direction="down" {...props} />;
}
export interface CustomDialogProps {
  open: any;
  onClose: (value: any) => void;
  title:string; 
  component:ReactElement, 
  forLogin?:boolean 
} 
 
function CustomDesignedDialog(props: CustomDialogProps) {
   
  const { onClose, open,title,component,forLogin } = props; 
  const handleCloseDialog = () => { 
    onClose(false);
  }; 
  return ( 
    <div className="CustomDesignedDialog"> 
      <div id="CustomDesignedDialog">  
      <Dialog
        open={open}
        id="modal-content-bg"
        
        onClose={handleCloseDialog}
        TransitionComponent={Transition}

      >
        <DialogContent className={`${forLogin===true?'paddingRemovelogin':''}`} >
          {forLogin === false &&
          <div className='d-flex justify-content-between align-items-center modalHeading  mt-5 mb-5' >
            <h1 className='modal-title' style={{ fontSize: "3.2rem", fontWeight: 700 }}> {title}</h1>
            
            <button type="button" className="close a-rotate90" data-dismiss="modal" aria-label="Close" onClick={handleCloseDialog}>
              <img className="arrow arrows-size" src={cross} />
            </button>
          </div>
          }
          
          {component}
        </DialogContent>

      </Dialog>
      </div>
      
    </div>
  )
}
export default CustomDesignedDialog