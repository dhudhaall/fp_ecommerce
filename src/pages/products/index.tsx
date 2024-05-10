import SearchResults from "./searchResults";
import "./productSearch.scss";
import SearchMainBox from "./searchBoxMain";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import customFetch from '../../app/util/fetchInterceptor';

function ProductSearch ({  products, translations }:any){
    const router = useRouter();
        var data:any;
        
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
                const previousParams = {...router.query,part_no:partNumber, formType:'partnumber', p_brand_id:p_brand ,part_sub_category_id:sub_cat};
                router.push({
                  pathname: '/products',
                  query:previousParams
                });
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
          const previousParams = {...router.query, part_no:partNumber, formType:'partnumber', p_brand_id:p_brand ,part_sub_category_id:sub_cat};

          router.push({ 
            pathname:'/products',
            query:previousParams
          });
        }
        
        const changeFiltersubCat = (event: any, value:number) => {
          if(event.target.checked){
            sub_cat=value;
          }else{
            sub_cat = 0;
          }

          const previousParams = {...router.query, part_no:partNumber, formType:'partnumber', p_brand_id:p_brand ,part_sub_category_id:sub_cat};

          router.push({ 
            pathname:'/products',
            query:previousParams
          });
        }
    return (
        <>

<div className="productSearch">
        <div className="main searchresults-page">
          <div className="container">
            <div className="breadcrumbs">
              <ul>
                <li className="B_homecrumb">
                  <a >Home</a>
                </li>
                <li>—</li>
                <li className="current">
                  <a>Product Search</a>
                </li>
              </ul>
            </div>
            <div className="row mt-5">
              <aside className="col-xl-2 col-xlg-3 col-lg-3 col-md-3">
                <div className="widget smartsearch">

                  {/* <div className="ProductSearchMainBox "> */}
                    {/* <div className="inner "> */}
                      {/* <div className="smartsearch__header smartsearch__vehicle">
                        <h5 className="title-heading-search">
                          {translations.text_search_by}
                        </h5>
                       
                      </div> */}
                      {/* <div className="smartsearch__body"> */}
                      {/* <form onSubmit={submitPartNumberForm} className="searchForm js-part-search open d-flex" id="partnumForm1">
                            <input type="text" onChange={changePartNumber} className="form-control js-part-id mr-3" name="search" placeholder="Example : 04465-13020" />
                            <button type="submit" className="submit short-btn" aria-label="Search">  <i className="icon icon-search"></i></button>
                      </form>  */}
                      {/* <div>
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
        </div> */}
                      {/* </div> */}
                    {/* </div>
                  </div> */}

                  <SearchMainBox translation={translations}></SearchMainBox>
                </div>
               
                
              </aside>
              <div className="col-xl-8 col-xlg-7 col-md-7">
                <div className="search-by-vehicle">
                <SearchResults products={products?.['search_result']?.['data']} translation={translations}></SearchResults>
                
                </div>
              </div>
            </div>
          </div>
        </div>
{/* 
        <WarningCommonDialog
          open={openWarning}
          onClose={warningModalClose}
          title={""}
          color={"#0672ba"}
          // shadow={"#0672ba"}
          errorText={errorText}
          component={<></>}
        />
        <WarningCommonDialog
          open={openWrongVinWarning}
          onClose={warningVinSuggestionClose}
          title={""}
          color={"#c91537"}
          // shadow={"#0672ba"}
          errorText={errorText}
          component={<></>}
        />
        <WarningCommonDialog
          open={openVinWarning}
          onClose={warningVinModalClose}
          title={""}
          component={
            <SearchBoxModalWarning
              warningText={vinError}
              type={"vin"}
            ></SearchBoxModalWarning>
          }
          color={"#0672ba"}
          errorText={""}
        />
        <WarningCommonDialog
          open={openPlateWarning}
          onClose={warningPlateModalClose}
          title={""}
          component={
            <SearchBoxModalWarning
              warningText={vinError}
              type={"plate"}
            ></SearchBoxModalWarning>
          }
          color={"#c91537"}
          errorText={""}
        /> */}

        
      </div>

    
            
       
        </>
    )
}

