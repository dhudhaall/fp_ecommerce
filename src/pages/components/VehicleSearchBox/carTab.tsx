import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  getProductsList,
  getFiltersList,
  searchByVinORChasis,
} from "../../../app/services/searchVehicle.service";
import {
  brandsList,
  modelsList,
  vehiclesList,
  enginesList,
  engine_nosList,
  bodiesList,
  classesList,
  yearsList,
} from "../../../app/services/dropdowns.service";
import { searchByVehicle } from "../../../app/services/searchVehicle.service";

import {
  Brand,
  Class,
  Body,
  Year,
  Engine,
  Engine_NO,
} from "../../../app/Models/dropdowns";
import useLoader from "../shared/Loader/useLoader";
import CommonDropDown from "../shared/CommonDropdown/CommonDropDown";
import { Pagination } from "../../../app/Models/pagination";
import MultiSelectDropDown from "../shared/CommonDropdown/MultiSelectDropDown";
import { useSelector } from "react-redux";
import { fetchProducts } from "../../../app/Store/Actions/CommonActions";
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/Store/store';
import { setSearchByVehicleForm, setSelectedBrandFilter, setSelectedBrandSubCategoryFilter, setSelectedFilters, setSelectedPartCategoryFilter, setSelectedPartSubCategoryFilter, setSelectedVehSubSystemFilter, setSelectedVehSystemFilter, updateApiParamData, updateUrl } from "../../../app/Store/Slice/productSearchSlice";
import { useRouter } from "next/router";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function CarTab(props: any) {
  const dispatch: AppDispatch = useDispatch();
  const selectedFilters = useSelector((state: RootState) => state.productSearch.selectedFilters);
  const loading = useSelector((state: RootState) => state.productSearch.loading);
  const page = useSelector((state: RootState) => state.productSearch.page);
  const vehicleForm = useSelector((state: RootState) => state.productSearch.vehicleForm);
  const router = useRouter();
  let { formType, veh_type, v_brand_id ,class_id, model_id , year, body_no, eng_vol, eng_no, lang, per_page} = router.query;
  const { VType, formPage, isModal, translation } = props;
  const [type, setType] = useState(VType);
  const [formPageName, setPageType] = useState(formPage);
  const [brands, setBrands] = useState([]);
  const [classes, setClasses] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [bodies, setBodies] = useState([]);
  const [engines, setEngines] = useState([]);
  const [engine_nos, setEngine_NO] = useState([]);

  const brand_id = formType === 'car' && veh_type == '1' && VType == '1' ? v_brand_id:
    formType === 'moto' && veh_type === '2' && VType === '2' ? v_brand_id : '';

   class_id = formType === 'car' && veh_type == '1' && VType == '1' ? class_id :
    formType === 'moto' && veh_type == '2' && VType == '2' ? class_id : '';

   model_id = formType === 'car' && veh_type == '1' && VType === '1' ? model_id :
    formType === 'moto' && veh_type == '2' && VType == '2' ? model_id : '';

   year = formType === 'car' && veh_type == '1' && VType == '1' ? year :
    formType === 'moto' && veh_type == '2' && VType == '2' ? year : '';

   body_no = formType === 'car' && veh_type == '1' && VType == '1' ? body_no :
    formType === 'moto' && veh_type === '2' && VType === '2' ? body_no : '';

   eng_vol = formType === 'car' && veh_type == '1' && VType == '1' ?eng_vol :
    formType === 'moto' && veh_type == '2' && VType == '2' ? eng_vol : '';

   eng_no = formType === 'car' && veh_type == '1' && VType == '1' ? eng_no! :
    formType === 'moto' && veh_type == '2' && VType == '2' ? eng_no : '';

  const [selectedBrand, setselectedBrand] = useState(formPage === 'searchPage' ? brand_id : '');
  const [selectedClass, setselectedClass] = useState(formPage === 'searchPage' ? class_id : '');
  const [selectedModel, setselectedModel] = useState(formPage === 'searchPage' ? model_id : '');
  const [selectedYear, setselectedYear] = useState(formPage === 'searchPage' ? year : '');
  const [selectedBody, setselectedBody] = useState(formPage === 'searchPage' ? body_no : '');
  const [selectedEngine, setselectedEngine] = useState(formPage === 'searchPage' ? eng_vol : '');
  const [selectedEngine_NO, setselectedEngine_NO] = useState(formPage === 'searchPage' ? eng_no : '');
 
  // console.log(brand_id, 'brand_id');
  // console.log(class_id, 'class_id');
  // console.log(model_id, 'model_id');
  // console.log(year, 'year');
  // console.log(body_no, 'body_no');
  // console.log(selectedBody, 'selectedBody');

  // console.log(eng_vol, 'eng_vol');
  // console.log(eng_no, 'eng_no');
  // console.log(VType, 'VType');
  // console.log(veh_type, 'veh_type');
  // console.log(selectedEngine_NO, 'selectedEngine_NO');
  // console.log(selectedEngine, 'selectedEngine');
  // console.log(selectedBrand, 'selectedBrand');
  // console.log(selectedModel, 'selectedModel');

  // console.log("selectedBrand", selectedBrand);
  // console.log("selectedClass", selectedClass);
  // console.log("selectedModel", selectedModel);
  // console.log("selectedYear", selectedYear);
  // console.log("selectedBody", selectedBody);

  const [disableClass, setdisableClass] = useState(true);
  const [disableModel, setdisableModel] = useState(true);
  const [disableYear, setdisableYear] = useState(true);
  const [disableBody, setdisableBody] = useState(true);
  const [disableEngine, setdisableEngine] = useState(true);
  const [disableEngine_NO, setdisableEngine_NO] = useState(true);
  const [hideClass, setHideClass] = useState(true);
  const [vehicleSearchError, setVehicleSearchError] = useState(false);
  const [loader, showLoader, hideLoader] = useLoader(); //initialize useLoader hook

  useEffect(() => {
    setPageType(formPage);
    getBrands();
    

    if (!isModal) {
      if (veh_type == '1') {
        if (formType === "car") {
          if (brand_id && model_id) {
           
            const data = {
              type: formType === "car" ? 1 : 2,
              v_brand_id: brand_id,
              model_id: model_id,
              year: year,
              body_no: body_no,
            };

            const payload = {
              veh_type: formType === "car" ? 1 : 2,
              v_brand_id: brand_id,
              class_id: class_id,
              model_id: model_id,
              year: year,
              body_no: body_no,
              eng_vol: eng_vol,
              eng_no: eng_no,
              p_brand_id: selectedFilters?.p_brand_id,
              sub_category_id: selectedFilters?.sub_category_id,
              part_category_id: selectedFilters?.part_category_id,
              part_sub_category_id: selectedFilters?.part_sub_category_id,
              vehicle_system_id: selectedFilters?.vehicle_system_id,
              sub_system_id: selectedFilters?.sub_system_id,
              per_page: page.per_page,
              page: page.next_page
            };

            // const url = "/products/vehicle_search";
            // dispatch(fetchProducts({ url, params: payload }));
            const data2 = {
              veh_type: 1,
              v_brand_id: brand_id,
              class_id: class_id,
              model_id: model_id,
              year: year,
              body_no: body_no,
              eng_vol: eng_vol,
              eng_no: eng_no
            }

            //dispatch(setSearchByVehicleForm(data2));

            setdisableClass(false);
            setdisableModel(false);
            setdisableBody(false);
            setdisableYear(false);
            setdisableEngine(false);
            setdisableEngine_NO(false);

            let classNum = "";
            if (class_id == "null") {
              classNum = "";
            } else {
              classNum = class_id as string;
            }

            setselectedBrand(brand_id);
            setselectedClass(classNum);
            setselectedModel(model_id);
            setselectedYear(year);
            setselectedBody(body_no);
            setselectedEngine(eng_vol);
            setselectedEngine_NO(eng_no);

            getClasses(data);
            getModels({
              type: formType === "car" ? 1 : 2,
              v_brand_id: brand_id,
            });
            getYears(data);
            getBodies(data);
            getEngines(data);
            getEngines_No(data);
          } else {
            setdisableClass(true);
            setdisableModel(true);
            setdisableBody(true);
            setdisableYear(true);
            setdisableEngine(true);
            setdisableEngine_NO(true);
          }
        }
      } else {
        if (formType === "moto") {
          if (brand_id && model_id) {
            const data = {
              type: 2,
              v_brand_id: brand_id,
              model_id: model_id,
              year: year,
              body_no: body_no,
            };

            const payload = {
              veh_type: 2,
              v_brand_id: brand_id,
              class_id: class_id,
              model_id: model_id,
              year: year,
              body_no: body_no,
              eng_vol: eng_vol,
              eng_no: eng_no,
              p_brand_id: selectedFilters?.p_brand_id,
              sub_category_id: selectedFilters?.sub_category_id,
              part_category_id: selectedFilters?.part_category_id,
              part_sub_category_id: selectedFilters?.part_sub_category_id,
              vehicle_system_id: selectedFilters?.vehicle_system_id,
              sub_system_id: selectedFilters?.sub_system_id,
              per_page: page.per_page,
              page: page.next_page
            };

          
            const data2 = {
              veh_type: 2,
              v_brand_id: brand_id,
              class_id: class_id,
              model_id: model_id,
              year: year,
              body_no: body_no,
              eng_vol: eng_vol,
              eng_no: eng_no
            }


            setdisableClass(false);
            setdisableModel(false);
            setdisableBody(false);
            setdisableYear(false);
            setdisableEngine(false);
            setdisableEngine_NO(false);

            let classNum = "";
            if (class_id == "null") {
              classNum = "";
            } else {
              classNum = class_id as string;
            }

            setselectedBrand(brand_id);
            setselectedClass(classNum);
            setselectedModel(model_id);
            setselectedYear(year);
            setselectedBody(body_no);
            setselectedEngine(eng_vol);
            setselectedEngine_NO(eng_no);

            getClasses(data);
            getModels(data);
            getYears(data);
            getBodies(data);
            getEngines(data);
            getEngines_No(data);
          }
        }
      }
    }

  }, []);

  useEffect(() => {
    setselectedModel(model_id); 
    setselectedYear(year);
    setselectedBody(body_no);
    setselectedEngine(eng_vol);
    setselectedEngine_NO(eng_no);
  }, [router.query])


  const getBrands = () => {
    showLoader();
    const data = { type: type };
    brandsList(data).then(
      (res: any) => {
        setBrands(res["data"]);
        if (res["data"]?.length === 1) {
          setselectedBrand(res["data"][0]["id"]);
        }
        hideLoader();
      },
      (err) => {
        hideLoader();
      }
    );
  };
  const selectBrand = (values: any) => {
    if (values) {
      const data = { type: type, v_brand_id: values?.["brand_id"] };
      setselectedBrand(values?.["brand_id"]);

      setdisableClass(false);
      setdisableModel(false);
      setdisableYear(true);
      setdisableBody(true);
      setdisableEngine(true);
      setdisableEngine_NO(true);

      setYears([]);
      setBodies([]);
      setEngines([]);
      setEngine_NO([]);

      getClasses(data);
      getModels(data);
    } else {
      setselectedBrand("");

    }
  };
  const getClasses = (data: any) => {
    showLoader();
    classesList(data).then(
      (res: any) => {
        setClasses(res["data"]);
        if (res["data"]?.length === 1) {
          setselectedClass(res["data"][0]["class_id"]);
        }
        hideLoader();
        res["data"].length ? setHideClass(true) : setHideClass(false);
      },
      (err) => {
        hideLoader();
      }
    );
  };
  const selectClass = (values: any) => {
    const data = {
      type: type,
      v_brand_id: selectedBrand,
      class_id: values.class_id,
    };
    setselectedClass(values?.class_id);
    setselectedModel("");
    setselectedYear("");
    setselectedBody("");
    setselectedEngine("");
    setselectedEngine_NO("");

    if (values) {
      getModels(data);
    }
  };
  const getModels = (data: any) => {

    showLoader();
    modelsList(data).then(
      (res: any) => {
        setModels(res["data"]);
        if (res["data"]?.length === 1) {
          setselectedModel(res["data"][0]["model_id"]);
          const data1 = {
            type: type,
            v_brand_id: data.v_brand_id,
            class_id: selectedClass,
            model_id: res["data"][0]["model_id"],
          };
          getYears(data1);
          getBodies(data1);
          getEngines(data1);
          getEngines_No(data1);

          setdisableYear(false);
          setdisableBody(false);
          setdisableEngine(false);
          setdisableEngine_NO(false);
        }
        hideLoader();
      },
      (err) => {
        hideLoader();
      }
    );
  };

  const selectModel = (values: any) => {
  
    if (values.length > 0) {
      setVehicleSearchError(false)

      var ids = values?.map((s: any) => s.model_id);
      var model_ids = ids.toString();
      setselectedModel(model_ids);
    }else{
      setselectedModel('');
    }
    
    setselectedYear("");
    setselectedBody("");
    setselectedEngine("");
    setselectedEngine_NO("");
    if (model_ids) {
      const data = {
        type: type,
        v_brand_id: selectedBrand,
        class_id: selectedClass,
        model_id: model_ids,
      };
      getYears(data);
      getBodies(data);
      getEngines(data);
      getEngines_No(data);


      setdisableYear(false);
      setdisableBody(false);
      setdisableEngine(false);
      setdisableEngine_NO(false);
    }
  };

  const getYears = (data: any) => {
    showLoader();
    yearsList(data).then(
      (res: any) => {
        setYears(res["data"]);
        if (res["data"]?.length === 1) {
          setselectedYear(res["data"][0]["id"]);
        }
        hideLoader();
      },
      (err) => {
        hideLoader();
      }
    );
  };
  const selectYear = (values: any) => {
    setselectedYear(values.id);
    setselectedBody("");
    setselectedEngine("");
    setselectedEngine_NO("");
    if (values) {
      const data = {
        type: type,
        v_brand_id: selectedBrand,
        class_id: selectedClass,
        model_id: selectedModel,
        year: values?.["id"],
      };

      getBodies(data);
      getEngines(data);
      getEngines_No(data);
    }
  };
  const getBodies = (data: any) => {
    showLoader();
    bodiesList(data).then(
      (res: any) => {
        setBodies(res["data"]);
        if (res["data"]?.length === 1) {
          setselectedBody(res["data"][0]["id"]);
        }
        hideLoader();
      },
      (err) => {
        hideLoader();
      }
    );
  };
  const selectBody = (values: any) => {
   
    setselectedBody(values.id);
    setselectedEngine("");
    setselectedEngine_NO("");
    if (values) {
      const data = {
        type: type,
        v_brand_id: selectedBrand,
        class_id: selectedClass,
        model_id: selectedModel,
        year: selectedYear,
        body_no: values?.["id"],
      };

      getEngines(data);
      getEngines_No(data);
    }
  };
  const getEngines = (data: any) => {
    showLoader();
    enginesList(data).then(
      (res: any) => {
        setEngines(res["data"]);
        if (res["data"]?.length === 1) {
          setselectedEngine(res["data"][0]["id"]);
        }
        hideLoader();
      },
      (err) => {
        hideLoader();
      }
    );
  };

  const selectEngine = (values: any) => {
    //console.log('in engine')
    if (values) {
      const data = {
        type: type,
        v_brand_id: selectedBrand ? selectedBrand : null,
        class_id: selectedClass ? selectedClass : 0,
        model_id: selectedModel ? selectedModel : null,
        year: selectedYear ? selectedYear : null,
        body_no: selectedBody ? selectedBody : null,
        eng_vol: values?.["id"],
      };
      setselectedEngine(values?.["id"]);
      setselectedEngine_NO("");
      getEngines_No(data);
    }
  };
  const getEngines_No = (data: any) => {
    //console.log('in engine no')
    showLoader();
    engine_nosList(data).then(
      (res: any) => {
        setEngine_NO(res["data"]);
        if (res["data"]?.length === 1) {
          setselectedEngine_NO(res["data"][0]["id"]);
        }
        hideLoader();
      },
      (err) => {
        hideLoader();
      }
    );
  };
  const selectEngine_No = (values: any) => {
    setselectedEngine_NO(values.id);
  };

  const submitForm = () => {
    let lang = JSON.parse(localStorage.getItem('lang')!);
    const data = {
      veh_type: type,
      v_brand_id: selectedBrand ? selectedBrand : "",
      class_id: selectedClass ? selectedClass : 0,
      model_id: selectedModel ? selectedModel : "",
      year: selectedYear ? selectedYear : "",
      body_no: selectedBody ? selectedBody : "",
      eng_vol: selectedEngine ? selectedEngine : "",
      eng_no: selectedEngine_NO ? selectedEngine_NO : "",
      per_page: page.per_page,
      lang: lang?.language_id,
    };
    if (selectedModel) {
      const url = "/products/vehicle_search";
      dispatch(updateUrl(url));
      dispatch(updateApiParamData(data));
      localStorage.setItem('apiUrlParam', url);
      localStorage.setItem('apiDataParam', JSON.stringify(data));
      router.push({

        query: {
          formType: Number(type) === 1 ? "car" : "moto",
          veh_type: type,
          v_brand_id: data.v_brand_id,
          class_id: data.class_id.toString(),
          model_id: data.model_id,
          year: data.year,
          body_no: data.body_no,
          eng_vol: data.eng_vol,
          eng_no: data.eng_no,
          lang: lang?.language_id,
          page:page,
          per_page:per_page
        }
      }
        
     )
     
      dispatch(setSelectedFilters({}));
      dispatch(setSelectedBrandFilter([]));
      dispatch(setSelectedPartCategoryFilter([]));
      dispatch(setSelectedPartSubCategoryFilter([]));
      dispatch(setSelectedBrandSubCategoryFilter([]));
      dispatch(setSelectedVehSystemFilter([]));
      dispatch(setSelectedVehSubSystemFilter([]));
      dispatch(setSearchByVehicleForm({
        veh_type: type,
        v_brand_id: selectedBrand ? selectedBrand : "",
        class_id: selectedClass ? selectedClass : 0,
        model_id: selectedModel ? selectedModel : "",
        year: selectedYear ? selectedYear : "",
        body_no: selectedBody ? selectedBody : "",
        eng_vol: selectedEngine ? selectedEngine : "",
        eng_no: selectedEngine_NO ? selectedEngine_NO : "",
      }));
      if (isModal) {
        props.closeModal();
      }

    } else {
      setVehicleSearchError(true)
    }

  };


  // useEffect(() => {
  //   //selectModel();
  //   if (!isNaN(parseInt(selectedModel))) {
  //     const data = {
  //       type: type,
  //       v_brand_id: selectedBrand,
  //       class_id: selectedClass,
  //       model_id: selectedModel,
  //     };

  //     getYears(data);
  //     getBodies(data);
  //     getEngines(data);
  //     getEngines_No(data);

  //     setdisableYear(false);
  //     setdisableBody(false);
  //     setdisableEngine(false);
  //     setdisableEngine_NO(false);
  //   }
  // }, [selectedModel])

  return (
    <>
      {loader}

      <div className="cartab">
        <div
          className="tab-pane fade show active"
          id="car"
          role="tabpanel"
          aria-labelledby="car-tab"
        >
          {/* <!-- =car-tab --> */}
          <div className="car-tab-layout">
            <div className="row">
              <div className="vehicle-control vehicle-maker">
                {/* <!-- vehicle-maker --> */}
                <CommonDropDown
                  list={brands}
                  bindLabel={"brand"}
                  bindValue={"brand_id"}
                  fieldName={"brand"}
                  placeholder={translation?.text_make}
                  selectedItem={selectBrand}
                  defaultValue={selectedBrand}
                  disabled={false}
                ></CommonDropDown>


                {/* <Autocomplete
                  className="form-control fonts"
                  id="size-small-standard"
                  size="small"
                  options={brands}
                  sx={{
                    width: "100%",
                    ".MuiFormControl-root": { height: "100%" },
                    ".MuiInputBase-root": { height: "100%" },
                    ".MuiAutocomplete-endAdornment": {
                      right: "-6px",
                      top: "calc(50% - 18px)",
                    },
                    ".MuiInputBase-input": {
                      fontSize: "14px !important",
                      color: "#212529",
                    },
                  }}
                  getOptionLabel={(option: Brand) => option.brand}
                  onChange={selectBrand}
                  defaultValue={brands[1]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder="Make"
                    />
                  )}
                />  */}
              </div>
              {hideClass && (
                <div className="vehicle-control vehicle-className">
                  <CommonDropDown
                    list={classes}
                    bindLabel={"class"}
                    bindValue={"class_id"}
                    fieldName={"class"}
                    placeholder={translation?.text_class}
                    selectedItem={selectClass}
                    defaultValue={selectedClass}
                    disabled={disableClass}
                  ></CommonDropDown>
                  {/* <Autocomplete
                    className="form-control fonts"
                    id="size-small-standard"
                    size="small"
                    options={classes}
                    sx={{
                      width: "100%",
                      ".MuiFormControl-root": { height: "100%" },
                      ".MuiInputBase-root": { height: "100%" },
                      ".MuiAutocomplete-endAdornment": {
                        right: "-6px",
                        top: "calc(50% - 18px)",
                      },
                      ".MuiSvgIcon-root": {
                        width: "31px",
                        height: "31px",
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        color: "#0099ff",
                      },
                      ".MuiInputBase-input": {
                        fontSize: "14px !important",
                        color: "#212529",
                      },
                    }}
                    getOptionLabel={(option: Class) => option.class}
                    onChange={selectClass}
                    disabled={disableClass}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        placeholder="Class"
                      />
                    )}
                  /> */}
                </div>
              )}
              <div className="vehicle-control vehicle-model">
                {/* <!-- vehicle-model --> */}
                {/* <CommonDropDown list={models}  bindLabel={'model'}  bindValue={'model_id'} fieldName={'model'}  placeholder={'Model'}  selectedItem={selectModel} 
                  defaultValue={selectedModel} 
                  disabled={disableModel}
                ></CommonDropDown> */}
                <MultiSelectDropDown
                  list={models}
                  bindLabel={'model'}
                  bindValue={'model_id'}
                  fieldName={'model'}
                  placeholder={translation?.text_model}
                  selectedItem={selectModel}
                  defaultValue={selectedModel}
                  disabled={disableModel}></MultiSelectDropDown>
                {/* <Autocomplete 
                  multiple  
                  className="form-control fonts" 
                  id="size-small-standard" 
                  size="small" 
                  options={models} 
                  disableCloseOnSelect={true} 
                  sx={{ 
                    width: "100%",
                    ".MuiFormControl-root": { height: "100%" },
                    ".MuiInputBase-root": { height: "100%" },
                    ".MuiAutocomplete-endAdornment": {
                      right: "-6px",
                      top: "calc(50% - 18px)",
                    },

                    ".MuiInputBase-input": {
                      fontSize: "14px !important",
                      color: "#212529",
                    },
                  }}
                  getOptionLabel={(option: any) => option?.["model"]}
                  onChange={selectModel}
                  disabled={disableModel}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        className="modal-checkbox"
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8, fontSize: "30px !important" }}
                        checked={selected}
                      />
                      {option.model}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder="Model"
                    />
                  )}
                /> */}
              </div>
              <div className="vehicle-control vehicle-year">
                {/* <!--vehicle-year  --> */}
                <CommonDropDown
                  list={years}
                  bindLabel={"caption"}
                  bindValue={"id"}
                  fieldName={"year"}
                  placeholder={translation?.text_year}
                  selectedItem={selectYear}
                  defaultValue={selectedYear}
                  disabled={disableYear}
                ></CommonDropDown>
                {/* <Autocomplete
                  className="form-control fonts"
                  id="size-small-standard"
                  size="small"
                  options={years}
                  sx={{
                    width: "100%",
                    ".MuiFormControl-root": { height: "100%" },
                    ".MuiInputBase-root": { height: "100%" },
                    ".MuiAutocomplete-endAdornment": {
                      right: "-6px",
                      top: "calc(50% - 18px)",
                    },

                    ".MuiInputBase-input": {
                      fontSize: "14px !important",
                      color: "#212529",
                    },
                  }}
                  getOptionLabel={(option: Year) => option.id.toString()}
                  onChange={selectYear}
                  disabled={disableYear}
                  defaultValue={years[4]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder="Year"
                    />
                  )}
                /> */}
              </div>
              <div className="vehicle-control vehicle-body">
                {/* <!-- vehicle-body --> */}
                <CommonDropDown
                  list={bodies}
                  bindLabel={"caption"}
                  bindValue={"id"}
                  fieldName={"body"}
                  placeholder={translation?.text_body}
                  selectedItem={selectBody}
                  defaultValue={selectedBody}
                  disabled={disableBody}
                ></CommonDropDown>
                {/* <Autocomplete
                  className="form-control fonts"
                  id="size-small-standard"
                  size="small"
                  options={bodies}
                  sx={{
                    width: "100%",
                    ".MuiFormControl-root": { height: "100%" },
                    ".MuiInputBase-root": { height: "100%" },
                    ".MuiAutocomplete-endAdornment": {
                      right: "-6px",
                      top: "calc(50% - 18px)",
                    },

                    ".MuiInputBase-input": {
                      fontSize: "14px !important",
                      color: "#212529",
                    },
                  }}
                  getOptionLabel={(option: Body) => option.caption}
                  onChange={selectBody}
                  disabled={disableBody}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder="Body"
                    />
                  )}
                /> */}
              </div>
              <div className="vehicle-control vehicle-engine">
                {/* <!--vehicle-engine--> */}
               
                <CommonDropDown
                  list={engines}
                  bindLabel={"caption"}
                  bindValue={"id"}
                  fieldName={"engine"}
                  placeholder={translation?.text_engine}
                  selectedItem={selectEngine}
                  defaultValue={selectedEngine}
                  disabled={disableEngine}
                ></CommonDropDown>
                {/* <Autocomplete
                  className="form-control fonts" 
                  id="size-small-standard"
                  size="small"
                  options={engines}
                  sx={{
                    width: "100%",
                    ".MuiFormControl-root": { height: "100%" },
                    ".MuiInputBase-root": { height: "100%" },
                    ".MuiAutocomplete-endAdornment": {
                      right: "-6px",
                      top: "calc(50% - 18px)",
                    },

                    ".MuiInputBase-input": {
                      fontSize: "14px !important",
                      color: "#212529",
                    },
                    "MuiTouchRipple-root": {
                      backgroundColor: "unset !important",
                    },
                  }}
                  getOptionLabel={(option: Engine) => option.caption}
                  onChange={selectEngine}
                  disabled={disableEngine}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder="Engine"
                    />
                  )}
                /> */}
              </div>
              <div className="vehicle-control vehicle-engineno">
                {/* <!-- vehicle-engineNo --> */}
               
                <CommonDropDown
                  list={engine_nos}
                  bindLabel={"caption"}
                  bindValue={"id"}
                  fieldName={"engine_no"}
                  placeholder={translation?.text_engineno}
                  selectedItem={selectEngine_No}
                  defaultValue={selectedEngine_NO}
                  disabled={disableEngine_NO}
                ></CommonDropDown>
                {/* <Autocomplete
                  className="form-control fonts"
                  id="size-small-standard"
                  size="small"
                  options={engine_nos}
                  sx={{
                    width: "100%",
                    ".MuiFormControl-root": { height: "100%" },
                    ".MuiInputBase-root": { height: "100%" },
                    ".MuiAutocomplete-endAdornment": {
                      right: "-6px",
                      top: "calc(50% - 18px)",
                    },

                    ".MuiInputBase-input": {
                      fontSize: "14px !important",
                      color: "#212529",
                    },
                  }}
                  getOptionLabel={(option: Engine_NO) => option.caption}
                  onChange={selectEngine_No}
                  disabled={disableEngine_NO}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder="Engine No"
                    />
                  )} 
                /> */}
              </div>
              {vehicleSearchError &&
                <p className="error"> Please select atleast 1 model</p>
              }
            </div>
            <div className="btn_submit_row ">
              <button
                type="submit"
                className="btn btn-search btn-big btn-blue btn-blue-lighten-hover min-wh"
                aria-label="Search"
                onClick={submitForm}
              >
                <i className="icon icon-search-big"></i>Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarTab;
