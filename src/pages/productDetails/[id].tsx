import React, { useEffect, useState, useRef } from "react";
// import AddToCartModal from "../../components/AddToCart/AddToCartModal";
import "./productDetails.scss";
import InfoIcon from "@mui/icons-material/Info";
// import AddToCart from "../../components/AddToCart/addToCart";
// import Gallery from "../../shared/Gallery";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import CardSlider from "./CardSlider";
import {useRouter} from "next/router";
// import {
//   Oe_numbers,
//   Offers,
//   Product,
//   ProductSpecifications,
//   Vehicles,
//   Items,
//   stock_request,
// } from "../../Models/product";
// import TrustBoxDetailPage from "../../utils/trustBoxForDetailsPage";
// import CustomDesignedDialog from "../../shared/CommonDialog/CustomDesignedDialog";
// import ProductInfoModal from "../ProductsSearch/productInfoModal";
// import useLoader from "../../shared/Loader/useLoader";
// import { shallowEqual, useSelector } from "react-redux";
// import { Country, Language } from "../../Models/dropdowns";
// import shareDataSlices from "../../Store/Slice/shareDataSlices";

// import Assembly from "./Assembly";
// import NotifyAvailabilityModal from "./NotifyAvailabilityModal";
// import WarningCommonDialog from "../../shared/CommonDialog/warningCommonDialog";

// import Login from "../../components/Accounts/login";
import RatingStar from "@/app/components/starRating/starRating";
import { useParams } from "next/navigation";
import { Items, Oe_numbers, Offers, Product, ProductSpecifications, Vehicles } from "@/app/Models/product";
import { Language } from "@/app/Models/dropdowns";
import ShareDataService from "@/app/services/SingleSignOn";
import { updateCart } from "@/app/services/cart.service";
import { addToWishList, removeFromWishList, productDetails, productDetailsImages } from "@/app/services/searchVehicle.service";

