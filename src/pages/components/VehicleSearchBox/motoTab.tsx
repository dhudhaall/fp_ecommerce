import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { brandsList } from "../../services/dropdowns.service";

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },

];
function MotoTab() {

  const [brands, setBrands] = useState([]);


  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = () => {

    const data = { type: '1' };
    brandsList(data).then((res: any) => {
      setBrands(res['data']);
      //  let index = res["data"].findIndex((item:any) => item.brand_id == brand_id);
     
      //  setBrandIndex(index);
   
    });
  };
  const selectBrand = (event: any, values: any) => {

  };

  return (
    <div className="mototab">


      {brands.length && <Autocomplete
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
        getOptionLabel={(option: any) => option.brand}
        onChange={selectBrand}
        value={brands[2]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Class"

          />
        )}
      />}
    </div>
  );
}

export default MotoTab;