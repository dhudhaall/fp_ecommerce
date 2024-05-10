import React, { useState } from "react";
import "./vehicleSearchBox.scss";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import VehicleSearchBySizeModal from "../../shared/mainBar/vehicleSearchBySizeModal";
import CommonDialog from "../../shared/CommonDialog/CommonDialog";
import { Pagination } from "../../Models/pagination";
import { useDispatch } from "react-redux";
import { updateApiParamData, updateUrl } from "../../Store/Slice/productSearchSlice";

function SearchByPartNo(props: any) {
  const page = new Pagination();
  const dispatch = useDispatch();
  const [part_no, setPartNo] = useState("");
  const [inputError, setError] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpen] = useState(false);
  const [openSearchBySizeModal, setSizeOpen] = useState(false);
  const { translation, updateSearchParams } = props;
  const handleChange = (event: any) => {
    setPartNo(event.target.value);
    if (part_no) {
      setError(false);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (part_no == "") {
      setError(true);
    } else {
      const data = { part_no: part_no, per_page: page.per_page }
      const url = '/products/part_search';
      let lang = JSON.parse(localStorage.getItem("lang")!);
      const params = { formType: 'partnumber', part_no: part_no, lang: lang?.language_id };
      dispatch(updateUrl(url));
      dispatch(updateApiParamData(data));
      localStorage.setItem('apiUrlParam', url);
      localStorage.setItem('apiDataParam', JSON.stringify(data));
      updateSearchParams(params);
      // navigate({
      //   pathname: "/searchproducts",
      //   search: `?formType=partnumber&part_no=${part_no}&lang=${lang?.language_id}`,
      // });
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchBySizeModalOpen = () => {
    handleClose();
    setSizeOpen(true);
  };

  const handleSearchBySizeCloseModal = () => {
    setSizeOpen(false);
  };
  const dataFromSizeSearch = (data: any) => { };
  return (
    <div className="searchByPartNo">
      <ul className="nav d-flex searchbox__title" id="part-tab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="part-number-tab"
            style={{ cursor: "auto" }}
          >
            {translation?.text_part_numb}
          </a>
        </li>
        <li className="separator"></li>
        <li className="nav-item part-size">
          <button
            type="button"
            className="nav-link part-size"
            id="part-size-tab"
            style={{ cursor: "auto" }}
            onClick={handleSearchBySizeModalOpen}
          >
            {translation?.text_part_size}
          </button>
        </li>
      </ul>

      <div className="tab-content" id="part-tabContent">
        <div
          className="tab-pane fade show active"
          id="part-number"
          role="tabpanel"
          aria-labelledby="part-number-tab"
        >
          <form onSubmit={handleSubmit}>
            <div className="d-flex">
              <div className="input-main-flex">
                <input
                  type="text"
                  className="form-control w-100"
                  name="part_no"
                  value={part_no || ""}
                  onChange={handleChange}
                  placeholder="Example : 04465-13020"
                />
                {inputError && (
                  <div className="input-error">
                    Please Enter the part number
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-search btn-middle btn-blue btn-blue-lighten-hover"
                aria-label="Search"
              >
                <i className="icon icon-search-middle"></i>
                <span>{translation?.text_search}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* search by size modal */}
      <CommonDialog
        open={openSearchBySizeModal}
        onClose={handleSearchBySizeCloseModal}
        maxWidth={"xl"}
        title={"Search by size"}
        component={
          <VehicleSearchBySizeModal
            setChildToParent={dataFromSizeSearch}
            formPage={""}
            sendProducts={""}
            updateSearchParams={updateSearchParams}
          />
        }
      />
    </div>
  );
}

export default SearchByPartNo;
