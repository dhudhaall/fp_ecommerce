import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface searchResults {
    search_result: any;
    filter_lists: any;
    vehicles: any;
}

interface selectedFilters {
    p_brand_id: any[],
    sub_category_id: any[],
    part_category_id: any[],
    part_sub_category_id: any[],
    vehicle_system_id: any[],
    sub_system_id: any[],
    spec_id:[],
    days:0
}

const initialState: any = {
    products: [],
    loading: false,
    error: null,
    partNumber: '',
    VINNumber: '',
    plateNo: '',
    selectedFilters: {} as selectedFilters,
    isAnyFilterSelected: false,
    type: '',
    filters: {},
    vehicles: [],
    selectedBrandFilters: [],
    selectedBrandSubCategoryFilter: [],
    selectedPartCategoryFilters: [],
    selectedPartSubCategoryFilters: [],
    selectedVehSystemFilters: [],
    selectedVehSubSystemFilters: [],
    selectedBoschFilters: {spec_id:[], days:0},
    vehicleForm: { veh_type: 0, v_brand_id: '', class_id: '', model_id: '', year: '', body_no: '', eng_vol: '', eng_no: '', },
    sizeForm: { type: 0, type_id: '', profile_id: '', fields: '', approximation: '', },
    page: { current_page: 1, next_page: null, prev_page: null, per_page: 60 },
    isApiCallFromSearchParams: true,
    url: '',
    paramData: {},
};

