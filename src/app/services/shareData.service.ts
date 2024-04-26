import { Subject } from 'rxjs';
import { Country, Currency } from '../Models/dropdowns';

const catalogsData = new Subject();
const sideBarData = new Subject();
const searchResultData = new Subject();
const updateLangId = new Subject();
const updateCountry = new Subject();
const updateCurrency = new Subject();
const updateCartData = new Subject();
const updateCompareLength = new Subject();
const updateCartIn = new Subject();
const onLogoutCartUpdate = new Subject();
const onLoginCartUpdate= new Subject();
// let catalogsData$  = catalogsData.asObservable();

const ShareDataService = {
        // data share For navBar li item
    setCatalogsData: (d:any) => catalogsData.next({ value: d }),
    getCatalogsData: () => catalogsData.asObservable(),
    // data share For side li item
    setSideBarData: (d:any) => sideBarData.next({ data: d }),
    getSideBarData: () => sideBarData.asObservable(),
    // data share For search result data
    setSearchData: (d:any) => searchResultData.next({ data: d }),
    getSearchData: () => searchResultData.asObservable(),
    // data share For updateLangId
    setLangId: (d:any) => updateLangId.next({ data: d }),
    getLangId: () => updateLangId.asObservable(),
       // data share For updateCountryId
    setCountry: (d:Country) => updateCountry.next({ data: d}),
    getCountry: () => updateCountry.asObservable(),
       // data share For Currency
    setCurrency: (d:Currency) => updateCurrency.next({ data: d}),
    getCurrency: () => updateCurrency.asObservable(),
       // data share For CartApi
    setCartData: (d:any) => updateCartData.next({ data: d}),
    getCartData: () => updateCartData.asObservable(),

    //data from filters from search menu
    setBrandFiltersData: (d:any) => updateCartData.next({ data: d}),
    getBrandFiltersData: () => updateCartData.asObservable(),

    setCategoryFiltersData: (d:any) => updateCartData.next({ data: d}),
    getCategoryFiltersData: () => updateCartData.asObservable(),

    setSystemFiltersData: (d:any) => updateCartData.next({ data: d}),
    getSystemFiltersData: () => updateCartData.asObservable(),
       // data share For Compare lenth
    setCompareLength: (d:boolean) => updateCompareLength.next({ data: d}),
    getCompareLength: () => updateCompareLength.asObservable(),
       // data share For Cart Item Remove
    setCartIn: (d:boolean) => updateCartIn.next({ data: d}),
    getCartIn: () => updateCartIn.asObservable(),
       // data share For const onLogoutCartUpdate 

    setLogoutCartUpdate: (d:boolean) => onLogoutCartUpdate.next({ data: d}),
    getLogoutCartUpdate: () => onLogoutCartUpdate.asObservable(),
       // data share For const onLogoutCartUpdate 

    setLoginCartUpdate: (d:boolean) => onLoginCartUpdate.next({ data: d}),
    getLoginCartUpdate: () => onLoginCartUpdate.asObservable(),
};

export default ShareDataService;

