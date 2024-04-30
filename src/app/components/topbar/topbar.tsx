"use client"
import React, { useEffect, useState } from "react";
import "./topbar.scss";
// import MobileTopBar from "./mobileTopBar";
import {
  getCountriesList,
  getCurrencyList,
  getLanguageList,
  getSideBar,
  informationsList,
} from "../../services/dropdowns.service";
// import LoginDialog from "../../components/Accounts/login-dialog";
import { useRouter } from "next/router";
import ShareDataService from "../../services/shareData.service";
import { Country, Currency, Language } from "../../Models/dropdowns";
import { connect, useDispatch, useSelector } from "react-redux";
import { retrieveTranslation } from '../../Store/Slice/commonSlices'
import { retrievePageDescription } from '../../Store/Slice/pageDescriptionSlice'
import { RouteParams } from "../../Lang/queryParams";
import CustomDesignedDialog from "../../components/customDesignedDialog/CustomDesignedDialog";
// import Login from "../../components/Accounts/login";
import { loadCart, setCartData, setCountryData, setCurrency, setCurrencyData, setInformationData, setLangData, setTopBarTranslations } from "../../Store/Slice/shareDataSlices";
import { clearCart } from "../../services/cart.service";
import { setCountry } from "../../Store/Slice/shareDataSlices";
import { getTopBar } from "../../services/commonApis.service";
import { Cookie } from "../../services/cookie.service";
import {setCookie } from 'cookies-next';

