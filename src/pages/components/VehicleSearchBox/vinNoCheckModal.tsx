import React from "react";
import "./vehicleSearchBox.scss";
import { environment } from "../../environment/env";
import { useNavigate } from "react-router-dom";
function VinNoCheckModal(props: any) {
  const { vinCheckResult } = props;
  const navigate = useNavigate();
  const clientUrl = environment.clientWebFrontUrl
  const sprintf = (format: string, rep_string: string, ...args: any[]) => {
    let i = 0;
    if (format) {
      let regExp = new RegExp(rep_string, "g");
      return format.replace(regExp, () => args[i++]);
    }
    return "";
  };

  const toAddVinNo = ()=>{
    let url = `${clientUrl}/home/decodingRequests/addRequestToAddVehicle`
    window.open(url,'_blank')
   
  }
  return (
    <>
      <div className="search-mainbox text-center">
        <div dangerouslySetInnerHTML={{ __html: sprintf(vinCheckResult?.input_error, '%s', vinCheckResult?.vin) }} ></div>
        <button onClick={toAddVinNo} className="GotoVehicleRequest">{vinCheckResult?.input_error_btn}</button>
      </div>
    </>
  );
}

export default VinNoCheckModal;