function ProductDetail({id, product, translation}:any) {
//   const { id } = useParams();
//   const updateCart = useSelector((state: any) => state.loadCart.cartUpdate);
  const router = useRouter();
  useDocumentTitle(product?.name || "Product Details");
  const [cartOpen, setCartOpen] = useState(false);
  const [NotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [NotifyModalOpen, setNotifyModalOpen] = useState(false);
  const [HeartIsActive, setIsActive] = useState(false);
  const [crossIsActive, setCrossIsActive] = useState(false);
  const [comparedProducts, setComparedProducts] = useState(
    // JSON.parse(localStorage.getItem("compareproduct")!) || ([] as any)
  );
  const [expanded, setExpanded] = React.useState<string | false>(false);
//   const [loader, showLoader, hideLoader] = useLoader(); //initialize useLoader hook
//   const trans = useSelector((state: any) => state.lang);
  const [selectedProduct, setSelectedProduct] = useState({} as any);
  const [selectedOffer, setSelectedOffer] = useState({} as any);
  const [selectedCountry, setSelectedCountry] = useState({} as any);
  const [isShow, setIsShow] = useState(false);
  const [LoginOpen, setLoginOpen] = useState(false);
  const [brandsIsShow, setBrandIsShow] = useState(true);
  const [isAssemblyShow, setAssemblyShow] = useState(true);
  const [ProductImages, setProductImages] = useState([] as any);
  const [sliderKey, setSliderKey] = useState<number>(0);
  const [notifyAvailability, setNotifyAvailabilityData] = useState([] as any);
  const countryRef = useRef(null);
  const currencyRef = useRef(null);
  const cartRef = useRef(null);

  const [langId, setLangId] = useState({} as Language);
  const [currency, setCurrency] = useState(
    
    // JSON.parse(localStorage.getItem("currency")!)
  );
//   const selected_country = useSelector((state: any) => state.loadCart.country);
//   const selected_currency = useSelector(
//     (state: any) => state.loadCart.currency_id
//   );
  function useDocumentTitle(title: string) {
    useEffect(() => {
      document.title = `${title}`;
    }, [title, router.pathname]);
  }

  useEffect(() => {
    // const lang: Language = JSON.parse(localStorage.getItem("lang")!);
    // const country: any = JSON.parse(localStorage.getItem("country")!);
    // setSelectedCountry(country);
    // setLangId(lang);
    const element = document.getElementById("section-1st");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView();
    }
  }, []);

//   useEffect(() => {
//     if (
//       selected_currency !== 0 ||
//       updateCart !== false ||
//       countryRef.current !== selected_country ||
//       id !== null
//     ) {
//       getProductDetails(id!);
//     }
//     countryRef.current = selected_country;
//   }, [selected_country, updateCart, selected_currency, id]);

//   useEffect(() => {
//     if (product["related_products"]?.length === 0) {
//       setBrandIsShow(false);
//     }

//     if (product["sub_assembly"]?.length === 0) {
//       setAssemblyShow(false);
//     }
//   });

//   useEffect(() => {
//     setCrossIsActive(comparedProducts?.includes(id));

//     localStorage.setItem("compareproduct", JSON.stringify(comparedProducts));

//     let compareUpdate = true;
//     ShareDataService.setCompareLength(compareUpdate);
//   }, [comparedProducts]);

//   useEffect(() => {
//     setTranslation(trans);
//   }, [trans]);

  const openCartDialog = (product: any, offer: any) => {
    setSelectedOffer(offer);
    setSelectedProduct(product);
    setCartOpen(true);
  };

  const heartClick = (value: boolean, id: any) => {
    // 👇️ toggle isActive state on click

    // let user = JSON.parse(localStorage.getItem("user")!);
    let user = true;
    if (user) {
      setIsActive((value: any) => !value);

      if (value === false) {
        let data = { product_id: id };
        product.in_wishlist = true;
        addToWishList(data).then((res: any) => {});
      }
      if (value === true) {
        let data = { product_id: id };
        product.in_wishlist = false;
        removeFromWishList(data).then((res: any) => {});
      }
    } else {
      openLoginDialog();
    }
  };
  const openLoginDialog = () => {
    setLoginOpen(true);
  };

  const closeLoginModal = () => {
    setLoginOpen(false);
  };

  const compairClick = (value: boolean, product_id: string | number) => {
    // 👇️ toggle isActive state on click
    setCrossIsActive((value: any) => !value);

    if (crossIsActive === false) {
      compareProduct(id);
    } else {
      handleRemoveId(id);
    }
  };

  const handleClickScroll = () => {};

  const closeCartModal = () => {
    setCartOpen(false);
  };
  const warningNotificationModalClose = () => {
    setNotificationModalOpen(false);
  };
  const warningNotificationModalOpen = () => {
    setNotificationModalOpen(true);
  };

  const openInfoDialog = () => {
    setInfoOpen(true);
  };

  const closeInfoModal = () => {
    setInfoOpen(false);
  };

  const openNotifyModal = () => {
    setNotifyModalOpen(true);
  };

  const closeNotifyModal = (value: any) => {
    if (value === true) {
      setNotifyModalOpen(false);
    //   let token = JSON.parse(localStorage.getItem("usertoken")!);
    //   if (!token || value) {
    //     openLoginDialog();
    //   }
    } else {
      setNotifyModalOpen(false);
    }
  };

  const getImages = (productId: any) => {
    let payLoad = { product_id: productId };
    productDetailsImages(payLoad).then((res: any) => {
      setProductImages(res["data"]["images"]);
    });
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const compareProduct = (id: any) => {
    // if (comparedProducts?.length > 3) {
    //   setComparedProducts([...comparedProducts.slice(1), id]);
    // } else {
    //   setComparedProducts([...comparedProducts, id]);
    // }

    // setComparedProducts(ids);\
  };

  const handleRemoveId = (idRemove: any) => {
    // setComparedProducts(
    //   comparedProducts.filter((id: number) => id !== idRemove)
    // );
  };

  const getNotifyDataFromChild = (data: any) => {
    setNotifyAvailabilityData(data);
    warningNotificationModalOpen();

    if (data["success"] === true) {
      product.stock_request = data["stock_request_info"];
    }
  };

  const findOenumber = (product_id: number | string) => {

    router.push(`/productDetails/${product_id}?lang=${langId.language_id}`)

    const element = document.getElementById("section-1");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView();
    }
  };
  const sprintf = (format: string, rep_string: string, ...args: any[]) => {
    let i = 0;
    if (format) {
      let regExp = new RegExp(rep_string, "g");
      return format.replace(regExp, () => args[i++]);
    }
    return "";
  };

  const enRouteHome = () => {
 
    router.push(`/?lang=${langId.language_id}`)

  };
  const showFullSpecification = (value: boolean) => {
    setIsShow((value: boolean) => !value);
  };
  const addedInCart = (offer: any) => {
    offer["in_cart"] = true;
  };
  const showOtherBrands = (value: any) => {
    setBrandIsShow(value);
  };

  const selectAssembly = (value: any) => {
    setAssemblyShow(value);
  };

  return (
    <>
      {/* {loader} */}
      <div className="ProductDetail">
        {product && (
          <div className="inner">
            <div className="main card-page">
              <div className="container ProductBlock">
                <div className="breadcrumbs" id="section-1st">
                  <ul>
                    <li className="B_homecrumb">
                      <a onClick={enRouteHome}>Home</a>
                    </li>
                    <li>—</li>
                    <li className="current">
                      <a>{product.name}</a>
                    </li>
                  </ul>
                </div>
                {product["alt_part_caption"] && (
                  <div className="msg-searched text-center">
                    You Searched For {product.alt_part_caption} Equivalent Found
                  </div>
                )}

                <div className="d-xl-none">
                  <h1 className="text-center mt-4">{product?.name}</h1>
                  <div className="partnum-brand d-flex flex-wrap align-items-center">
                    <div className="part-num">
                      {translation?.text_part_numb}{" "}
                      <strong className="num">{product.part_no}</strong>
                    </div>
                    <div className="brand">
                      {translation?.text_manufacturer}{" "}
                      <strong className="name">{product?.brand}</strong>
                    </div>
                    <div className="compare d-flex">
                      <button
                        onClick={() => compairClick(true, product.product_id)}
                        type="button"
                        className={`btn to-compare js-add-compare ${
                          crossIsActive ? "btn-compare-in" : ""
                        }`}
                        data-id="78103"
                        data-text-toggle="Remove from compare"
                      >
                        <span className={crossIsActive ? "d-none" : "d-block"}>
                          {translation?.button_compare}
                        </span>
                        <span className={crossIsActive ? "d-block" : "d-none"}>
                          {" "}
                          {translation?.button_compare_remove}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          heartClick(product.in_wishlist, product.product_id)
                        }
                        className="btn-fav to-fav js-add-wishlist to-fav"
                        data-id="78103"
                        data-text-toggle="Remove from wish list"
                      >
                        <i
                          className={`icon icon-tofav ${
                            product.in_wishlist ? "red-Heart" : ""
                          }`}
                        ></i>
                        <span
                          className={product.in_wishlist ? "d-none" : "d-block"}
                        >
                          {product.in_wishlist}
                          {translation?.button_wishlist}
                        </span>
                        <span
                          className={product.in_wishlist ? "d-block" : "d-none"}
                        >
                          {product.in_wishlist}Remove from wish list
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card__body" id="section-1">
                  <div className="card__body-layout">
                    <div className="left-center">
                      <div className="card__left">
                        {/* <!-- =media --> */}

                        {/* <Gallery
                          data={ProductImages}
                          manufacturer_image={product.manufacturer_image}
                        ></Gallery>
                        <div className="reviews-bg">
                          <TrustBoxDetailPage></TrustBoxDetailPage>
                        </div> */}

                        {/* <!-- End TrustBox widget --> */}
                      </div>
                      <div className="card__center">
                        <h1 className="d-none d-xl-block text-center">
                          {product.name}
                        </h1>
                        <div className="d-none partnum-brand d-xl-flex flex-wrap">
                          <div className="part-num">
                            {translation?.text_part_numb}{" "}
                            <strong className="num">{product.part_no}</strong>
                          </div>
                          <div className="brand">
                            {translation?.text_manufacturer}{" "}
                            <strong className="name">{product.brand}</strong>
                          </div>
                        </div>

                        <div className="compare d-none d-xl-flex">
                          <button
                            onClick={() =>
                              compairClick(true, product.product_id)
                            }
                            type="button"
                            className={`btn to-compare js-add-compare ${
                              crossIsActive ? "btn-compare-in" : ""
                            }`}
                            data-id="78103"
                            data-text-toggle="Remove from compare"
                          >
                            <span
                              className={crossIsActive ? "d-none" : "d-block"}
                            >
                              {translation?.button_compare}
                            </span>
                            <span
                              className={crossIsActive ? "d-block" : "d-none"}
                            >
                              {translation?.button_compare_remove}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              heartClick(
                                product.in_wishlist,
                                product.product_id
                              )
                            }
                            className="btn-fav to-fav js-add-wishlist to-fav"
                            data-id="78103"
                            data-text-toggle="Remove from wish list"
                          >
                            <i
                              className={`icon icon-tofav ${
                                product.in_wishlist ? "red-Heart" : ""
                              }`}
                            ></i>
                            <span
                              className={
                                product.in_wishlist ? "d-none" : "d-block"
                              }
                            >
                              {product.in_wishlist}{" "}
                              {translation?.button_wishlist}
                            </span>
                            <span
                              className={
                                product.in_wishlist ? "d-block" : "d-none"
                              }
                            >
                              {product.in_wishlist} Remove from wish list
                            </span>
                          </button>
                        </div>
                        {/* <!-- =specifications --> */}
                        <div className="specifications">
                          <div
                            className={`item-list ${isShow ? "show-all" : ""}`}
                          >
                            <div className="specification__title">
                              Specifications
                            </div>

                            {product.specifications?.length > 0 && (
                              <>
                                {product["specifications"][0][
                                  "specification_name"
                                ] !== "Type" && (
                                  <>
                                    <div className="item-specification__row">
                                      <div className="item-specification__title">
                                        <span>Type</span>
                                      </div>
                                      <div className="item-specification__value">
                                        {product.part_type}
                                      </div>
                                    </div>
                                  </>
                                )}

                                {product["specifications"].map(
                                  (specs: ProductSpecifications, i: number) => (
                                    <div
                                      className="item-specification__row"
                                      key={"specs_Item" + i}
                                    >
                                      <div className="item-specification__title">
                                        <span>{specs.specification_name}</span>
                                      </div>
                                      <div className="item-specification__value">
                                        {specs.specification_value}
                                      </div>
                                    </div>
                                  )
                                )}
                              </>
                            )}
                          </div>

                          <div className="other-specification d-block">
                            {product["specifications"]?.length > 6 &&
                              product["specifications"] && (
                                <button
                                  type="button"
                                  className="btn btn-show btn-inline"
                                  onClick={() => showFullSpecification(true)}
                                >
                                  {isShow === true && (
                                    <>
                                      <i className="icon icon-arrow-down-blue icon-rotate180"></i>
                                      <span>Hide full specifications</span>
                                    </>
                                  )}
                                  {isShow === false && (
                                    <>
                                      <i className="icon icon-arrow-down-blue "></i>
                                      <span>Show full specifications</span>
                                    </>
                                  )}
                                </button>
                              )}
                          </div>
                        </div>
                        {/* <!-- =/specifications --> */}
                      </div>
                    </div>
                    <div className="card__right right-card-width">
                      {product.offers?.length > 0 && (
                        <div className="stock">
                          <h4 className="stock_title text-center">
                            Offers{" "}
                            <InfoIcon
                              className="stock__title-info"
                              onClick={openInfoDialog}
                            />
                          </h4>
                          <div className="stock__list">
                            <div className="item-stock flex-7030">
                              <div className="item-stock__header item-stock__title">
                                {translation?.vql_vendor}
                                <div className="reliability ">
                                  <RatingStar></RatingStar>
                                  <div className="star-text">
                                    {translation?.vql_vendor_text1}
                                  </div>
                                </div>
                              </div>
                              <div className="item-stock__divider "></div>
                              <div className="item-stock__header item-stock__text">
                                {translation?.vql_qty}
                              </div>
                              <div className="item-stock__divider"></div>
                              <div className="item-stock__header item-stock__supply-time">
                                {translation?.vql_days}
                                <div className="tooltip-main">
                                  <i className="fa fa-clock-o"></i>
                                  <div
                                    className="toolTip_Tex "
                                    style={{ width: "300px" }}
                                  >
                                    Days is the number of days that the vendors
                                    will need to send items to our sorting
                                    facility. After which dispatch is initiated
                                    the following day. Final delivery to
                                    destination is calculated in the cart
                                  </div>
                                </div>
                              </div>
                              <div className="item-stock__divider"></div>
                              <div className="item-stock__right">
                                <div className="item-stock__header item-stock__price">
                                  {translation?.vql_price} [
                                  {product["offers"][0]?.price_symbol}]
                                </div>
                              </div>
                            </div>
                            {product.offers?.length &&
                              product.offers.map((offer: Offers, i: number) => (
                                <div
                                  className="item-stock"
                                  key={"offers_index" + i}
                                >
                                  <div className="item-stock__title">
                                    {offer?.offer_code}
                                    <div className="reliability tooltip-main">
                                      {/*-----here satar rating----->*/}
                                      <RatingStar
                                        rating={offer?.reliability}
                                      ></RatingStar>
                                      <div className="_info_tooltip">
                                        <div className="_stock">
                                          <div className="_item-stock ">
                                            <div className="_item-stock__title _row_head">
                                              Offer ID
                                            </div>
                                            <div className="_item-stock__divider"></div>
                                            <div className="_item-stock__text">
                                              {offer.offer_code}
                                            </div>
                                          </div>

                                          <div className="_item-stock">
                                            <div
                                              className="_item-stock__title _row_head"
                                              style={{ padding: "8.5px" }}
                                            >
                                              Reliability
                                            </div>
                                            <div className="_item-stock__divider"></div>
                                            <div className="_item-stock__text _reliability_percent paddint_reliability">
                                              <span className="_reliability_number">
                                                {offer.reliability}%
                                              </span>
                                              <RatingStar
                                                rating={offer.reliability}
                                              ></RatingStar>
                                            </div>
                                          </div>
                                          <div className="_item-stock  _flex-7030">
                                            <div className="_item-stock__title _caption_orders">
                                              Recent orders
                                            </div>
                                            <div className="_item-stock__divider"></div>
                                            <div className="_item-stock__text">
                                              {offer?.ordered_qty}
                                            </div>
                                          </div>

                                          <div className="_item-stock  _flex-7030 ">
                                            <div className="_item-stock__title _row_head">
                                              Acceptacnce rate
                                            </div>
                                            <div className="_item-stock__divider"></div>
                                            <div className="_item-stock__text">
                                              {offer?.acceptance_rate}%{" "}
                                             
                                            </div>
                                          </div>
                                          <div className="_item-stock  _flex-7030">
                                            <div className="_item-stock__title _row_head">
                                              Decline Rate
                                            </div>
                                            <div className="_item-stock__divider"></div>
                                            <div className="_item-stock__text">
                                              {offer?.decline_rate}%{" "}
                                              
                                            </div>
                                          </div>
                                          <div className="_item-stock _flex-7030">
                                            <div className="_item-stock__title _row_head">
                                              On Time{" "}
                                            </div>
                                            <div className="_item-stock__divider"></div>
                                            <div className="_item-stock__text">
                                              {/* {offer?.shipped_on_time_rate}% */}{" "}
                                              100%
                                            </div>
                                          </div>
                                          <div className="_item-stock  _flex-7030">
                                            <div className="_item-stock__title _row_head">
                                              Short Delay
                                            </div>
                                            <div className="_item-stock__divider"></div>
                                            <div className="_item-stock__text">
                                              {/* {offer?.minor_late_rate}% */}{" "}
                                              100%
                                            </div>
                                          </div>
                                          <div className="_item-stock  _flex-7030">
                                            <div className="_item-stock__title _row_head">
                                              Long Delay
                                            </div>
                                            <div className="_item-stock__divider"></div>
                                            <div className="_item-stock__text">
                                              {/* {offer?.late_rate}% */} 100%
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="item-stock__divider"></div>
                                  <div className="item-stock__text">
                                    <div
                                      className="instock status-2"
                                      data-toggle="tooltip"
                                      title="In stock"
                                    >
                                      {offer.qty > 300 && <>300+</>}
                                      {offer.qty < 300 && <>{offer.qty}</>}
                                    </div>
                                  </div>
                                  <div className="item-stock__divider"></div>
                                  <div className="item-stock__supply-time">
                                    {offer.days}d
                                  </div>
                                  <div className="item-stock__divider"></div>
                                  <div className="item-stock__right">
                                    <div className="item-stock__price">
                                      {offer.price_symbol} {offer.price}
                                    </div>
                                    <button
                                      type="button"
                                      className={`btn-cart js-cart-78103-18-11 js-btnAddToCart cart-hover incart ${
                                        offer.in_cart ? "color_Cart_gray" : ""
                                      } `}
                                      onClick={() =>
                                        openCartDialog(product, offer)
                                      }
                                    >
                                      <i className="icon icon-cart-white"></i>
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </div>

                          {(product?.delivery_msg ||
                            product?.free_shipping_msg) && (
                            <>
                              <div className="delivery d-flex align-items-center">
                                {product.delivery_msg != null && (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: product.delivery_msg,
                                    }}
                                  ></div>
                                )}

                                {product.free_shipping_msg != null && (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: product.free_shipping_msg,
                                    }}
                                  ></div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      {product.offers?.length == 0 && (
                        <>
                          {!product["stock_request"]?.stock_request_id && (
                            <button
                              type="button"
                              onClick={openNotifyModal}
                              className="w-100 js-in_stock_request btn btn-notify btn-gray btn-large box-shadow-gray justify-content-center Notify_Availability"
                            >
                              <i className="icon icon-letter"></i>
                              <span className="btnStockNotifyName">
                                Notify Availability
                              </span>
                            </button>
                          )}

                          {product["stock_request"]?.stock_request_id && (
                            <button
                              type="button"
                              onClick={openNotifyModal}
                              className="w-100 js-in_stock_request btn btn-notify btn-yellow btn-large box-shadow-gray justify-content-center Notify_Availability yellow-btn-notification"
                            >
                              <i className="icon icon-letter"></i>
                              <span className="btnStockNotifyName">
                                Notification ON
                              </span>
                            </button>
                          )}
                        </>
                      )}

                      {/* <!-- =/delivery --> */}
                    </div>
                    {/* <!-- =#right --> */}
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="container">
                  <div className="assembly-brands row d-block d-xl-flex">
                    <div className="col-xl-4">
                      {(product["sub_assembly"]?.length > 0 ||
                        product["parent_assembly"]?.length > 0) && (
                        <div className="assemblies">
                          <ul className="nav d-flex nav-title" role="tablist">
                            {product["sub_assembly"]?.length > 0 && (
                              <>
                                <li className="nav-item">
                                  <a
                                    className="nav-link"
                                    id="parent-assembly-tab"
                                    onClick={() => selectAssembly(false)}
                                  >
                                    <span
                                      className={`d-block ${
                                        isAssemblyShow
                                          ? "subAssembly_active"
                                          : ""
                                      }`}
                                    >
                                      Sub Assembly
                                    </span>
                                  </a>
                                </li>
                                <li className="separator"></li>
                              </>
                            )}
                            <li className="nav-item">
                              {product["parent_assembly"]?.length > 0 && (
                                <a
                                  className="nav-link"
                                  id="parent-assembly-tab"
                                  onClick={() => selectAssembly(false)}
                                >
                                  <span
                                    className={`d-block ${
                                      isAssemblyShow ? "" : "subAssembly_active"
                                    }`}
                                  >
                                    Parent Assembly
                                  </span>
                                </a>
                              )}
                            </li>
                          </ul>

                          {/* {isAssemblyShow === true && (
                            <Assembly
                              data={product.sub_assembly}
                              scroll={(id: any) => findOenumber(id)}
                            ></Assembly>
                          )}

                          {isAssemblyShow === false && (
                            <Assembly
                              data={product.parent_assembly}
                              scroll={(id: any) => findOenumber(id)}
                            ></Assembly>
                          )} */}
                        </div>
                      )}
                    </div>
                    {(product.related_products?.length > 0 || product.alternative_products?.length > 0 ) && (
                      <div className="others col-xl-6">
                        <div className="products">
                          <ul className="nav d-flex nav-title" role="tablist">
                            <li className="nav-item">
                              {product["related_products"]?.length > 0 && (
                                <a
                                  className="nav-link active pointer_none"
                                  id="other-brands-tab"
                                  onClick={() => showOtherBrands(true)}
                                >
                                  <span
                                    className={`d-lg-block brand_color ${
                                      brandsIsShow ? "brand_Active" : ""
                                    }`}
                                  >
                                    Other Brands
                                  </span>
                                </a>
                              )}
                            </li>

                            {(product.related_products?.length > 0 && product.alternative_products?.length > 0 ) && ( <li className="separator pointer_none"></li>)}

                            <li className="nav-item">
                              {product["alternative_products"]?.length > 0 && (
                                <a
                                  className="nav-link active pointer_none"
                                  id="alternative-product-tab"
                                  onClick={() => showOtherBrands(false)}
                                >
                                  <span
                                    className={`d-lg-block brand_color ${
                                      brandsIsShow ? "" : "brand_Active"
                                    }`}
                                  >
                                    Alternative product
                                  </span>
                                </a>
                              )}
                            </li>
                          </ul>
                          {/* {brandsIsShow === true && (
                            <CardSlider
                              data={product["related_products"]}
                              translation={translation}
                              key={"related products" + sliderKey}
                            />
                          )} */}

                          
                          {/* {brandsIsShow === false && (
                            <CardSlider
                              data={product["alternative_products"]}
                              translation={translation}
                              key={"alternative products" + sliderKey}
                            />
                          )} */}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="cars__list" id="vehicles">
                    <div className="row">
                      <div className="col-xl-7">
                        {product.vehicles?.length > 0 && (
                          <div className="vehicle">
                            <div className="title">
                              {translation?.tab_attribute}
                            </div>
                            <div className="item-vehicle custom-accordion">
                              {product.vehicles?.length &&
                                product.vehicles.map(
                                  (item: Vehicles, i: number) => (
                                    <div
                                      className="accordion accordion-flush mb-2"
                                      id={"accordionFlushExample" + i}
                                      key={"flush-headingOne_" + i}
                                    >
                                      <div className="accordion-item">
                                        <div
                                          className="accordion-header"
                                          id={"flush-headingOne" + i}
                                        >
                                          <div
                                            className="accordion-button collapsed heading-font"
                                            data-bs-toggle="collapse"
                                            data-bs-target={
                                              "#flush-collapseOne" + i
                                            }
                                            aria-expanded="false"
                                            aria-controls={
                                              "flush-collapseOne" + i
                                            }
                                          >
                                            <div className="item-vehicle__row">
                                              <div className="td td-1">
                                                <div className="arrow"></div>
                                              </div>
                                              <div className="td td-2">
                                                {item.brand}
                                              </div>
                                              <div className="td td-3">
                                                {item.class && (
                                                  <>{item.class} :</>
                                                )}
                                                <span className="ml-2">
                                                  {item.model}
                                                </span>
                                              </div>
                                              <div className="td td-4">
                                                {item?.sg_veh === 1 && (
                                                  <img
                                                    src="../../assets/template/images/flag-tur.png"
                                                    alt="singapore flag"
                                                  />
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          id={"flush-collapseOne" + i}
                                          className="accordion-collapse collapse"
                                          aria-labelledby="flush-headingOne"
                                          data-bs-parent={
                                            "#accordionFlushExample" + i
                                          }
                                        >
                                          <div className="accordion-body">
                                            <div className="orders__list">
                                              <div className="tr tr-head">
                                                <div className="td td-1">
                                                  Placement
                                                </div>
                                                <div className="td td-2">
                                                  Production
                                                </div>
                                                <div className="td td-3">
                                                  Eng.Vol.
                                                </div>
                                                <div className="td td-4">
                                                  Body No
                                                </div>
                                                <div className="td td-5">
                                                  Eng No
                                                </div>
                                                <div className="td td-6">
                                                  Notes
                                                </div>
                                                <div className="td td-7"></div>
                                              </div>
                                              {item["items"]?.length &&
                                                item.items.map(
                                                  (res: Items, i: number) => (
                                                    <div
                                                      className="tr tr-item"
                                                      key={"order_list_" + i}
                                                    >
                                                      <div className="inner">
                                                        <div className="td td-1">
                                                          {res.placement}
                                                        </div>
                                                        <div className="td td-2">
                                                          {res.years}
                                                        </div>
                                                        <div className="td td-3">
                                                          {res.eng_vol}
                                                        </div>
                                                        <div className="td td-4">
                                                          {res.body_no}
                                                        </div>
                                                        <div className="td td-5">
                                                          {res.eng_no}
                                                        </div>
                                                        <div className="td td-6">
                                                          {res.note}{" "}
                                                        </div>
                                                        <div className="td td-7">
                                                          {res?.sg_veh ===
                                                            1 && (
                                                            <img
                                                              src="../../assets/template/images/flag-tur.png"
                                                              alt="singapore flag"
                                                            />
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )
                                                )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="oenumbers col-xl-3">
                        {product.oe_numbers?.length > 0 && (
                          <div>
                            <div className="title">
                              {translation?.tab_review}
                            </div>
                            <div className="oenumbers__list">
                              <div className="item-oenumbers">
                                <div className="tr tr-head">
                                  <div className="td td-1">Owner</div>
                                  <div
                                    className="td td-2"
                                    onClick={handleClickScroll}
                                  >
                                    {translation?.text_part_numb}
                                  </div>
                                </div>
                                {product.oe_numbers?.length &&
                                  product.oe_numbers.map(
                                    (item: Oe_numbers, i: number) => (
                                      <div
                                        className="tr tr-item"
                                        key={"or_number_key" + i}
                                      >
                                        <div className="inner">
                                          <div className="td td-1">
                                            <a>
                                              <strong>{item.brand_name}</strong>
                                            </a>
                                          </div>
                                          <div className="td td-2">
                                            <a
                                              className="text-primery"
                                              onClick={() =>
                                                findOenumber(item.product_id)
                                              }
                                            >
                                              {item.part_number}
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <CustomDesignedDialog
          open={cartOpen}
          onClose={closeCartModal}
          title="Add to cart"
          component={
            <AddToCart
              product={selectedProduct}
              offer={selectedOffer}
              closeCartFromChild={closeCartModal}
              cartAdded={(offer: any) => addedInCart(offer)}
            ></AddToCart>
          }
          forLogin={false}
        />
        <CustomDesignedDialog
          open={infoOpen}
          onClose={closeInfoModal}
          title="Offers section description"
          component={<ProductInfoModal></ProductInfoModal>}
          forLogin={false}
        />
        <CustomDesignedDialog
          open={NotifyModalOpen}
          onClose={closeNotifyModal}
          title=""
          component={
            <NotifyAvailabilityModal
              id={id}
              addedRequestData={(data: any) => getNotifyDataFromChild(data)}
              closeModal={(value: any) => closeNotifyModal(value)}
              stockRequest={product["stock_request"]}
            ></NotifyAvailabilityModal>
          }
          forLogin={false}
        />

        <WarningCommonDialog
          open={NotificationModalOpen}
          onClose={warningNotificationModalClose}
          title={""}
          component={<></>}
          color={"#0672ba"}
          errorText={notifyAvailability["message"]}
        />
        <CustomDesignedDialog
          open={LoginOpen}
          onClose={closeLoginModal}
          title="Login"
          component={
            <Login closeLoginModal={closeLoginModal} modal={true}></Login>
          }
          forLogin={true}
        /> */}
      </div>
    </>
  );
}

export async function getServerSideProps({query}:any) {

    console.log("context", query);
    // const {query} =context;
      // Fetch data from an API                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
      const res = await fetch(`https://fp-client-api.asakashi.com/api/main/products/${query['id']}?guest_id=1713248912844&country_id=1&lang_id=1&currency_id=13`);
  
      const product = await res.json();
  
      const resTranslation = await fetch('https://fp-client-api.asakashi.com/api/langs/load_page?lang_id=1&page=product/product,product/search,default&guest_id=1713248912844&country_id=1&currency_id=13');
      const translations = await resTranslation.json();
        const id = query['id'];
      return {
        props: {
         product, translations, id
        },
      };
    }
export default ProductDetail;
