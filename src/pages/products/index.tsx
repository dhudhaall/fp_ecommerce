import SearchResults from "./searchResults";
import "./productSearch.scss";
// import SearchMainBox from "../../app/searchProducts/searchBoxMain";
import { useRouter } from "next/router";
// const getTranslations = async () => {
//     const resTranslation = await fetch('https://fp-client-api.asakashi.com/api/langs/load_page?lang_id=1&page=product/search/partSearch&guest_id=1713248912844&country_id=1&currency_id=13');
//     if (!resTranslation.ok) {
//         console.log("res", "Error sksksksksk")
//       }
//     const data = resTranslation.json();
//     // const translations = resTranslation.json();
//     // Pass data to the page via props
//     return data;
// };

function ProductSearch ({  products, translation }:any){
    const router = useRouter();
        var data:any;
        var translations:any={};
        
        let p_brand:number = 0;
        let sub_cat:number =0;
        const {part_no, p_brand_id, part_sub_category_id}:any = router.query;
        let partNumber = part_no;
        p_brand =p_brand_id;
        sub_cat =part_sub_category_id;
        // let p_brand:any[] = p_brand_id;
        // Access query parameters from the router object
     
    
       const submitPartNumberForm = async (event: any): Promise<void> => {
                event.preventDefault();
                console.log("partNumber2------",partNumber)
                router.push(`/products?part_no=${partNumber}&type=partnumber&p_brand_id=${p_brand}&part_sub_category_id=${sub_cat}`);
                // const res = await fetch(`https://fp-client-api.asakashi.com/api/main/products/part_search?formType=partnumber&part_no=${partNumber}&lang=1&guest_id=1713248912844&country_id=1&lang_id=1&currency_id=13&per_page=20&page=1`);
                // products = {};
                // products = await res.json();
        }

        const changePartNumber = (event: any) => {

          console.log("partNumber------",event.target.value)
            partNumber = event.target.value;
        }
        
        const changeFilter = (event: any, value:number) => {

          if(event.target.checked){
            p_brand=value;
          }else{
            p_brand =  0;
          }
         
          router.push(`/products?part_no=${partNumber}&type=partnumber&p_brand_id=${p_brand}&part_sub_category_id=${sub_cat}`);
        }
        
        const changeFiltersubCat = (event: any, value:number) => {
          if(event.target.checked){
            sub_cat=value;
          }else{
            sub_cat = 0;
          }
          router.push(`/products?part_no=${partNumber}&type=partnumber&p_brand_id=${p_brand}&part_sub_category_id=${sub_cat}`);
        }
    return (
        <>

        <div className="row">
          <div className="col-md-4">
          <form onSubmit={submitPartNumberForm} className="searchForm js-part-search open d-flex" id="partnumForm1">
                            <input type="text" onChange={changePartNumber} className="form-control js-part-id mr-3" name="search" placeholder="Example : 04465-13020" />
                            <button type="submit" className="btn btn-primary pr-5 pl-5" aria-label="Search">Search</button>
            </form> 

            <div>
        <div className="form-check">
          <input onChange={(event)=>changeFilter(event, 830)} className="form-check-input" type="checkbox" value="830" id="flexCheckDefault"/>
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Azumi
          </label>
        </div>
          </div>
          <div className="form-check">
          <input onChange={(event)=>changeFiltersubCat(event, 8)} className="form-check-input" type="checkbox" value="8" id="flexCheckChecked"/>
          <label className="form-check-label" htmlFor="flexCheckChecked">
          OIL Filter
          </label>
        </div>
          
        </div>
              
        
            </div>
            --------------------------------------------------------------------------------------
        products List
        
        {/* {products['search_result']['data'].map((product:any, index:number) => (
          <ul key={index}>
            {product['items'].map((item:any, itemindex:number) => (
          <li key={itemindex}>{item.name}</li>
          ))}

          </ul>
        ))} */}
        
       
        {/* translations

        {JSON.stringify(translation)} */}
            
            <SearchResults products={products['search_result']['data']} translation={translations}></SearchResults>
        </>
    )
}

export async function getServerSideProps({query}:any) {

  
  console.log("context", query);
  // const {query} =context;
    // Fetch data from an API                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    const res = await fetch(`https://fp-client-api.asakashi.com/api/main/products/part_search?formType=partnumber&part_no=${query['part_no']}&p_brand_id=${[query['p_brand_id']]}&part_sub_category_id=${query['part_sub_category_id']}&lang=1&guest_id=1713248912844&country_id=1&lang_id=1&currency_id=13&per_page=20&page=1`);

    const products = await res.json();

    const resTranslation = await fetch('https://fp-client-api.asakashi.com/api/langs/load_page?lang_id=1&page=product/search/partSearch&guest_id=1713248912844&country_id=1&currency_id=13');
    const translation = await resTranslation.json();
  
    return {
      props: {
       products, translation
      },
    };
  }

export default ProductSearch;