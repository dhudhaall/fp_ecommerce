import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {TabList, TabPanel, TabContext} from '@mui/lab';
import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CarTab from './carTab';
import MotoTab from './motoTab';
import { Country } from '../../../app/Models/dropdowns';
import ShareDataService from '../../../app/services/shareData.service';
import { getTranslation } from '../../../app/Lang/lang.service';
import { useSelector } from 'react-redux';

const VehicleSearch = (props: any) =>  {
  const selected_country = useSelector((state: any) => state.loadCart.country);
  const topBarTranslations = useSelector((state: any) => state.loadCart.topBarTranslations);
  const { type, formPage, isModal } = props;

  const [value, setValue] = useState(type?.toString() || '1');
  const [modelType, setModelType] = useState(0);
  const [formPageName, setFormPage] = useState(formPage);
  const [translation_Veh, setVehTranslation] = useState({} as any);
  const [langId, setLangId] = useState({} as any);

  const trans = useSelector((state: any) => state.lang);

  const [translation, setTranslation] = useState({} as any);

  useEffect(() => {
    setTranslation(trans);
    vehTransLation()
  }, [trans])

  useEffect(() => {
    setFormPage(formPage);

  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const vehicleModalClose = () => {
    //props.closeCommonDialogFromChild()
  }
  const selectModelType = (e: any) => {
    setModelType(e.target.value);
  }

  const vehTransLation = () => {
    let langID = JSON.parse(localStorage.getItem('lang')!);
    setLangId(JSON.parse(localStorage.getItem('lang')!))
    getTranslation(langID?.language_id, "module/appsearch-widget").then((res: any) => {
      setVehTranslation(res['data'])
    })
  }

  return (
    <div className="vehicleSearch">
      <div className='position-relative vehicle_Search_width'>
        <TabContext value={value}  >
          <Box sx={{ '.MuiTabs-indicator': { border: 3, borderColor: '#0672ba', backgroundColor: 'transparent', borderRadius: 20, height: '37px', bottom: '10px' }, '.MuiButtonBase-root': { minWidth: '63px', fontSize: '15px', fontWeight: '600', paddingTop: '9px', minHeight: '36px', color: '#000000', textTransform: "capitalize" }, '.Mui-selected': { color: '#000000 !important' } }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label={translation_Veh?.text_car} value="1" />
              <span className='Line'></span>
              <Tab label={translation_Veh?.text_moto} value="2" />
            </TabList>
            <div className="filters">
              {selected_country?.country_id === 188 &&
                <div className="veh-only d-flex align-items-center">
                  <span className="veh-only_label veh-only_label_home">{translation_Veh?.text_common_sg_vehicle_home}</span>

                  <div className="btn-group btn-group-toggle main-flex" data-toggle="buttons">
                    <label className={`btn btn-primary btn-small btn-standart flex-1 d-flex justify-content-between align-items-center ${modelType == 0 ? 'active' : ''}`}>
                      <div>
                        <i className="icon-ok mr-2"></i>
                        {/* <i className=" chk-label fa fa-check"></i> */}
                      </div>
                      <input onChange={(e: any) => selectModelType(e)} type="radio" name="veh-only" value="0" className="js-sg-only js-sg-only_off" /> {translation_Veh?.text_common_veh_only_off}</label>
                    <label className={`btn btn-primary btn-small btn-standart flex-2 d-flex justify-content-between align-items-center text-xs ${modelType == 1 ? 'active' : ''}`}>
                      <div>
                        <i className="icon-ok mr-2"></i>
                      </div>
                      <input onChange={(e: any) => selectModelType(e)} type="radio" name="veh-only" value="1" className="js-sg-only js-sg-only_on" /> {translation_Veh?.text_common_veh_only_on}</label>
                  </div>

                </div>
              }
            </div>
          </Box>
          <div className="tab-content " id="car-tabContent">
            <TabPanel value="1" sx={{ '.MuiTabPanel-root': { padding: 'unset' } }}>
              {/* <!-- =car-tab --> */}

              <CarTab
                translation={translation_Veh}
                VType={value}
                formPage={formPageName}
                closeModal={props.closeCommonDialogFromChild}
                isModal={props.isModal}
              />
            </TabPanel>

            <TabPanel value="2">
              {/* <!-- =moto-tab --> */}
              <CarTab
                translation={translation_Veh}
                VType={value}
                formPage={formPageName}
                closeModal={props.closeCommonDialogFromChild}
                isModal={props.isModal}
                
              />
            </TabPanel>
            {/* <!-- =hd-tab --> */}
          </div>
        </TabContext>
      </div>


    </div>
  );
}

export default VehicleSearch;