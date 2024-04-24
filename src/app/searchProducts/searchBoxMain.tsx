// "use client"
// import React, { useEffect, useState } from 'react';
// import { Button, Menu, MenuItem } from '@mui/material';
// import './productSearch.scss'
// // import VehicleSearch from '../../components/VehicleSearchBox/vehicleSearch';
// // import VehicleSearchBySizeModal from '../../shared/mainBar/vehicleSearchBySizeModal';
// import { useSearchParams , useRouter} from 'next/navigation';

// function SearchMainBox(props: any) {
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const [selectValue, setSelectValue] = useState<string>('Part Number');

//     const [partNumberForm, setPartNumberForm] = useState<boolean>(true);
//     const [vehiclePlateNoForm, setVehiclePlateNoForm] = useState<boolean>(false);
//     const [vinForm, setVinForm] = useState<boolean>(false);
//     const [vehicleSearchForm, setVehicleSearchForm] = useState<boolean>(false);
//     const [sizeSearchForm, setSizeSearchForm] = useState<boolean>(false);
//     const open = Boolean(anchorEl);
//     const part_no = searchParams?.get("part_no")!;
//     const vin_number = searchParams?.get("vin_number")!;
//     const type = searchParams?.get("formType")!;

//     const [partNumber, setPartNumber] = useState('');
//     const [VINNumber, setVinNumber] = useState('');
//     const [vehiclePlateNo, setVehiclePlateNo] = useState('');

//     const selectedSelectedForm = (type: string) => {
//         switch (type) {
//             case 'partnumber':
//                 {
//                     setSelectValue('Part Number');

//                     setPartNumberForm(true); setVinForm(false); setVehicleSearchForm(false);
//                     setSizeSearchForm(false); setVehiclePlateNoForm(false);
//                     break;
//                 }
//             case 'vin':
//                 {
//                     setSelectValue('Vin or Chassis No');

//                     setPartNumberForm(false); setVinForm(true); setVehicleSearchForm(false);
//                     setSizeSearchForm(false); setVehiclePlateNoForm(false);
//                     break;
//                 }
//             case 'plateNo':
//                 {
//                     setSelectValue('Vehicle Plate No')
//                     setPartNumberForm(false); setVinForm(false); setVehicleSearchForm(false);
//                     setSizeSearchForm(false); setVehiclePlateNoForm(true);
//                     break;
//                 }
//             case 'car':
//                 {
//                     setSelectValue('Vehicle Search')
//                     setPartNumberForm(false); setVinForm(false); setVehicleSearchForm(true);
//                     setSizeSearchForm(false); setVehiclePlateNoForm(false);
//                     break;
//                 }
//             case 'moto':
//                 {
//                     setSelectValue('Vehicle Search')
//                     setPartNumberForm(false); setVinForm(false); setVehicleSearchForm(true);
//                     setSizeSearchForm(false); setVehiclePlateNoForm(false);
//                     break;
//                 }
//             case 'size':
//                 {
//                     setSelectValue('Search by size')
//                     setPartNumberForm(false); setVinForm(false); setVehicleSearchForm(false);
//                     setSizeSearchForm(true); setVehiclePlateNoForm(false);
//                     break;
//                 }

//         }
//     }

//     const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const selectSearchForm = (value: string, type: number) => {
//         setSelectValue(value);
//         handleClose();

//         switch (type) {
//             case 1:
//                 {
//                     setPartNumberForm(true); setVinForm(false); setVehicleSearchForm(false);
//                     setSizeSearchForm(false); setVehiclePlateNoForm(false);
//                     break;
//                 }

//             case 2:
//                 {
//                     setPartNumberForm(false); setVinForm(true); setVehicleSearchForm(false);
//                     setSizeSearchForm(false); setVehiclePlateNoForm(false);
//                     break;
//                 }
//             case 3:
//                 {
//                     setPartNumberForm(false); setVinForm(false); setVehicleSearchForm(true);
//                     setSizeSearchForm(false); setVehiclePlateNoForm(false);
//                     break;
//                 }
//             case 4:
//                 {
//                     setPartNumberForm(false); setVinForm(false); setVehicleSearchForm(false);
//                     setSizeSearchForm(true); setVehiclePlateNoForm(false);
//                     break;
//                 }
//             case 5:
//                 {
//                     setPartNumberForm(false); setVinForm(false); setVehicleSearchForm(false);
//                     setSizeSearchForm(false); setVehiclePlateNoForm(true);
//                     break;
//                 }

//         }
//     }

