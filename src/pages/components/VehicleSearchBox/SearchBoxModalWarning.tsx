import React from 'react'

export default function SearchBoxModalWarning(props:any) {

  const {warningText,type} = props;

  return (
    <div className='SearchBoxModalWarning'>
       <p>{warningText}</p>
       <div className='mt-2'>
        {type === "vin" && 
        <button className="GotoVehicleRequest mt-3  m-auto btn btn-sm btn-primary  btn-standart-inline btn-middle">Let's do it</button>

        }
        {type === "plate" && 
        <>
      
        <input type="text" className="form-control js-plate-no" value="SASDASDA" name="plateno"/>
        <div className=" d-flex pt-3">
        <a className="js-add-vehicle btn btn-link btn-submit btn-blue btn-large btn-blue-lighten-hover box-shadow">Add vehicle</a>
        <button type="submit" className=" btn btn-submit btn-blue btn-large btn-blue-lighten-hover box-shadow">Search again</button>
        
      </div>
        </>
        }
       </div>
       
    </div>
  )
}