const productSearchSlice = createSlice({
    name: 'productSearch',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.products = [...state.products, ...action.payload?.search_result?.data];
            state.filters = action.payload['filter_lists'];
            state.vehicles = action.payload['vehicles'];
            state.page = { current_page: action.payload['search_result']['current_page'], next_page: action.payload['search_result']['next_page'], prev_page: action.payload['search_result']['prev_page'], per_page: 60 }
        },
        cancelApiCallFromSearchParams(state) {
            state.isApiCallFromSearchParams = false;
        },
        resetProductsList(state) {
            state.products = [];
        },
        fetchProductsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        setPartNumber(state, action) {
            state.partNumber = action.payload;
        },
        setVinNumber(state, action) {
            state.VINNumber = action.payload;
        },
        setVechiclePlateNo(state, action) {
            state.plateNo = action.payload;
        },
        setFormType(state, action) {
            state.type = action.payload;
        },
        setSelectedFilters(state, action) {
            state.selectedFilters = action.payload;
        },
        setAnyFilterSelected(state, action) {
            state.isAnyFilterSelected = action.payload;
        },
        setPage(state, action) {
            const { current_page, prev_page, next_page } = action.payload;
            state.page = { current_page, prev_page, next_page, per_page: state.page.per_page };
        },
        setFilters(state, action) {
            state.filters = action.payload;
        },
        setSelectedBrandFilter(state, action) {
            //state.products = [];
            state.selectedBrandFilters = action.payload;
            state.selectedFilters = {
                p_brand_id: state.selectedBrandFilters, sub_category_id: state.selectedBrandSubCategoryFilter, part_category_id: state.selectedPartCategoryFilters, part_sub_category_id: state.selectedPartSubCategoryFilters,
                vehicle_system_id: state.selectedVehSystemFilters, sub_system_id: state.selectedVehSubSystemFilters
            }
            // if (action.payload?.length > 0) {
            //     state.isAnyFilterSelected = true;
            // }
        },
        setSelectedPartCategoryFilter(state, action) {
            //state.products = [];
            state.selectedPartCategoryFilters = action.payload;
            state.selectedFilters = {
                p_brand_id: state.selectedBrandFilters, sub_category_id: state.selectedBrandSubCategoryFilter, part_category_id: state.selectedPartCategoryFilters, part_sub_category_id: state.selectedPartSubCategoryFilters,
                vehicle_system_id: state.selectedVehSystemFilters, sub_system_id: state.selectedVehSubSystemFilters
            }
            // if (action.payload?.length > 0) {
            //     state.isAnyFilterSelected = true;
            // }
        },
        setSelectedBrandSubCategoryFilter(state, action) {
            //state.products = [];
            state.selectedBrandSubCategoryFilter = action.payload;
            state.selectedFilters = {
                p_brand_id: state.selectedBrandFilters, sub_category_id: state.selectedBrandSubCategoryFilter, part_category_id: state.selectedPartCategoryFilters, part_sub_category_id: state.selectedPartSubCategoryFilters,
                vehicle_system_id: state.selectedVehSystemFilters, sub_system_id: state.selectedVehSubSystemFilters
            }
            // if (action.payload?.length > 0) {
            //     state.isAnyFilterSelected = true;
            // }
        },
        setSelectedPartSubCategoryFilter(state, action) {
            //state.products = [];
            state.selectedPartSubCategoryFilters = action.payload;
            state.selectedFilters = {
                p_brand_id: state.selectedBrandFilters, sub_category_id: state.selectedBrandSubCategoryFilter, part_category_id: state.selectedPartCategoryFilters, part_sub_category_id: state.selectedPartSubCategoryFilters,
                vehicle_system_id: state.selectedVehSystemFilters, sub_system_id: state.selectedVehSubSystemFilters
            }
            // if (action.payload?.length > 0) {
            //     state.isAnyFilterSelected = true;
            // }
        },
        setSelectedVehSystemFilter(state, action) {
            //state.products = [];
            state.selectedVehSystemFilters = action.payload;
            state.selectedFilters = {
                p_brand_id: state.selectedBrandFilters, sub_category_id: state.selectedBrandSubCategoryFilter, part_category_id: state.selectedPartCategoryFilters, part_sub_category_id: state.selectedPartSubCategoryFilters,
                vehicle_system_id: state.selectedVehSystemFilters, sub_system_id: state.selectedVehSubSystemFilters
            }
            // if (action.payload?.length > 0) {
            //     state.isAnyFilterSelected = true;
            // }
        },
        setSelectedVehSubSystemFilter(state, action) {
            //state.products = [];
            state.selectedVehSubSystemFilters = action.payload;
            state.selectedFilters = {
                p_brand_id: state.selectedBrandFilters, sub_category_id: state.selectedBrandSubCategoryFilter, part_category_id: state.selectedPartCategoryFilters, part_sub_category_id: state.selectedPartSubCategoryFilters,
                vehicle_system_id: state.selectedVehSystemFilters, sub_system_id: state.selectedVehSubSystemFilters
            }
            // if (action.payload?.length > 0) {
            //     state.isAnyFilterSelected = true;
            // }
        },
         setSelectedBoschFilter(state, action) {
            state.selectedBoschFilters = action.payload;
            state.selectedFilters = {
                spec_id: state.selectedBoschFilters['spec_id'], days: state.selectedBoschFilters['days'],
            }
        },
        setVehicles(state, action) {
            state.vehicles = action.payload;
        },
        setProductsEmpty(state) {

            state.products = [];
        },
        updateProductLst(state, action) {
            state.products = action.payload;
        },
        setSearchByVehicleForm(state, action) {
            state.vehicleForm = action.payload;
        },
        setSearchBySizeForm(state, action) {
            state.sizeForm = action.payload;
        },
        updateUrl(state, action) {
            state.url = action.payload;
        },
        updateApiParamData(state, action) {
            state.paramData = action.payload;
        }
    },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, setPartNumber, setSelectedFilters, setFormType,
    setPage, setVinNumber, setProductsEmpty, setVechiclePlateNo, setAnyFilterSelected, setSelectedBrandFilter, setSelectedPartCategoryFilter,
    setSelectedBrandSubCategoryFilter, setSelectedPartSubCategoryFilter, setSelectedVehSystemFilter, setSelectedVehSubSystemFilter,
    setSearchByVehicleForm, setSearchBySizeForm, resetProductsList, cancelApiCallFromSearchParams, updateUrl,setSelectedBoschFilter,
    updateApiParamData, updateProductLst } = productSearchSlice.actions;

export default productSearchSlice.reducer;
