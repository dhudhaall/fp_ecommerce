import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { sizeDropDowns } from "../../../app/services/dropdowns.service";
// import "./main-bar.scss";
import {useSearchParams } from "next/navigation";
import useLoader from "../shared/Loader/useLoader";
import { AppDispatch, RootState } from "../../../app/Store/store";
import { useDispatch, useSelector } from "react-redux";
import { setSearchBySizeForm, updateUrl, updateApiParamData } from "../../../app/Store/Slice/productSearchSlice";
import { useRouter } from "next/router";

const SearchBySize = (props: any) => {
  const router = useRouter();

  const { profile_id, type_id, fields, approximation} =router.query;
  const dispatch: AppDispatch = useDispatch();
0
  let sizeProfile = Number(profile_id);
  let sizeType = Number(type_id);
  let sizeFields =fields;
  let sizeApproximation = Number(approximation);

  const [dropdowns, setDropdowns] = useState({} as any);
  const [sub_fields, setSub_fields] = useState([] as any);
  const [profiles, setProfiles] = useState([] as any);
  const [selectedType, setselectedType] = useState({ type_id: sizeType ? sizeType : 0, type_name: '' } as any);
  const [selectedSubField, setselectedSubField] = useState(sizeFields);
  const [selectedProfile, setSelectedProfile] = useState(sizeProfile ? sizeProfile : 0);
  const [selectedApproximation, setApproximation] = useState(sizeApproximation ? sizeApproximation : 3);
  const [def_index, setdef_index] = useState(0);
  const [showTypeError, setTypeError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [formData, setSizeFormData] = useState({} as any);
  const [formPage, setformPage] = useState(props.formPage);
  const [loader, showLoader, hideLoader] = useLoader(); //initialize useLoader hook
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  // const loading = useSelector((state: RootState) => state.productSearch.loading);

  const page = useSelector((state: RootState) => state.productSearch.page);
  const isApiCallFromSearchParams = useSelector((state: RootState) => state.productSearch.isApiCallFromSearchParams);

  // useEffect(() => {
  //   getDropdowns();

  //   const data = {
  //     type: "size",
  //     type_id: sizeType,
  //     profile_id: sizeProfile,
  //     fields: sizeFields,
  //     approximation: sizeApproximation,
  //     per_page: page.per_page,
  //   };

  //   // if (sizeType && sizeFields && sizeApproximation && isApiCallFromSearchParams) {
  //   //   const url = "/products/size_search";
  //   //   dispatch(fetchProducts({ url, params: data }));
  //   // }

  //   // isApiCallFromSearchParams
  //   dispatch(setSearchBySizeForm(data));
  //   //dispatch(resetProductsList());

  // }, []);

  useEffect(() => {
    getDropdowns();
    const data = {
      type: "size",
      type_id: sizeType,
      profile_id: sizeProfile,
      fields: sizeFields,
      approximation: sizeApproximation,
      per_page: page.per_page,
    };
    dispatch(setSearchBySizeForm(data));
  }, [router.query])

  const closeModal = () => {
    props.handleSearchBySizeCloseModal(true);
  };

  const getDropdowns = () => {
    showLoader();
    if (props.sizeFormPageData === undefined || Object.keys(props.sizeFormPageData) === undefined || Object.keys(props.sizeFormPageData)?.length === 0) {
      sizeDropDowns().then(res => {
        setDropdowns(res['data']);
        if (props.sizeFormPageData !== undefined) {
          props.updateSizeFormPageData(res['data']);
        }
        let def_inex = res["data"]["types"]?.findIndex(
          (item: any) => item.type_id == Number(type_id)
        );
        setdef_index(def_inex);

        if (def_inex >= 0) {
          setTypeError(false);
        }
        res['data']['types'][def_inex ? def_inex : 0]?.['sub_fields'].map((val: any) => sizeFields?.find((ele: any) => {

          if (ele.id == val.field_id) {
            val.value = ele.value;
          }
        }))
        if (sizeFields?.length > 0) {
          setInputError(false);
        }
        res['data']['types'][def_inex ? def_inex : 0]?.['profiles']?.map((val: any) => {
          val.isSelected = false;
        })

        setProfiles(
          res["data"]["types"][def_inex ? def_inex : 0]?.["profiles"]
        );
        setSub_fields(
          res["data"]["types"][def_inex ? def_inex : 0]?.["sub_fields"]
        );
        hideLoader();
      },
        (error) => {
          hideLoader();
        }
      );
    } else {
      setDropdowns(props.sizeFormPageData);
      //props.updateSizeFormPageData(res['data']);
      let def_inex = props.sizeFormPageData["types"]?.findIndex(
        (item: any) => item.type_id == Number(type_id)
      );
      setdef_index(def_inex);

      if (def_inex >= 0) {
        setTypeError(false);
      }
      props.sizeFormPageData['types'][def_inex ? def_inex : 0]?.['sub_fields'].map((val: any) => sizeFields?.find((ele: any) => {

        if (ele.id == val.field_id) {
          val.value = ele.value;
        }
      }))
      if (sizeFields?.length > 0) {
        setInputError(false);
      }
      props.sizeFormPageData['types'][def_inex ? def_inex : 0]?.['profiles']?.map((val: any) => {
        val.isSelected = false;
      })

      setProfiles(
        props.sizeFormPageData["types"][def_inex ? def_inex : 0]?.["profiles"]
      );
      setSub_fields(
        props.sizeFormPageData["types"][def_inex ? def_inex : 0]?.["sub_fields"]
      );
      hideLoader();
    }
  };

  const selectType = (event: any, values: any) => {
    if (values) {
      values["sub_fields"]?.map((val: any) => {
        val.value = "";
      });
      values["profiles"]?.map((val: any) => {
        val.isSelected = false;
      });
      setselectedType(values);

      setProfiles(values["profiles"]);
      setSub_fields(values["sub_fields"]);
      if (selectedType) {
        setTypeError(false);
      }
    } else {
      setselectedType({} as any);
      setProfiles({} as any);
      setSub_fields({} as any);
      hideLoader();
    }
  };

  const onChangeSubFields = (event: any, index: number) => {
    let data = [...sub_fields];

    data[index]["value"] = event.target.value;
    setSub_fields(data);

    if (data[index]["value"]) {
      setInputError(false);
    }
  };

  const selectProfile = (profile_id: number) => {
    setSelectedProfile(profile_id);
  };
  const selectApproximation = (value: number) => {
    setApproximation(value);
  };

  const submitForm = () => {

    if (!selectedType["type_id"]) {
      setTypeError(true);
    } else if (!sub_fields?.some((item: any) => item.value !== "")) {
      setInputError(true);

    } else {
      let fields: any[] = [];

      sub_fields.forEach((f: any) => {
        if (f.value) {
          fields.push({ id: f.field_id, value: f.value });
        }
      });

      const data = {
        type: "size",
        type_id: selectedType["type_id"],
        profile_id: selectedProfile,
        fields: fields,
        approximation: selectedApproximation,
        page: 1,
        per_page: page.per_page,
      };
      const url = "/products/size_search";
      const params = {
        formType: 'size',
        type_id: data.type_id,
        profile_id: data.profile_id.toString(),
        fields: JSON.stringify(data.fields),
        approximation: data.approximation.toString(),
      }

      const data2 = {
        type: "size",
        type_id: selectedType["type_id"],
        profile_id: selectedProfile,
        fields: fields,
        approximation: selectedApproximation,
      };

      // searchParams.delete('formType');
      // searchParams.set('type_id', data.type_id);
      // searchParams.set('profile_id', data.profile_id.toString());
      // searchParams.set('fields', JSON.stringify(data.fields));
      // searchParams.set('approximation', data.approximation.toString());

      //dispatch(resetProductsList());

      dispatch(setSearchBySizeForm(data2))

      dispatch(updateUrl(url));
      dispatch(updateApiParamData(data));
      localStorage.setItem('apiUrlParam', url);
      localStorage.setItem('apiDataParam', JSON.stringify(data));
      props.updateSearchParams(params);

      if (props.isModal === true) {
        props.closeCommonDialogFromChild(true);
      }
      // navigate({
      //   pathname: "/searchproducts",
      //   search: `?formType=size&${searchParams.toString()}`,
      // });
      //setIsSubmitted(true);
      //dispatch(fetchProducts({ url, params: data }));
      //dispatch(cancelApiCallFromSearchParams());
    }
  };

  return (
    <>
      {loader}
      <div className="SearchBySizeModal`">
        <div className="searchBySize">

          <form>
            <div className="type_id_wrapper sizeModalWidth">
              {dropdowns["types"]?.length && (
                <div className="partsInputs mt-5">
                  <Autocomplete
                    className="form-control fonts size-drop"
                    id="size-small-standard"
                    size="small"
                    options={dropdowns["types"]}
                    sx={{
                      width: "270px",
                      ".MuiFormControl-root": { height: "100%" },
                      ".MuiInputBase-root": { height: "100%" },
                      ".MuiAutocomplete-endAdornment": {
                        right: "-6px",
                        top: "calc(50% - 18px)",
                      },
                      ".MuiSvgIcon-root": {
                        width: "31px",
                        height: "31px",
                        backgroundColor: "#0099ff",
                        borderRadius: "50%",
                        color: "#ffffff",
                      },
                      ".MuiInputBase-input": {
                        fontSize: "14px !important",
                        color: "#212529",
                      },
                    }}
                    getOptionLabel={(option: any) => option.type_name}
                    onChange={selectType}
                    defaultValue={dropdowns["types"][def_index]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        placeholder="Parts Type"
                      />
                    )}
                  />
                </div>
              )}

              {showTypeError &&
                <p className="error">Select Type First</p>}
            </div>

            <div id="spec_fields_id" className="spec_fields">
              <div className="subtype">
                {profiles?.length > 0 && <p>Chose your type</p>}
                <div className="subtype-list d-flex flex-wrap">
                  {profiles?.length > 0 &&
                    profiles.map((item: any, index: number) => (
                      <div className="subtype-item" key={index}>
                        {item.profile_id}
                        <input
                          checked={selectedProfile == item.profile_id}
                          onChange={(e: any) =>
                            selectProfile(item["profile_id"])
                          }
                          type="radio"
                          id={"popProfile" + [index]}
                          name="profile_id"
                          value={item.profile_id}
                        />
                        <label
                          className="ss_profile"
                          htmlFor={"popProfile" + [index]}
                        >
                          <img src={item.profile_image}></img>
                        </label>
                      </div>
                    ))}
                </div>
              </div>

              <div className="row size-input-row">
                {sub_fields?.length > 0 &&
                  sub_fields.map((item: any, i: number) => (
                    <div
                      className="col-sm-5 col-lg-5 mb-3 size-input-inProduct "
                      key={i}
                    >
                      <div className="d-flex align-items-center flex-wrap main-input-flex">
                        <label>{item.field_name}</label>
                        {item["field_type"] === "text" && (
                          <input
                            className="form-control size-spec"
                            value={item.value}
                            type={item.field_type}
                            name={item.field_name}
                            onChange={(e: any) => onChangeSubFields(e, i)}
                          />
                        )}
                        {item["field_type"] === "select" && (
                          <div className="flex-basis-input">
                            <select
                              className="Custom-Select"
                              name={item.field_name}
                              onChange={(e: any) => onChangeSubFields(e, i)}
                            >
                              <option></option>
                              {item["dropdowns"].length > 0 &&
                                item["dropdowns"].map(
                                  (res: any, index: number) => (
                                    <option
                                      key={"option-" + i + "-" + index}
                                      value={res}
                                    >
                                      {res}
                                    </option>
                                  )
                                )}
                            </select>
                            <span className="drop-btn-select icon-caret"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                {inputError && (

                  <p className="error">Enter At least One dimension</p>
                )}
              </div>
            </div>

            <div className="approximation_block">
              <p>Approximation</p>
              <div className="btn-group">
                {dropdowns["approximations"]?.length &&
                  dropdowns["approximations"].map((item: any, i: number) => (
                    <span key={i}>
                      <input
                        onChange={(e: any) => selectApproximation(item)}
                        checked={item == selectedApproximation}
                        className="input_approximation"
                        type="radio"
                        name="approximation"
                        id={`popapproximation${item}`}
                      />
                      <label
                        className="label-font"
                        htmlFor={`popapproximation${item}`}
                      >
                        {" "}
                        +/- {item} mm
                      </label>
                    </span>
                  ))}
              </div>
            </div>
            <div id="searchbysizeModal">
              <button
                type="button"
                onClick={() => submitForm()}
                className="btn btn-submit btn-blue btn-blue-lighten-hover btn-large"
              >
                <i className="icon icon-search-middle"></i>Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchBySize;
