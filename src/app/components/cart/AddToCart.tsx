import React, { useEffect, useState } from "react";
import { updateCart, addtoCart } from "../../services/cart.service";
import "./addToCart.scss";
import { connect, useDispatch } from "react-redux";
import { loadCart, setCartData } from "../../Store/Slice/shareDataSlices";
// import useLoader from "../../shared/Loader/useLoader";
import RatingStar from "../starRating/starRating";


function AddToCart(props: any) {
  // const [loader, showLoader, hideLoader] = useLoader(); //initialize useLoader hook
  const { product, offer, selectedOfferIndex } = props;
  const [remark, setRemark] = useState("");
  const [qty, setQty] = useState(1);
  const [error, generateError] = useState(false);
  const [showautoReOrder, SetshowautoReOrder] = useState(true);
  const [reorder_price, setReorderPrice] = useState(0);
  const [reorder_percentage, setReorderPercentage] = useState(0);
  const [reorder_days, setReorderDays] = useState(0);
  const [formattedDate, setFormatedDate] = useState('');

  // const dispatch = useDispatch();
  const date = new Date();
  const formatted_date  = () =>  {
    setFormatedDate(`${date.getFullYear()}-${date.getMonth() + 1 < 10? '0'+(date.getMonth() +1): date.getMonth()+1}-${date.getDate() < 10? '0'+date.getDate(): date.getDate()}`);
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
  }
  const [reorder_date, setReorderDate] = useState(`${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`);
  useEffect(() => {
    if (offer.ordered_qty !== 0) {
      setQty(offer?.ordered_qty);
      setReorderPrice(offer?.price);
    } else {
      setQty(1);
      setReorderPrice(offer?.price);
    }
    setReorderPercentage(0);
    setReorderDays(Number(offer?.days));
    date.setDate(date.getDate()+ Number(offer?.days));
    setReorderDate(formatted_date());
  }, []);

  const changeRemark = (event: any) => {
    setRemark(event.target.value);
  };

  const changeQty = (event: any) => {
    const value = event.target.value;
    const removeLeadingZero = value.replace(/^0+/, "");
    setQty(Number(removeLeadingZero));
    // setOrderedQty(Number(event.target.value));
  };

  //increase counter
  const increase = () => {
    setQty((count) => count + 1);
    // setOrderedQty(count => count + 1);
  };

  //decrease counter
  const decrease = () => {
    if (qty > 1) {
      setQty((count) => count - 1);
      // setOrderedQty(count => count - 1);
    }
  };

  const addToCart = () => {
   
    // showLoader();
    const data =
      remark === ""
        ? {
            product_id: product.product_id,
            qty: qty,
            offer_id: offer.offer_id,
            price_id: offer.price_id,
            reorder:showautoReOrder,
            reorder_max_price: reorder_price,
            reorder_max_date :formattedDate
          }
        : {
            product_id: product.product_id,
            qty: qty,
            offer_id: offer.offer_id,
            price_id: offer.price_id,
            reorder:showautoReOrder,
            reorder_max_price: reorder_price,
            reorder_max_date :formattedDate,
            remarks: remark,
          };
    addtoCart(data).then(
      (res: any) => {
        // dispatch(setCartData(res["data"]));
        props.closeCartFromChild(true);
        props.cartAdded(offer, selectedOfferIndex);
        // dispatch(loadCart(true));
        // hideLoader();
      },
      (err) => {
        props.closeCartFromChild(true);
        // hideLoader();
      }
    );
  };
  const updateToCart = () => {
    // showLoader();
    const data = {
      product_id: product.product_id,
      qty: qty,
      offer_id: offer.offer_id,
      reorder:showautoReOrder,
      reorder_max_price: reorder_price,
      reorder_max_date :formattedDate
    };
    updateCart(data).then(
      (res: any) => {
        // dispatch(setCartData(res["data"]));
        props.closeCartFromChild(true);
        // dispatch(loadCart(true));
        // hideLoader();
      },
      (err) => {
        props.closeCartFromChild(true);
        // hideLoader();
      }
    );
  };

  const closeCart = () => {
    props.closeCartFromChild(true);
  };

  //decrease counter
  const selectReorder = (e:any) => {
    SetshowautoReOrder(e.target.checked);
  };
  
  const changeReorderPrice = (value:any) => {
    setReorderPrice(value);
  }; 
  
  const onBlurReorderPrice = (e:any) => {
    const initialValue = parseFloat(offer?.price);
    const newPrice = parseFloat(e.target.value);

    const difference = newPrice - initialValue;

    const percentage =parseFloat((( difference / initialValue) * 100).toFixed(2));

    setReorderPrice(e.target.value);
     setReorderPercentage(percentage);
  };

  const increasePrice = (value:number) =>{
    if(value ===1){
      const incremented = parseFloat(reorder_price.toString()) + 1;
      setReorderPrice(incremented);
    onBlurReorderPrice({target:{value:incremented} })

    }else{
     
      const decremented = parseFloat(reorder_price.toString()) - 1;
      if(offer?.price > decremented){
        setReorderPrice(offer?.price);
    onBlurReorderPrice({target:{value:offer?.price} })

      }else{
        setReorderPrice(decremented);
    onBlurReorderPrice({target:{value:decremented} })

      }
      
    }

  }
  
  const increasePercentage = (value:number) =>{
    
    if(value ===1){
      const incremented = parseFloat(reorder_percentage.toString()) + 1;
      
      setReorderPercentage(incremented);
      changePercentage({target:{value:incremented} })

    }else{
     
      const decremented = parseFloat(reorder_percentage.toString()) - 1;
      if(decremented === 0 || decremented < 0){
        setReorderPercentage(0);
        setReorderPrice(offer?.price)

      }else{
        setReorderPercentage(decremented);
        changePercentage({target:{value:decremented} })

      }
      
    }

  }
  
  const changePercentage = (e:any) => {
    setReorderPercentage(parseFloat(e.target.value));
     const price = parseFloat(((e.target.value/100)*offer?.price).toFixed(2));
     const totalPrice =parseFloat(price.toString()) + parseFloat(offer?.price.toString());
     setReorderPrice(totalPrice);
  };
  
  const changeReorderDays = (e:any) => {
    const days = parseInt(e.target.value);
    
      setReorderDays(days);
  };
  
  const onBlurReorderDays = (e:any) => {
    const days = parseInt(e.target.value);
    if(days < offer?.days){
      setReorderDays(offer?.days);
    }else{
    setReorderDays(days);
    date.setDate(date.getDate() + days);
    setReorderDate(formatted_date())
    }
  };

 const incrementDays = (value:number)=>{
  
  const days  = reorder_days + value;
  if(days < offer?.days){
    setReorderDays(Number(offer?.days));
  }else{
    setReorderDays(days);
    date.setDate(Number(date.getDate() + days));
      setReorderDate(formatted_date())
  }
  
 }


  return (
    <>
      {/* {loader} */}
      <div className="AddToCart">
        <div className="js-ajax-form">
          <div className="">
            <div className="d-flex flex-wrap modal-cart">
              <div className="product-pic">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="desc">
                <h3 className="product-title">{product.name}</h3>
                <div
                  data-placement="left"
                  className="item-products__quote-wh-code product-offer"
                >
                  {offer.offer_code}
                  <RatingStar rating={offer.reliability}></RatingStar>
                </div>
                <div className="item-products__quote-instock instock status-3 mb-3 ">
                  Available {offer.qty > 300 && <>300+</>}
                  {offer.qty < 300 && <>{offer.qty}</>} pcs
                </div>
                <div className="d-flex flex-wrap count-price align-items-center">
                  <div className="countmodule js-countmodule">
                    <button
                      type="button"
                      className="minus js-number-spin"
                      aria-label="minus"
                      onClick={decrease}
                      disabled={qty == 1}
                    ></button>
                    <input
                      type="number"
                      id="input"
                      name="qty"
                      min="1"
                      value={qty}
                      max={offer.qty}
                      onChange={(e: any) => {
                        const val = e.target.value;
                        if (val === "") {
                          setQty(Number(val));
                          generateError(false);
                        } else if (Number(val) > offer.qty) {
                          setQty(Number(val));
                          generateError(true);
                        } else {
                          generateError(false);
                          const removeLeadingZero = val.replace(/^0+/, "");
                          setQty(Number(removeLeadingZero));
                        }
                      }}
                      className="form-control count-control js-count-control"
                    />
                    <button
                      type="button"
                      className="plus js-number-spin"
                      aria-label="plus"
                      disabled={offer.qty == qty}
                      onClick={increase}
                    ></button>
                  </div>
                  <div className="price">
                    {offer.price_symbol} {offer.price}
                  </div>
                </div>

                {error && (
                  <small className="danger">
                    Selected quantity is greater than Available pcs
                  </small>
                )}
                <div className="remarks">
                  <p>Remarks</p>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control js-item-remark"
                      name="remark"
                      onChange={changeRemark}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="reorder_item_setting ">
              <div className="row reorder_row">
                <div className="col-sm-3">
                  Auto reorder{" "}
                  <i
                    className="stock__title-info fa fa-info-circle"
                    data-toggle="tooltip"
                    title=""
                    data-original-title="Switching on Auto Reorder allows us to search for other suppliers if order is cancelled by previous selected vendor."
                  ></i>
                </div>{" "}
                <div className="col-sm-5">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name="autoreorder_enabled"
                      value={showautoReOrder?1:-1}
                      checked={showautoReOrder}
                      onChange={(e:any)=>selectReorder(e)}
                    />
                    <div
                      className="checkbox__text"
                      data-on="on"
                      data-off="off"
                    ></div>
                  </label>
                </div>
              </div>
              <div className="reorder_params" style={{'opacity':showautoReOrder? 1:0.6}}>
                <div className="row reorder_row">
                  <div className="col-md-3">Max price</div>
                  <div className="col-md-4">
                    <div className="countmodule reorder_price_value floatmodule js-floatmodule">
                      <button
                        type="button"
                        className="minus js-number-spin"
                        aria-label="minus"
                        disabled={!showautoReOrder}
                        onClick={(e:any)=>increasePrice(-1)}
                      ></button>
                      <input
                        type="number"
                        name="reorder_price"
                        className="form-control count-control js-count-control"
                        disabled={!showautoReOrder}
                        min={offer.price}
                        value={reorder_price}
                        onChange={(e: any) => {
                          const val = e.target.value;
                          const removeLeadingZero = val.replace(/^0+/, "");
                          changeReorderPrice(removeLeadingZero);
                        }}

                        onBlur={onBlurReorderPrice}

                      />
                      <button
                        type="button"
                        className="plus js-number-spin"
                        aria-label="plus"
                        disabled={!showautoReOrder}
                        onClick={(e:any)=>increasePrice(1)}
                      ></button>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="countmodule reorder_price_percent floatmodule js-floatmodule">
                      <button
                        type="button"
                        className="minus js-number-spin"
                        aria-label="minus"
                        disabled={!showautoReOrder}
                        onClick={(e:any)=>increasePercentage(-1)}
                        
                      ></button>
                      <span className="plus_sign">+</span>
                      <input
                        type="number"
                        name="percentage"
                        min={0}
                        value={reorder_percentage}
                        className="form-control count-control js-count-control"
                        disabled={!showautoReOrder}
                        onChange={changePercentage}
           
                      />
                      <span className="percent_sign">%</span>
                      <button
                        type="button"
                        className="plus js-number-spin"
                        aria-label="plus"
                        disabled={!showautoReOrder}
                        onClick={(e:any)=>increasePercentage(1)}
                      ></button>
                    </div>
                  </div>
                </div>
                <div className="row reorder_row">
                  <div className="col-md-3">Max delivery </div>
                  <div className="col-md-4">
                    <div className="countmodule reorder_max_date ">
                      <input
                        type="text"
                        readOnly
                        name="reorder_max_date"
                        value={reorder_date}
                        className="form-control count-control js-count-control"
                        disabled={!showautoReOrder}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="countmodule reorder_days  js-countmodule">
                      <button
                        type="button"
                        className="minus js-number-spin"
                        aria-label="minus"
                        disabled={!showautoReOrder}
                        onClick={(e:any)=>incrementDays(-1)}
                      ></button>
                      <input
                       
                        type="number"
                        name="reorder_days"
                        value={reorder_days}
                        min={offer?.days}
                        className="form-control count-control js-count-control"
                        disabled={!showautoReOrder}
                        onChange={(e:any)=>changeReorderDays(e)}
                        onBlur={(e:any)=>onBlurReorderDays(e)}
                      />
                      <span className="days_sign">days</span>
                      <button
                        type="button"
                        className="plus js-number-spin"
                        aria-label="plus"
                        disabled={!showautoReOrder}
                        onClick={(e:any)=>incrementDays(1)}
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer d-flex bg-transparent">
            {offer.in_cart === false && (
              <button
                type="submit"
                className=" btn btn-submit btn-blue btn-large btn-blue-lighten-hover box-shadow js-btn-submit add-animation"
                disabled={error || qty == 0}
                onClick={addToCart}
              >
                <i className="icon icon-littlecart cart"></i> Add to cart
              </button>
            )}
            {offer.in_cart === true && (
              <button
                type="submit"
                className=" btn btn-submit btn-blue btn-large btn-blue-lighten-hover box-shadow js-btn-submi add-animationt"
                disabled={error || qty == 0}
                onClick={updateToCart}
              >
                <i className="icon icon-littlecart cart"></i> Update cart
              </button>
            )}
            <button
              type="submit"
              className=" btn btn-submit  btn-gray  btn-large btn-blue-lighten-hover box-shadow js-btn-submit"
              onClick={closeCart}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddToCart;
