"use server"
// import SearchResults from "./searchResults";
// import "./productSearch.scss";
// import SearchMainBox from "./searchBoxMain";

// const getProducts = async (query:any) => {
   
//     console.log("hello from getproducts")
//     const res = await fetch('https://fp-client-api.asakashi.com/api/main/products/part_search?formType=partnumber&part_no=c111&lang=1&guest_id=1713248912844&country_id=1&lang_id=1&currency_id=13&per_page=20&page=1');
//     // const resTranslation = await fetch('https://fp-client-api.asakashi.com/api/langs/load_page?lang_id=1&page=product/search/partSearch&guest_id=1713248912844&country_id=1&currency_id=13');
//     if (!res.ok) {
//         console.log("res", "Error sksksksksk")
//       }
//     const data = res.json();
//     // const translations = resTranslation.json();
//     // Pass data to the page via props

//     return data;
// };

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

async function ProductSearch ():Promise<any>{
    
    //     var data:any;
    //     var translations:any;
    //     var partNumber:string;

    //     // Access query parameters from the router object
     
    //     data = await getProducts('');
    //     translations = await getTranslations(); 
       
    //    const submitPartNumberForm = async (event: any): Promise<void> => {
    //             event.preventDefault();
    //             let data = { part_no: partNumber, type: 'partnumber' };
    //             data = await getProducts(data);
    //     }
        
    //     const changePartNumber = (event: any) => {
    //         partNumber = event.target.value;
    //     }
    return (
        <>
        
        prodododj
            {/* {/* <form onSubmit={submitPartNumberForm} className="searchForm js-part-search open" id="partnumForm1">
                            <input type="text" onChange={changePartNumber} className="form-control js-part-id" name="search" placeholder="Example : 04465-13020" />
                            <button type="submit" className="btn btn-primary" aria-label="Search"><i className="icon icon-search-middle"></i>Search</button>
            </form> */}

            {/* <SearchMainBox ></SearchMainBox>
            
            <SearchResults products={data['search_result']['data']} translation={translations}></SearchResults>  */}
        </>
    )
}


export default ProductSearch;