export async function getServerSideProps({query}:any) {

  console.log("context", query);
    // const {query} =context;
    // Fetch data from an API  
    // const params = { formType:'partnumber', part_no: query['part_no'], p_brand_id:query['p_brand_id'], part_sub_category_id:[query['part_sub_category_id']],lang_id:query['lang_id'], guest_id:1713248912844, country_id:1 , currency_id:query['currency_id'] , per_page=20 , page=1}    
//     let res:any = {};
//     try {
//       if(query['formType'] === 'partnumber'){
//         res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BASE_URL}/products/part_search?part_no=${query['part_no']}&p_brand_id[]=${[query['p_brand_id']]}&part_sub_category_id[]=${query['part_sub_category_id']}&lang_id=${query['lang_id']}&guest_id=1713248912844&country_id=${query['country_id']}&lang_id=${query['lang_id']}&currency_id=${query['currency_id']}&per_page=${query['per_page']}&page=${query['page']}`);

//       }else  if(query['formType'] === 'vin'){
//         res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BASE_URL}/products/vin_search?vin=${query['vin']}&p_brand_id[]=${[query['p_brand_id']]}&part_sub_category_id[]=${query['part_sub_category_id']}&lang_id=${query['lang_id']}&guest_id=1713248912844&country_id=${query['country_id']}&lang_id=${query['lang_id']}&currency_id=${query['currency_id']}&per_page=${query['per_page']}&page=${query['page']}`);
//       }else if(query['formType'] === 'plateNo'){
//         res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BASE_URL}/products/plate_search?vin=${query['plate_no']}&p_brand_id[]=${[query['p_brand_id']]}&part_sub_category_id[]=${query['part_sub_category_id']}&lang_id=${query['lang_id']}&guest_id=1713248912844&country_id=${query['country_id']}&lang_id=${query['lang_id']}&currency_id=${query['currency_id']}&per_page=${query['per_page']}&page=${query['page']}`);
//       }else if(query['formType'] === 'car'){
//         res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BASE_URL}/products/vehicle_search?vin=${query['plate_no']}&veh_type=${[query['veh_type']]}&v_brand_id=${query['v_brand_id']}&class_id=${query['class_id']}&model_id=${query['model_id']}&year=${query['year']}&body_no=${query['body_no']}&eng_vol=${query['eng_vol']}
//         &eng_no=${query['eng_no']}&lang_id=${query['lang_id']}&guest_id=1713248912844&country_id=${query['country_id']}&lang_id=${query['lang_id']}&currency_id=${query['currency_id']}&per_page=${query['per_page']}&page=${query['page']}`);
//       }else if(query['formType'] === 'moto'){
//         res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BASE_URL}/products/vehicle_search?vin=${query['plate_no']}&veh_type=${[query['veh_type']]}&v_brand_id=${query['v_brand_id']}&class_id=${query['class_id']}&model_id=${query['model_id']}&year=${query['year']}&body_no=${query['body_no']}&eng_vol=${query['eng_vol']}
//         &eng_no=${query['eng_no']}&lang_id=${query['lang_id']}&guest_id=1713248912844&country_id=${query['country_id']}&lang_id=${query['lang_id']}&currency_id=${query['currency_id']}&per_page=${query['per_page']}&page=${query['page']}`);
//       }else if(query['formType'] === 'size'){
//         res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BASE_URL}/products/vehicle_search?vin=${query['plate_no']}&veh_type=${[query['veh_type']]}&v_brand_id=${query['v_brand_id']}&class_id=${query['class_id']}&model_id=${query['model_id']}&year=${query['year']}&body_no=${query['body_no']}&eng_vol=${query['eng_vol']}
//         &eng_no=${query['eng_no']}&lang_id=${query['lang_id']}&guest_id=1713248912844&country_id=${query['country_id']}&lang_id=${query['lang_id']}&currency_id=${query['currency_id']}&per_page=${query['per_page']}&page=${query['page']}`);
//       }

//       if (!res.ok) {
//         throw new Error('Network response was not ok');
//      }
  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
//     const products = await res.json();
//   } catch (error) {
//     console.error('Error fetching data:', error);
// } 

//     const resTranslation = await fetch(`https://fp-client-api.asakashi.com/api/langs/load_page?lang_id=${query['lang_id']}&page=product/search/partSearch&guest_id=1713248912844&country_id=1&currency_id=13`);
//     const translations = await resTranslation.json();
  
//     return {
//       props: {
//        products, translations 
//       },
//     };

try {
  let res;
  let endpoint ='';

  switch (query['formType']) {
      case 'partnumber':
          endpoint = `/products/part_search?part_no=${query['part_no']}`;
          break;
      case 'vin':
          endpoint = `/products/vin_search?vin=${query['vin']}&formType=vin`;
          // endpoint ='https://fp-client-api.asakashi.com/api/main/products/vin_search?formType=vin&vin=MR053REE204100003&per_page=60&guest_id=1713248912844&country_id=188&lang_id=1&currency_id=13'
          break;
      case 'plateNo':
          endpoint = `/products/plate_search?plate_no=${query['plate_no']}`;
          break;
      case 'car':
        endpoint = `/products/vehicle_search?&veh_type=${query['veh_type']}&v_brand_id=${query['v_brand_id']}&class_id=${query['class_id']}&model_id=${query['model_id']}&year=${query['year']}&body_no=${query['body_no']}&eng_vol=${query['eng_vol']}&eng_no=${query['eng_no']}`;
        break;
      case 'moto':
        endpoint = `/products/vehicle_search?&veh_type=${query['veh_type']}&v_brand_id=${query['v_brand_id']}&class_id=${query['class_id']}&model_id=${query['model_id']}&year=${query['year']}&body_no=${query['body_no']}&eng_vol=${query['eng_vol']}&eng_no=${query['eng_no']}`;
        break;
      case 'size':
          endpoint = `/products/size_search?type_id=${query['type_id']}&profile_id=${query['profile_id']}&approximation=${query['approximation']}`;
          break;
      default:
          throw new Error('Invalid form type');
  }
  console.error('endpoint------', endpoint);
  // res= await fetch(endpoint);
  res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BASE_URL}${endpoint}&guest_id=1713248912844&per_page=10`);
  if (!res.ok) {
      throw new Error('Network response was not ok');
  }

  const products = await res.json();

  const resTranslation = await fetch(`https://fp-client-api.asakashi.com/api/langs/load_page?lang_id=${query['lang_id']}&page=product/search/partSearch&guest_id=1713248912844&country_id=1&currency_id=13`);
  const translations = await resTranslation.json();

  return {
      props: {
          products,
          translations
      },
  };
} catch (error) {
  console.error('Error fetching data:', error);
  return {
      props: {
          products: [],
          translations: []
      },
  };
}
  }

export default ProductSearch;