//     const changePartNumber = (event: any) => {
//         setPartNumber(event.target.value);
//     }
//     const submitPartNumberForm = (event: any) => {
//         event.preventDefault();
//         let data = { part_no: partNumber, type: 'partnumber' }
//         // props.setChildToParent(data);
//         router.push(`/searchProducts?part_no=${partNumber}&type=partnumber`);
       
//     }
//     const changeVinNumber = (event: any) => {

//         setVinNumber(event.target.value);
//     }
//     const changeVehiclePlateNo = (event: any) => {
//         setVehiclePlateNo(event.target.value);
//     }
//     const submitVINNumberForm = (event: any) => {
//         event.preventDefault();
//         const data = { vin: VINNumber , type:'vin'}
//         // props.setChildToParent(data);
//         router.push(`/searchProducts?part_no=${VINNumber}&type=vin`);
//     }
//     const submitVehiclePlateNoForm = (event: any) => {
//         event.preventDefault();
//         let data = { plate_no: vehiclePlateNo, type: 'plateNo' }
//         // props.setChildToParent(data);
//         router.push(`/searchProducts?part_no=${vehiclePlateNo}&type=plateNo`);
//     }
 
//     return (
//         <div className='ProductSearchMainBox '>
//             <div className="inner ">
//                 <div className="smartsearch__header smartsearch__vehicle">
//                     <h5 className="title">Search by</h5>
//                     <div className="dropdown select part-num" >
//                         <Button id="part-No-in-search" aria-controls={open ? 'demo-positioned-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}
//                         >
//                             {selectValue}
//                         </Button>
//                         <Menu
//                             id="demo-positioned-menu"
//                             aria-labelledby="demo-positioned-button"
//                             anchorEl={anchorEl}
//                             sx={{ '.MuiList-root': { width: 200, backgroundColor: 'white', color: 'black' }, '.MuiPaper-root': { borderRadius: '12px' }, '.MuiButtonBase-root': { padding: '10px 10px', fontSize: '12' } }}
//                             open={open}
//                             onClose={handleClose}
//                             defaultValue={selectValue}
//                             anchorOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'left',
//                             }}
//                             transformOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'left',
//                             }}
//                         >
//                             <MenuItem onClick={() => selectSearchForm('Part Number', 1)}>Part Number</MenuItem>
//                             <MenuItem onClick={() => selectSearchForm('Vehicle Plate No', 5)}>Vehicle Plate No</MenuItem>
//                             <MenuItem onClick={() => selectSearchForm('Vin or Chassis No', 2)}>VIN or Chassis No</MenuItem>
//                             <MenuItem onClick={() => selectSearchForm('Vehicle Search', 3)}>Vehicle Search</MenuItem>
//                             <MenuItem onClick={() => selectSearchForm('Search by size', 4)}>Search by size</MenuItem>
//                         </Menu>
//                     </div>
//                 </div>
//                 <div className="smartsearch__body">
//                     {partNumberForm && <div className='smartsearchform-wrapper open' >
//                         <form onSubmit={submitPartNumberForm} className="searchForm js-part-search open" id="partnumForm1">
//                             <input value={partNumber} type="text" onChange={changePartNumber} className="form-control js-part-id" name="search" placeholder="Example : 04465-13020" />
//                             <button type="submit" className="full-btn btn btn-search btn-middle btn-blue btn-blue-lighten-hover" aria-label="Search"><i className="icon icon-search-middle"></i>Search</button>
//                         </form>
//                     </div>}
//                     {vehiclePlateNoForm && <div className='smartsearchform-wrapper open' >
//                         <form className="searchForm js-part-search open" id="partnumForm1">
//                             <input value={vehiclePlateNo} type="text" onChange={changeVehiclePlateNo} className="form-control js-part-id" name="search" placeholder="Eg : SJV8841C" />
//                             <button onClick={submitVehiclePlateNoForm} type="button" className="full-btn btn btn-search btn-middle btn-blue btn-blue-lighten-hover" aria-label="Search"><i className="icon icon-search-middle"></i>Search</button>
//                         </form>
//                     </div>}
//                     {vinForm && <div className='smartsearchform-wrapper open' >
//                         <form className="searchForm js-part-search open" id="vinForm">
//                             <input value={VINNumber} type="text" onChange={changeVinNumber} className="form-control js-part-id" name="search" placeholder="Eg : RT11008610" />
//                             <button type="button" onClick={submitVINNumberForm} className="full-btn btn btn-search btn-middle btn-blue btn-blue-lighten-hover" aria-label="Search"><i className="icon icon-search-middle"></i>Search</button>
//                         </form>
//                     </div>}
                    
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default SearchMainBox;