function Topbar() {
  const selected_country = useSelector((state: any) => state.loadCart.country);
  const [coutriesList, setcoutriesList] = useState([] as Country[]);
  const [currenciesList, setcurrencyList] = useState([] as any);
  const [languageList, setlanguageList] = useState([] as any);
  const [sideBarList, setSideBarList] = useState([] as any);
  const [LoginOpen, setLoginOpen] = useState(false);
  const [headerTranslation, setHeaderTranslation] = useState({} as any);
  const [userData, setUserData] = useState('' as any);

  const [selected_lang, setselected_lang] = useState({
    code: 'en',
    image: 'gb.png',
    language_id: 1,
    name: 'English',
  } as Language);
  const [informationList, setInformation_list] = useState([] as any);
  const [filteredList, setFilteredList] = useState(coutriesList);
  const [token, setToken] = useState('' as any);
  const router = useRouter();
  console.log("router",router);
  const {query} = router;
  const searchParams = query;
  console.log("searchParams",query)
  const slug = searchParams?.slug?.toString();
  const fpClientUrl= "https://fp-client.asakashi.com";
  const [selected_currency, setselected_currency] = useState({
    symbol: "SG$", 
    currency_name: "SG$ Singapore Dollar", 
    currency_id: 4, 
  } as Currency); 

  const dispatch = useDispatch();
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('user')!));

    let token = JSON.parse(localStorage.getItem('user')!) as any;
    let langId = searchParams?.lang;
    if (langId) {
      const langObj: Language = { language_id: Number(langId), name: '', code: '', image: '' }
      localStorage.setItem('lang', JSON.stringify(langObj));
      setCookie('lang', JSON.stringify(langObj));
    }
    getTopBarData();
    setToken(token)
    let currency = JSON.parse(localStorage.getItem('currency')!);
    if (currency) {
      setselected_currency(currency);
    }

    if (slug) {
      getSlug(slug);
    }

  }, []);

  useEffect(() => {
    getPath();
    let token = JSON.parse(localStorage.getItem('user')!) as any;
    setToken(token)
  }, [router?.pathname, router?.query]);


  const getPath = () => {
    const _path = router?.pathname;
    const lang: Language = JSON.parse(localStorage.getItem('lang')!);
    let urlParam: any;
    if (_path.includes('/productDetail')) {
      urlParam = { url: '/productDetail', param: 'product/product, product/search,default' }
    } else {
      urlParam = RouteParams.find(o => o.url === _path)!;
    }
    if (urlParam?.param) {
      dispatch(retrieveTranslation({ lang_id: lang ? lang.language_id : 1, page: urlParam?.param }));
    }
  }

  const getTopBarData = () => {
    getTopBar().then((res: any) => {
    // ShareDataService.getTopbarapiData().subscribe((res: any) => {
      setcoutriesList(res["data"]['countries']);
      setFilteredList(res["data"]['countries']);
      setSideBarList(res['data']['translations']['module/account']);
      setHeaderTranslation(res['data']['translations']['common/header']);
      dispatch(setInformationData(res['data']['informations']))
      dispatch(setTopBarTranslations(res['data']['translations']))
      dispatch(setCartData(res['data']['cart']))


      //language list data
      setlanguageList(res["data"]['languages']);
      const urlLangId = searchParams?.lang;

      if (urlLangId) {
        const urlLanguageObj = res["data"]['languages'].find((lang: Language) => lang.language_id === Number(urlLangId));

        localStorage.setItem('lang', JSON.stringify(urlLanguageObj));
        setCookie('lang', JSON.stringify(urlLanguageObj));
        setselected_lang(urlLanguageObj);
      } else {
        const lang: Language = JSON.parse(localStorage.getItem('lang')!);
        if (!lang) {
          localStorage.setItem('lang', JSON.stringify(res["data"]['languages'][0]));
          setCookie('lang', JSON.stringify(res["data"]['languages'][0]));
        }
      }

      let selected = JSON.parse(localStorage.getItem('country')!);
      if (selected) {
        // setselected_country(selected);
        dispatch(setCountry(selected));
      } else {
        selected = res["data"]['countries'].filter((c: Country) => c.is_selected);
        // setselected_country(selected[0]);
        dispatch(setCountry(selected[0]));
        localStorage.setItem('country', JSON.stringify(selected[0]));
        ShareDataService.setCountry(selected[0]);
      }
      // currency list data
      res["data"]['currencies'].map((curr: any) => {
        curr.symbol = curr.currency_name.split(" ")[0];
      });
      setcurrencyList(res["data"]['currencies']);
      const currency = JSON.parse(localStorage.getItem("currency")!);
      if (!currency) {
        localStorage.setItem('currency', JSON.stringify(res["data"]['currencies'][10]));
        dispatch(setCurrency(res["data"]['currencies'][10]))
      }

      const originalList = res["data"]['informations']["pages"];
      const filteredList = originalList.filter((item:any) => isNaN(item.title));

      setInformation_list(filteredList);
      ShareDataService.setCatalogsData(res["data"]['informations']);
    });
  }

  const currencyList = () => {
    getCurrencyList().then((res: any) => {
      res["data"].map((curr: any) => {
        curr.symbol = curr.currency_name.split(" ")[0];
      });
      setcurrencyList(res["data"]);

    });
  };

//   const getlanguageList = () => {
//     getLanguageList().then((res: any) => {
//       setlanguageList(res["data"]);
//       const lang: Language = JSON.parse(localStorage.getItem('lang')!);
//       if (!lang) {
//         localStorage.setItem('lang', JSON.stringify(res["data"][0]));
//         setCookie('lang', JSON.stringify(res["data"][0]));
//       }

//     });
//   };

