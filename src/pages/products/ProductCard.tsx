
import RatingStar from "@/app/components/starRating/starRating";
import "./productSearch.scss";
import { useRouter } from "next/router";
import CustomDesignedDialog from "@/app/components/customDesignedDialog/CustomDesignedDialog";
import AddToCart from "../../app/components/cart/AddToCart";
import { Offers,Product } from "@/app/Models/product";
import { useState } from "react";

function ProductCard(props:any){

    const {item, index, translation} = props;
    const isActive = item?.["in_wishlist"];
    const router = useRouter();


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({} as any);
  const [selectedOffer, setSelectedOffer] = useState({} as any);
  const [selectedOfferIndex, setSelectedOfferIndex] = useState<any>();

    const toProductDetail = (productID:number)=>{
      router.push(`/productDetails/${productID}`)
    }

    const openCartDialog = (product: Product, offer: Offers, index: number) => {
      console.log("openCartDialog--------------");
      setSelectedProduct(product);
      setSelectedOffer(offer);
      setSelectedOfferIndex(index);
      setIsModalOpen(true);
    };
    const closeCartModal = () => {
      setIsModalOpen(false);
    };

    const addedInCart = (offer: any, index: number) => {
      const obj = { ...offer };
      obj.in_cart = true;
  
      // const temp = [...inCartOffers];
      // temp[index] = obj;
      // setSetInCartOffers(temp);
    };

    return (
      <div>
        <div className="ProductCard" key={"card" + index}>
        <div className="products__item item-products ItemBox card-hight">
          <div
            className="item-products__pic" 
          >
            <a title={item?.name} className="image_p" onClick={()=>toProductDetail(item.product_id)}>
              {item?.image !== "" && item?.image != null && (
                <img src={item?.image} alt={item?.name} />
              )}
  
              {(item?.image === "" || item?.image == null) && (
                <img
                  src={item?.manufacturer_image}
                  alt={item?.manufacturer}
                  className="item-products__brand-img item-products__brand_opacity "
                />
              )}
            </a>
          
            <a className="item-products__brand"  href={`/productDetails/${item.product_id}`}>
              {item?.image !== "" &&
                item?.image !== null &&
                item?.manufacturer_image !== "" &&
                item?.manufacturer_image !== null && (
                  <img
                    src={item?.manufacturer_image}
                    alt={item?.manufacturer}
                    className="item-products__brand-img"
                  />
                )}
            </a>
            
          </div>
          <button
            // onClick={() => heartClick(isActive, item.product_id)}
            type="button"
            className="item-products__fav-btn btn-fav js-add-wishlist to-fav"
          >
            <i className={`icon icon-tofav ${isActive ? "red-Heart" : ""}`}></i>
          </button>
          <div className="item-products__body text-width">
            <div className="item-products__desc">
           
              <strong>{item?.parent_category_name}</strong>, {item?.category_name}
              <div className="item-products__sys_loc">{item.p_sys_loc_name}</div>
            </div>
            <div className="item-products__title">
              <a>{item?.name} </a>
            </div>
            <div className="item-products__subtitle">
              <span
                className=" alt_part_notice"
                title="Replacement for  04465-25040"
              >
                {item?.product_subtitle_warning}
              </span>
            </div>
          </div>
          {item?.["offers"]?.length > 0 && (
            <div className="item-products__bottom">
              <div className="item-products__quote d-flex justify-content-between">
                <div className="item-products__header item-products__quote-wh-code ">
                  {translation?.vql_vendor}
                </div>
                <div className="item-products__header item-products__quote-instock instock status-1">
                  {translation?.vql_qty}
                </div>
                <div className="item-products__header item-products__quote-supply-time ">
                  <div className="tooltip-main">
                  <i className="fa fa-clock-o"></i>
                  <div className="toolTip_Tex">
                     Days
                    </div>
                  </div>
                </div>
                <div className="item-products__header item-products__right">
                  <div className="left d-flex align-items-center item-products__quote-price">
                    {translation?.vql_price}
                    <span>[{item?.["offers"][0]["price_symbol"]}]</span>
                  </div>
                </div>
              </div>
              {item?.["offers"].slice(0, 3).map((offer: any, i: number) => (
                <div
                  className="item-products__quote d-flex justify-content-between my-3"
                  key={"offers_item-" + i}
                >
                  <div
                    title=""
                    className="item-products__quote-wh-code rating-custom tooltip-main"
                  >
                    {offer?.offer_code}
                    <RatingStar rating={offer?.reliability}></RatingStar>
                    <div className="_info_tooltip">
                      <div className="_stock">
                        <div className="_item-stock ">
                          <div className="_item-stock__title _row_head">
                            Offer ID
                          </div>
                          <div className="_item-stock__divider"></div>
                          <div className="_item-stock__text">{offer?.offer_code}</div>
                        </div>
  
                        <div className="_item-stock">
                          <div className="_item-stock__title _row_head" style={{padding: '8.5px'}}>
                            Reliability
                          </div>
                          <div className="_item-stock__divider"></div>
                          <div className="_item-stock__text _reliability_percent">
                            <span className="_reliability_number">{offer?.reliability_percent || 0}%</span>
                            <RatingStar rating={offer?.reliability}></RatingStar>
                          </div>
                        </div>
                        <div className="_item-stock  _flex-7030">
                          <div className="_item-stock__title _caption_orders">
                            Recent orders
                          </div>
                          <div className="_item-stock__divider"></div>
                          <div className="_item-stock__text">{offer?.ordered_qty || 0}</div>
                        </div>
  
                        <div className="_item-stock  _flex-7030 ">
                          <div className="_item-stock__title _row_head">
                            Acceptacnce rate
                          </div>
                          <div className="_item-stock__divider"></div>
                          <div className="_item-stock__text">
                            {offer?.acceptance_rate || 0}%
                          </div>
                        </div>
                        <div className="_item-stock  _flex-7030">
                          <div className="_item-stock__title _row_head">
                            Decline Rate
                          </div>
                          <div className="_item-stock__divider"></div>
                          <div className="_item-stock__text">
                            {offer?.decline_rate || 0}%
                          </div>
                        </div>
                        <div className="_item-stock _flex-7030">
                          <div className="_item-stock__title _row_head">
                            On Time
                          </div>
                          <div className="_item-stock__divider"></div>
                          <div className="_item-stock__text">
                            {offer?.shipped_on_time_rate || 0}%
                          </div>
                        </div>
                        <div className="_item-stock  _flex-7030">
                          <div className="_item-stock__title _row_head">
                            Short Delay
                          </div>
                          <div className="_item-stock__divider"></div>
                          <div className="_item-stock__text">
                            {offer?.minor_late_rate || 0}%
                          </div>
                        </div>
                        <div className="_item-stock  _flex-7030">
                          <div className="_item-stock__title _row_head">
                            Long Delay
                          </div>
                          <div className="_item-stock__divider"></div>
                          <div className="_item-stock__text">
                            {offer?.late_rate || 0}%
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div
                      className="toolTip_Tex"
                      dangerouslySetInnerHTML={{
                        __html: translation.vql_vendor_hint,
                      }}
                    ></div> */}
                  </div>
  
                  <div
                    className="item-products__quote-instock instock status-2"
                    data-toggle="tooltip"
                    title="Avail 6122pcs"
                  >
                    {offer?.qty > 300 && <>300+</>}
                    {offer?.qty < 300 && <>{offer.qty}</>}
                  </div>
                  <div className="item-products__quote-supply-time mr-2">
                    {" "}
                    {offer?.days}
                  </div>
                  <div className="item-products__right d-flex">
                    <div className="left d-flex align-items-center item-products__quote-price">
                      <div className="d-flex justify-content-between">
                        <div className="price">
                          <div className="current-price">
                            {" "}
                            {offer?.price_symbol} {offer?.price}{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fav-cart">
                      <button
                        onClick={() => {
                          openCartDialog(item, offer, i);
                        }}
                        type="button"
                        className={`btn-cart item-products__cart-btn js-btnAddToCart js-cart-78103-18-1 ${
                          offer?.in_cart 
                            ? "color_Cart_gray"
                            : ""
                        } `}
                      >
                        <i className="icon icon-cart-small-white"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {item?.["offers"]?.length > 3 && (
                <div className="item-products__quote d-flex justify-content-center">
                  <a
                    className="viewMore"
                    onClick={() => toProductDetail(item.product_id)}
                  >
                   
                    View {Number(item?.["offers"]?.length - 3)} more offers
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

 <CustomDesignedDialog
        open={isModalOpen}
        onClose={closeCartModal}
        title="Add to cart"
        component={
          <AddToCart
            product={selectedProduct}
            offer={selectedOffer}
            closeCartFromChild={closeCartModal}
            cartAdded={(offer: any, i: number) => addedInCart(offer, i)}
            selectedOfferIndex={selectedOfferIndex}
          ></AddToCart>

          // <RatingStar rating={10}></RatingStar>
        }
        forLogin={false}
      />
       </div>
      </div>
    )
}

export default ProductCard;