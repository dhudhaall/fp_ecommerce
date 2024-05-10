
import "./productSearch.scss";

import ProductCard from "./ProductCard";
import { useRouter } from "next/router";

 function SearchResults (props:any){
  const { products, translation} = props;
  const router = useRouter();
  const {formType} = router.query;
    
    return (

      <>

        {formType === "partnumber" && 
          <div className="js-content-wrapper">
            {products?.length > 0 && (
              products?.map((result: any, index: number) => (<div key={"partNumber_data_" + index}>
                <div className="searchresult-plate">
                  {/* <div className="title">{partNumber} found 3 Crosses with 27 Equivalents</div> */}
                  <div className="title">
                    {result?.caption_header}
                  </div>
                  <div className="search-other d-sm-flex flex-wrap align-items-center">
                    {translation.text_search_else}
                  
                    <button
                      // onClick={() => openSubmitPartNoModal()}
                      className="js-show-popup btn btn-middle btn-blue btn-blue-lighten-hover box-shadow text-white open-modal-RD"
                      // dangerouslySetInnerHTML={{
                      //   __html: translation.text_submit_number_rnd,
                      // }}
                    >Submit Part no</button>
                  </div>
                </div>
                {result['items']?.length > 0 &&
                  result['items']?.map((item: any, i: number) => (
                    <div key={"partNumber_" + i}>
                      <p className="sub-header-title">
                        Equivalent for: {item.name}
                      </p>
                      <div className="js-products-wrapper js-paginated-items products__list  flex-wrap justify-content-around  d-lg-grid grid-lg-4">
                        {item["cross_items"]["data"]?.length > 0 &&
                          item["cross_items"]["data"]?.map(
                            (crossItem: any, i: number) => (
                              // <div key={"partNumber_SearchResults-" + i}>{crossItem['brand']}</div>
                              <ProductCard
                                item={crossItem}
                                key={"partNumber_SearchResults-" + i}
                                index={i}
                                translation={translation}
                              ></ProductCard>
                            )
                          )}

                        {item["cross_items"]["data"]?.length === 0 && (
                          <p>Parts not found</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
              ))
          )}
            </div>
        } 
        
        {formType !== "partnumber" && (
              <div className="js-content-wrapper">
                <div className="js-products-wrapper js-paginated-items products__list  flex-wrap justify-content-around  d-lg-grid grid-lg-4">
                  {products?.length > 0 &&
                    products?.map((item: any, i: number) => (
                      <ProductCard
                        item={item}
                        key={"product_Results-" + i}
                        translation={translation}
                      ></ProductCard>
                    ))}

                  {/* next thre */}
                  {products?.length === 0 && (
                    <div>
                      <p>0 Results found</p>
                    </div>
                  )}
                </div>
              </div>
        )}
    
    </>
        
    
  )
    
}


export default SearchResults;