//   const getinformationList = (lang_id: number) => {
//     const data = { lang_id: lang_id };
//     informationsList(data).then((res: any) => {
//       setInformation_list(res["data"]["pages"]);
//       ShareDataService.setCatalogsData(res["data"]);
//     });
//   };

  const getSideBarContent = (lang_id: number) => {
    let data = { page: 'module/account', lang_id: lang_id }
    getSideBar(data).then((res: any) => {
      setSideBarList(res['data']);
      console.log("res['data']",res['data'])
      ShareDataService.setSideBarData(res["data"]);
    });
  };

  const handleCurrencyChange = (value: Currency) => {
    setselected_currency(value);
    // ShareDataService.set(res["data"]);
    localStorage.setItem("currency", JSON.stringify(value));
    dispatch(setCurrency(value));
    // router.push({
    //     query: { lang: lang?.language_id }
    // })
    const newParams = {...searchParams,currency_id:value.currency_id}
    router.push({
      query: newParams,
    })
    //ShareDataService.setCurrency(value);
    dispatch(loadCart(true));

    getTopBarData();
  };

  const selectLanguage = (lang: Language) => {
    localStorage.setItem("lang", JSON.stringify(lang));
    setselected_lang(lang);

    const newParams = {...searchParams, lang_id:lang.language_id,}
    router.push({
      query: newParams,
    })
    getPath();


    getTopBarData();

    if (slug) {
      getSlug(slug);
    }

  };


  const selectcountry = (value: Country) => {
    localStorage.setItem('country', JSON.stringify(value));
    currenciesList.map((curr: any) => {
      if(curr.currency_id === value.currency_id){
        localStorage.setItem("currency", JSON.stringify(curr));
        setselected_currency(curr);
        dispatch(setCurrency(curr));
      }
    });
    const newParams = {...searchParams,country_id:value.country_id}
    router.push({
      query: newParams,
    })
    dispatch(setCountry(value));
  };

  const [openModal, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("ouput value");
  const openLoginModal = () => {
    setOpen(true);
  };

  const handleCloseDialog = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  ////////manu///

  const filterBySearch = (event: any) => {
    const query = event.target.value;
    var updatedList = [...coutriesList];

    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(updatedList);
  };

  const getSlug = (slug: string) => {
    switch (slug) {
      case 'about us':
        {
          dispatch(retrievePageDescription({ lang_id: selected_lang.language_id, slug: slug }));
          router.push({
            pathname: '/aboutUs',
            search: `slug=${slug}&lang_id=${selected_lang.language_id}`,
          });
          break;
        }
      case 'contact-us':
        {
            router.push({
            pathname: '/contactUs',
            search: `slug=${slug}&lang_id=${selected_lang.language_id}`,

          })
          break;
        }
      case 'delivery-information':
        dispatch(retrievePageDescription({ lang_id: selected_lang.language_id, slug: slug }));
        {
            router.push({
            pathname: '/deliveryInformation',
            search: `slug=${slug}&lang_id=${selected_lang.language_id}`,
          })
          break;
        }

      case 'return-policy':
        dispatch(retrievePageDescription({ lang_id: selected_lang.language_id, slug: slug }));
        {
            router.push({
            pathname: '/returnPolicy',
            search: `slug=${slug}&lang_id=${selected_lang.language_id}`,
          })
          break;
        }

      case 'privacy-policy':
        dispatch(retrievePageDescription({ lang_id: selected_lang.language_id, slug: slug }));
        {
            router.push({
            pathname: '/privacyPolicy',
            search: `slug=${slug}&lang_id=${selected_lang.language_id}`,
          })
          break;
        }
      case 'terms-conditions':
        dispatch(retrievePageDescription({ lang_id: selected_lang.language_id, slug: slug }));
        {
            router.push({
            pathname: '/termsCondition',
            search: `slug=${slug}&lang_id=${selected_lang.language_id}`,
          })
          break;
        }
    }
  }

  const logout = () => {
    const user = JSON.parse(localStorage.getItem('user')!) as any;
    if (user) {
      localStorage.removeItem('usertoken')
      localStorage.removeItem('user')
      Cookie.removeToken()
      getTopBarData();
      ShareDataService.setLogoutCartUpdate(true);
      dispatch(setCartData({}));
      router.push({
        pathname: '/login',
        search: `?lang_id=${selected_lang.language_id}`
      })
    }
  }
  const clearallCart = () => {
    let guest_id = JSON.parse(localStorage.getItem('guest_id')!);
    let tempId = '';
    if (!guest_id) {
      tempId = Date.now().toString();
      localStorage.setItem('guest_id', JSON.stringify(tempId));
      guest_id = tempId;
    }
    const data = { guest_id: guest_id }
    clearCart(data).then((res: any) => {
    });
  }
  const openLoginDialog = () => {
    setLoginOpen(true);
  }
  const closeLoginModal = () => {
    setLoginOpen(false);
  };

  const toFpClient = (value: any) => {

    switch (value) {
      case 'account':
        {
          const tokenString = JSON.parse(localStorage.getItem('usertoken')!) as any;
          const url = `${fpClientUrl}/home?token=${tokenString}`;
          window.open(url, '_blank');
          break;

        }

      case 'orders':
        {
          const tokenString = JSON.parse(localStorage.getItem('usertoken')!) as any;
          const url = `${fpClientUrl}/home/orders`;
          window.open(url, '_blank');
          break;

        }
      case 'transaction':

        {
          const tokenString = JSON.parse(localStorage.getItem('usertoken')!) as any;
          const url = `${fpClientUrl}/home/transactions?token=${tokenString}`;
          window.open(url, '_blank');
          break;

        }
      case 'destination':

        {
          const tokenString = JSON.parse(localStorage.getItem('usertoken')!) as any;
          const url = `${fpClientUrl}/home/destination?token=${tokenString}`;
          window.open(url, '_blank');
          break;

        }
      case 'invoice':

        {
          const tokenString = JSON.parse(localStorage.getItem('usertoken')!) as any;
          const url = `${fpClientUrl}/home/invoices?token=${tokenString}`;
          window.open(url, '_blank');
          break;

        }
      case 'cancellation':

        {
          const tokenString = JSON.parse(localStorage.getItem('usertoken')!) as any;
          const url = `${fpClientUrl}/home/cancellation?token=${tokenString}`;
          window.open(url, '_blank');
          break;

        }
      case 'garage':

        {
          const tokenString = JSON.parse(localStorage.getItem('usertoken')!) as any;
          const url = `${fpClientUrl}/home/garage?token=${tokenString}`;
          window.open(url, '_blank');
          break;

        }
      case 'decoRequest':

        {
          const tokenString = JSON.parse(localStorage.getItem('usertoken')!) as any;
          const url = `${fpClientUrl}/home/decodingRequests?token=${tokenString}`;
          window.open(url, '_blank');
          break;

        }
      case 'stockRequest':

        {
          const tokenString = JSON.parse(localStorage.getItem('usertoken')!) as any;
          const url = `${fpClientUrl}/home/stockRequests?token=${tokenString}`;
          window.open(url, '_blank');
          break;

        }
      case 'wishlist':

        {
          const tokenString = JSON.parse(localStorage.getItem('usertoken')!) as any;
          const url = `${fpClientUrl}/home/wishlist?token=${tokenString}`;
          window.open(url, '_blank');
          break;

        }
      case 'notification':

        {
          const tokenString = JSON.parse(localStorage.getItem('usertoken')!) as any;
          const url = `${fpClientUrl}/home/notificationsettings?token=${tokenString}`;
          window.open(url, '_blank');
          break;

        }


    }

  };


  // const postCrossDomainMessage = (msg: any) => {
  //   /**var win = (document.getElementById('clientIframe') as HTMLIFrameElement).contentWindow;
  //   win?.postMessage(msg, "http://localhost:4200");**/
  // }

  return (
    <div>
      <div className="top topBar">
        <div className="container">
          <div className="layout d-flex">
            <div className="top__left mr-0 flex-width-1">
              <div className="top-height d-flex align-items-center">
                {/* currencies */}
                <div className="valute">
                  <div className="currencies">
                    <div
                      className={`dropdown open-dropDown`}
                    >
                      <a
                        className=" dropdown-toggle button-padding"
                        href="#"
                        role="button"
                        id="dropdownCountryLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span className="selected_currency-new">
                          {selected_currency.symbol}
                        </span>
                      </a>

                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownCountryLink"
                        x-placement="bottom-start"
                      >
                        <div className="countries-wrapper js-styled-scroll scroll-processed ps">
                          <div className="countries-list">
                            {currenciesList.map((curr: any) => (
                              <a
                                className="js-change-country dropdown-item "
                                onClick={() => {
                                  handleCurrencyChange(curr)
                                }}
                                key={curr.currency_id}
                              >
                                {curr.currency_name}
                              </a>
                            ))}
                          </div>
                        </div>
                        <button type="button" className="close a-rotate90">
                          <svg width="13" height="13">
                            <line x1="0" y1="0" x2="13" y2="13"></line>
                            <line x1="13" y1="0" x2="0" y2="13"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* <span className="selected_currency">
                      {selected_currency.symbol}
                    </span> */}
                    {/* <Select
                      labelId="currency-select"
                      id="currency-select"
                      value={selected_currency.symbol}
                      onChange={handleCurrencyChange}
                      label="Currency"
                      defaultValue={selected_currency.symbol}
                      sx={{
                        boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, '.MuiSvgIcon-root': { fill: "white !important" }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
                      }}
                    >
                      {currenciesList.map((curr: any) => (
                        <MenuItem key={curr.currency_id} value={curr}>
                          {curr.currency_name}
                        </MenuItem>
                      ))}
                    </Select> */}
                  </div>
                </div>

                {/* country */}
                <div className="country mr-3">
                  <div className={`dropdown open-dropDown`}>
                    <a
                      className=" dropdown-toggle button-padding"
                      href="#"
                      role="button"
                      id="dropdownCountryLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <>
                        <img src="/assets/template/images/globe.svg" />
                        {selected_country.name}
                      </>
                    </a>

                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownCountryLink"
                      x-placement="bottom-start"
                    >
                      <p className="title">Choose your region</p>
                      <div className="countries-wrapper js-styled-scroll scroll-processed ps">
                        <form>
                          <input
                            type="text"
                            className="form-control"
                            id="search-box"
                            onChange={filterBySearch}
                          />
                        </form>
                        {/* filtered */}
                        {/* <div className="countries-list">
                          {filteredList.map((item, index) => (
                            <a className="js-change-country dropdown-item "  onClick={() => getValue(item)}   key={index}>{item}</a>
                          ))}

                        </div> */}
                        <div className="countries-list">
                          {filteredList.map((item, index) => (
                            <a
                              className="js-change-country dropdown-item "
                              onClick={() => {
                                selectcountry(item)
                              }}
                              key={'country-' + index}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                        {/* <div
                          className="ps__rail-x"
                          style={{ left: "0px", bottom: "-100px" }}
                        >
                          <div
                            className="ps__thumb-x"
                            style={{ left: "0px", width: "0px" }}
                          ></div>
                        </div>
                        <div
                          className="ps__rail-y"
                          style={{ top: "0px", right: "12px", height: "225px" }}
                        >
                          <div
                            className="ps__thumb-y"
                            style={{ top: "0px", height: "100px" }}
                          ></div>
                        </div> */}
                      </div>

                    </div>
                  </div>
                </div>
                {/* =language*/}
                <div className="lang language">
                  <div className={`dropdown open-dropDown`}>
                    <a
                      className=" dropdown-toggle button-padding"
                      href="#"
                      role="button"
                      id="dropdownCountryLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img src="/assets/template/language-solid.svg" alt="" className="mr-2" />
                      <span className="selected_currency-new">
                        {selected_lang?.name}
                      </span>
                    </a>

                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownCountryLink"
                      x-placement="bottom-start"
                    >
                      <div className="countries-wrapper js-styled-scroll scroll-processed ps">

                        <div className="countries-list">
                          {languageList.map((lang: any) => (
                            <a
                              className="js-change-country dropdown-item "
                              onClick={() => {
                                selectLanguage(lang)
                              }}
                              key={"lang-id-" + lang.language_id}
                            >
                              {lang.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="d-flex">
                    <img src={langSolid} alt="" />
                    <Select
                      labelId="lang-select"
                      id="lang-select"
                      value={selected_lang}
                      onChange={selectLanguage}
                      label="Language"
                      sx={{
                        boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, '.MuiSvgIcon-root': { fill: "white !important" }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 }, '.MuiSelect-select': { color: "#ffffff" }
                      }}>
                      {languageList.map((lang: any) => (
                        <MenuItem
                          key={lang.language_id}
                          value={lang.language_id}
                        >
                          {lang.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div> */}
                </div>
                {/* =/language  */}
              </div>
            </div>
            {/* =/left  */}

            {/* =menu  */}
            <div className="d-flex align-items-center flex-width-2">
              <div className="top__menu top-height d-flex align-items-center manu-flex-basis">
                <ul className="top_menu_flex">
                  {/* //////CODE change due to open link in new tabe by right click//// */}
                  {informationList.map((info: any, i: number) => (
                    <li className={`mr-5 li-item-margin item-hide${i}`} key={'info-list-' + i} onClick={() => getSlug(info.slug)}>
                      <a
                        dangerouslySetInnerHTML={{ __html: info.title }}
                        href={info.url}
                      ></a>
                    </li>
                  ))}
                  {/* <li className="item-hide5">
                    <a
                    onClick={()=>getSlug("delivery-information")}
                      className="link"
                    
                     
                    >
                      Contact us
                    </a>
                  </li> */}
                </ul>
              </div>

              <div className="lang pr-3 position-relative ">
                <div className="dropdown moredropdown manu-drop">
                  {/* <a
                    className=" dropdown-toggle d-block"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"

                  >
                    More
                  </a> */}

                  <button className="manu-btn">More</button>

                  <ul className="manu-drop-list">
                    {informationList.map((info: any, i: number) => (
                      <li className={`mr-5 li-item-margin item-show${i}`}
                        key={i}
                        onClick={() => getSlug(info.slug)}>
                        <a
                          dangerouslySetInnerHTML={{ __html: info.title }}
                          href={info.url}
                        ></a>
                      </li>
                    ))}
                  </ul>

                  <div
                    className="dropdown-menu items"
                    aria-labelledby="dropdownMenuLink"
                  >
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- =/menu --> */}
            {/* <!-- =right --> */}
            <div className="top__right flex-width-3">
              <div className="top-height d-flex align-items-center">
                <div className="top__tel">
                  <a
                    href="tel:+6567497481"
                    className="tel icon icon-tel"
                    target="_blank"
                  >
                    +65 67497481
                  </a>
                </div>
                <div className="login in">
                  {!token &&
                    <div className="dropdown pointer" onClick={openLoginDialog}>
                      <a
                        className="icon icon-user  usermenu d-block"
                        role="button"
                        id="dropdownUserMenuLink"


                      >
                        <span>
                        {headerTranslation?.text_account}
                        </span>

                      </a>
                    </div>
                  }

                  {token &&
                    <>
                      <div className="dropdown pointer">
                        <a className="icon icon-user dropdown-toggle usermenu d-block"
                          role="button"
                          id="dropdownUserMenuLink"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false">
                          <span> {token?.firstname} </span>
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownUserMenuLink"
                        >
                          <ul>
                            <li className="active" onClick={(value: any) => toFpClient("account")}>
                              <a>

                                <i className="icon-wrapper">
                                  <i className="icon icon-myaccount-sm"></i>
                                </i>
                                {/* My account */}
                                {sideBarList?.text_account}
                              </a>
                            </li>
                            <li onClick={(value: any) => toFpClient("orders")}>
                              <a >
                                <i className="icon-wrapper">
                                  <i className="icon icon-orders-sm "></i>
                                </i>
                                {sideBarList?.text_ordered_soid}

                              </a>
                            </li>
                            <li onClick={(value: any) => toFpClient("transaction")}>
                              <a>
                                <i className="icon-wrapper">
                                  <i className="icon icon-transactions-sm"></i>
                                </i>
                                {sideBarList?.text_transaction}

                              </a>
                            </li>
                            <li onClick={(value: any) => toFpClient("destination")}>
                              <a >
                                <i className="icon-wrapper">
                                  <i className="icon icon-addressbook-sm"></i>
                                </i>
                                {sideBarList?.text_destination}

                              </a>
                            </li>
                            <li onClick={(value: any) => toFpClient("invoice")}>
                              <a >
                                <i className="icon-wrapper">
                                  <i className="icon icon icon-orders-sm"></i>
                                </i>
                                {sideBarList?.text_order}

                              </a>
                            </li>
                            <li onClick={(value: any) => toFpClient("cancellation")}>
                              <a >
                                <i className="icon-wrapper">
                                  <i className="icon icon icon-orders-sm"></i>
                                </i>
                                {sideBarList?.text_cancellations}

                              </a>
                            </li>
                            <li onClick={(value: any) => toFpClient("garage")}>
                              <a>
                                <i className="icon-wrapper">
                                  <i className="icon icon icon-garage-sm"></i>
                                </i>
                                {sideBarList.text_garage}

                              </a>
                            </li>
                            <li onClick={(value: any) => toFpClient("decoRequest")}>
                              <a >
                                <i className="icon-wrapper">
                                  <i className="icon icon icon-vehicle-sm"></i>
                                </i>
                                {sideBarList?.text_vehicle_request}

                              </a>
                            </li>
                            <li onClick={(value: any) => toFpClient("stockRequest")}>
                              <a >
                                <i className="icon-wrapper">
                                  <i className="icon icon-stock-sm"></i>
                                </i>
                                {sideBarList?.text_stock_request}

                              </a>
                            </li>
                            <li onClick={(value: any) => toFpClient("wishList")}>
                              <a >
                                <i className="icon-wrapper">
                                  <i className="icon icon-wishlist-sm"></i>
                                </i>
                                {sideBarList?.text_wishlist}
                              </a>
                            </li>
                            <li onClick={(value: any) => toFpClient("notification")}>
                              <a >
                                <i className="icon-wrapper">
                                  <i className="icon icon-notifications-sm"></i>
                                </i>
                                {sideBarList?.text_notification}

                              </a>
                            </li>
                            <li>
                              <a onClick={logout}>
                                <i className="icon-wrapper">
                                  <i className="icon icon-logout-sm"></i>
                                </i>
                                {sideBarList?.text_logout}

                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <span className="cust">{headerTranslation?.text_cust} {userData?.customer_id}</span>
                    </>


                  }

                </div>
              </div>
            </div>
            {/* <!-- =/right --> */}
          </div>
        </div>
      </div>
      {/* <!-- =/mobile-top --> */}
      <div className="mob-header">
        {/* <MobileTopBar></MobileTopBar> */}
      </div>

      {/* <!-- =/Mobile-top --> */}

      {/* <LoginDialog
        selectedValue={selectedValue}
        open={openModal}
        onClose={handleCloseDialog}
      /> */}
      {/* <CustomDesignedDialog
        open={LoginOpen}
        onClose={closeLoginModal}
        title='Login'
        component={<Login closeLoginModal={closeLoginModal} modal={true}></Login>}
        forLogin={true}
      /> */}
      {/* <!-- =/top --> */}

    </div>
  );
}
// @ignore-type
const mapStateToProps = (state: any) => {
  return {
    translation: state.translation,
  };
};

export default connect(mapStateToProps, { retrieveTranslation })(Topbar);


