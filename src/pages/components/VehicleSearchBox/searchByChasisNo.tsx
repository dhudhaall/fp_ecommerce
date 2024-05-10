import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './vehicleSearchBox.scss'
import useLoader from "../../shared/Loader/useLoader";
import { Country } from '../../Models/dropdowns';
import ShareDataService from '../../services/shareData.service';
import WarningCommonDialog from '../../shared/CommonDialog/warningCommonDialog';
import SearchBoxModalWarning from './SearchBoxModalWarning';
import { Subscription } from 'rxjs';
import { useSelector } from 'react-redux';
import { Pagination } from '../../Models/pagination';
import { useDispatch } from 'react-redux';
import { updateApiParamData, updateUrl } from '../../Store/Slice/productSearchSlice';
import { checkVinNo } from '../../services/searchVehicle.service';
import VinNoCheckModal from './vinNoCheckModal';

function SearchBychasisNo(props: any) {

  const navigate = useNavigate();
  const selected_country = useSelector((state: any) => state.loadCart.country);
  const page = new Pagination();
  const dispatch = useDispatch();
  const [loader, showLoader, hideLoader] = useLoader(); //initialize useLoader hook
  const [chasis_no, setChasisNo] = useState('');
  const [plate_no, setPlateNo] = useState('');
  const [inputChasisError, setChasisError] = useState(false);
  const [inputChasisErrorlength, setChasisErrorLenght] = useState(false);
  const [inputPlateNoError, setPlateNoError] = useState(false);
  const { translation, updateSearchParams } = props;
  const [openWarning, setWarningOpen] = useState(false);
  const [openWrongVinWarning, setWarningWrongVinOpen] = useState(false);
  const [vinCheckResult, setVinCheck] = useState({});
  const warningVinSuggestionClose = (value: boolean) => {
    setWarningWrongVinOpen(false);
  };
  const warningVinSuggestionOpen = (value: boolean) => {
    setWarningWrongVinOpen(true);
  };
  const handleChange = (event: any) => {
    setPlateNo(event.target.value);
    if (plate_no) {
      setPlateNoError(false);
    }
  }

  const handleSubmit = (event: any) => {

    event.preventDefault();

    if (plate_no === '') {
      setPlateNoError(true);
    } else {
      
      const data = { plate_no: plate_no, per_page: page.per_page }
      const url = '/products/plate_search';
      let lang = JSON.parse(localStorage.getItem('lang')!);
      showLoader()
      const params = { formType: 'plateNo', plate_no: plate_no, lang: lang?.language_id }
      dispatch(updateUrl(url));
      dispatch(updateApiParamData(data));
      localStorage.setItem('apiUrlParam', url);
      localStorage.setItem('apiDataParam', JSON.stringify(data));
      updateSearchParams(params);
      // navigate(
      //   {
      //     pathname: '/searchproducts',
      //     search: `?formType=plateNo&plate_no=${plate_no}&lang=${lang?.language_id}`,
      //   })
    }
  }
  const handleChasisChange = (event: any) => {

    setChasisNo(event.target.value);
    if (chasis_no) {
      setChasisError(false);
    }
    if (chasis_no.length > 9 || chasis_no.length < 17) {
      setChasisErrorLenght(false)
    }
  }

  const handleChasisSubmit = (event: any) => {
    event.preventDefault();

    if (chasis_no === '') {
      setChasisError(true);
      setChasisErrorLenght(false)
    } else if (chasis_no.length > 17 || chasis_no.length < 9) {
      setChasisErrorLenght(true)
    } else {
      
      checkVinNo({vin: chasis_no}).then((res: any) => {
        
        if(res['data']?.success === false){
          setWarningWrongVinOpen(true)
          setVinCheck({...res['data'], vin: chasis_no})
        }else{
          const data = { vin: chasis_no, per_page: page.per_page }
          const url = '/products/vin_search';
          let lang = JSON.parse(localStorage.getItem('lang')!);
          const params = { formType: 'vin', vin: chasis_no, lang: lang?.language_id }
          dispatch(updateUrl(url));
          dispatch(updateApiParamData(data));
          localStorage.setItem('apiUrlParam', url);
          localStorage.setItem('apiDataParam', JSON.stringify(data));
          updateSearchParams(params);
        }
       })
    
      // navigate(
      //   {
      //     pathname: '/searchproducts',
      //     search: `?formType=vin&vin_number=${chasis_no}&lang=${lang?.language_id}`,
      //   })
    }
  }
  const warningModalOpen = () => {
    setWarningOpen(true);
  };
  const warningModalClose = () => {
    setWarningOpen(false);
  };
  return (
    <>
      {loader}
      <div className="searchBychasisNo">
        {/* <!-- =No plate --> */}
        {selected_country?.country_id === 188 &&
          <div className="searchbox__panel searchbox__panel_width searchbox__panel-vin searchbox__panel-vehicleno mr-3 w-50" id="vin_search_sg">
            <div className='searchbox__title' style={{ fontWeight: '700', marginBottom: '20px' }}>{translation?.text_veh_plate}</div>

            <div className="tab-content" id="vin-tabContent">
              <div className="tab-pane fade show active" id="vin-number" role="tabpanel" aria-labelledby="vin-number-tab">
                <form onSubmit={handleSubmit}>
                  <div className="d-flex input-flex-block">
                    <div className="input-main-flex">
                      <input type="text" className="form-control w-100" id="vin_search_in" value={plate_no || ""}
                        onChange={handleChange}
                        aria-label="Vin or chassic no" placeholder="Eg : SJV8841C" />
                      {inputPlateNoError && <div className='input-error'>
                        Please Enter the Plate no.
                      </div>
                      }
                    </div>

                    <button type="submit" className="btn btn-search btn-middle search btn-blue btn-blue-lighten-hover"
                      aria-label="Search"><i className="icon icon-search-middle"></i><span>Search</span></button>
                  </div>
                </form>

              </div>
            </div>

          </div>
        }

        {/* <!-- =vin --> */}
        <div className={`searchbox__panel searchbox__panel_width  searchbox__panel-vin w-50 ${selected_country?.country_id === 188 ? '' : 'w-100'} `} id="vin_search_sg">

          <div className='searchbox__title' style={{ fontWeight: '700', marginBottom: '20px' }}>{translation?.text_vin_or_chassis}</div>

          <div className="tab-content" id="vin-tabContent">
            <div className="tab-pane fade show active" id="vin-number" role="tabpanel" aria-labelledby="vin-number-tab">
              <form onSubmit={handleChasisSubmit}>
                <div className="d-flex input-flex-block">
                  <div className="input-main-flex">
                    <input type="text" className="form-control w-100"
                      name="part_no"
                      value={chasis_no || ""}
                      onChange={handleChasisChange} aria-label="Vin or chassic no" placeholder="Eg : RT11008610" />
                    {inputChasisError && <div className='input-error'>
                      Please Enter the VIN or Chassis No.
                    </div>
                    }
                    {inputChasisErrorlength && <div className='input-error'>
                      A chassis number is 9 to 14 characters.
                      A VIN is 17 characters long.
                    </div>
                    }
                  </div>
                  <button type="submit" className="btn btn-search btn-middle search unable-flex btn-blue btn-blue-lighten-hover " aria-label="Search"><i className="icon icon-search-middle"></i><span>Search</span></button>
                </div>
              </form>

            </div>
          </div>

        </div>


      </div>
      <WarningCommonDialog
          open={openWrongVinWarning}
          onClose={warningVinSuggestionClose}
          title={""}
          color={"#0672ba"}
          errorText={''} 
          component={<VinNoCheckModal vinCheckResult={vinCheckResult} ></VinNoCheckModal>}
        />
    </>

  );
}

export default SearchBychasisNo;