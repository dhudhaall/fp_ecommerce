
import './footer.scss';
import { useRouter } from "next/router";
import ShareDataService from '../../services/shareData.service';
import { retrievePageDescription } from '../../Store/Slice/pageDescriptionSlice';
import { useDispatch } from 'react-redux';
import { Language } from '../../Models/dropdowns';
import { RouteParams } from '../../Lang/queryParams';
import {getCookie } from 'cookies-next';
import { getTopBar } from '@/app/services/commonApis.service';
import { useState } from 'react';


function Footer({data}:any) {
  console.log("result--", data);
    const router = useRouter();
    const existingQueryParams = router.query;
    const langId= existingQueryParams['lang']!;

 const [informationCatalog, setInformation_catalog] = useState([] as any); 
  const [informationPages, setInformation_pages] = useState([] as any);
  const dispatch = useDispatch();

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  const currentYear = getCurrentYear();
  // const getLangId = () =>{
  //   const lang:Language= JSON.parse(localStorage.getItem('lang')!);
  //   // setLangId(lang)
  // }

  const unSubInfo= ShareDataService.getCatalogsData().subscribe((res:any)=>{
    console.log("ShareDataService--", res);
    setInformation_catalog(res['value']["catalog"]);
     setInformation_pages(res['value']["pages"]);
   })
   const unSubLangId = ShareDataService.getLangId().subscribe(res=>{
      console.log("getLangId--", res);
   })
//   useEffect(() => {
    
//     unSubInfo.unsubscribe()
//     // unSubLangId.unsubscribe()
//   }, []);


   
  const getSlug=(slug:string,cat:string)=>{
   
   if(slug){
    switch (slug) {
      case 'about-us':
          { 
            const newQueryParams = {slug:slug }
            const mergedQueryParams = { ...existingQueryParams, ...newQueryParams };
            dispatch(retrievePageDescription({lang_id:langId, slug:slug}));
            router.push({
                pathname: '/aboutUs',
                query: mergedQueryParams,
            });
              break;
          }
          case 'contact-us':
            {
              dispatch(retrievePageDescription({lang_id:langId, slug:slug}));
              router.push({
                pathname: '/contactUs',
                search: `slug=${slug}&lang=${langId}`,
                
              })
                break;
            }
        case 'delivery-information':
            {
              dispatch(retrievePageDescription({lang_id:langId, slug:slug}));
              router.push({
                pathname: '/deliveryInformation',
                search: `slug=${slug}&lang=${langId}`,
              })
                break;
            }
    
        case 'return-policy':
            {
              dispatch(retrievePageDescription({lang_id:langId, slug:slug}));
              router.push({
                pathname: '/returnPolicy',
                search: `slug=${slug}&lang=${langId}`,
              })
                break;
            }
    
        case 'privacy-policy':
            {
              dispatch(retrievePageDescription({lang_id:langId, slug:slug}));
              router.push({
                pathname: '/privacyPolicy',
                search: `slug=${slug}&lang=${langId}`,
              })
                break;
            }
        case 'terms-conditions':
            {
              dispatch(retrievePageDescription({lang_id:langId, slug:slug}));
              router.push({
                pathname: '/termsCondition',
                search: `slug=${slug}&lang=${langId}`,
              })
                break;
            }
  }
   }else{

    switch(cat){
      case 'Lubricants':
      {  
        router.push({
          pathname: '/searchproducts',
        search: `?formType=${cat}&lang=${langId}`,
        })
          break;
      }
      case 'Wiper Blades':
      {  
        router.push({
          pathname: '/wiperSearch',
          search: `lang=${langId}`,
        })
          break;
      }
    }
   }
  

  }
  return (
    <div className="footer">
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="copyright col-lg-2 col-md-4">
              <div className="logo footer-logo"><img src="/assets/template/images/logo2.jpg" alt="FitinPart" /></div>
              <div className="text">
                <p>© 2015-{currentYear} FitinPart online car parts distributor </p>
                <p>All rights reserved</p>
              </div>
            </div>

            {/* <!-- =menu --> */}
            <div className="col-lg-5 d-none d-lg-block">
              <div className="footer__menu d-flex">
                <div className="menu">
                  <h3>Catalog</h3>
                  <ul>
                    {informationCatalog.map((cat:any)=>(
                      <li key={'catalog-'+cat.category_id}><a title={cat.name} onClick={()=>getSlug('',cat.name)} >{cat.name}</a></li>
                    ))}
                  </ul>
                </div>
                <div className="menu">
                  <h3>Company</h3>
                  <ul>
                    {informationPages.map((pages:any,i:number)=>(
                       <li key={"pages-list"+i} ><a  title={pages.title} onClick={()=>getSlug(pages.slug,'')}  dangerouslySetInnerHTML={{ __html: pages.title }}></a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* <!-- =/menu --> */}

            <div className="col-lg-3 col-md-6">
              <div className="address icon icon-balloon">1 Kaki Bukit Rd 1 Enterprise One #03-10/11 Singapore 415934</div>
              <div className="address icon icon-balloon">15 Gul Way #03-01, Singapore 629193</div>
              <div className="tel icon icon-tel">+65 67497481</div>
              <div className="payments flex-wrap align-items-center d-none d-lg-flex">
                <img src="/assets/images/payments.jpg" alt=""/>
                  <img src="/assets/images/billmelater.jpg" alt=""/>
                  </div>
              </div>
            </div>

            <div className="payments flex-wrap align-items-center justify-content-center d-md-flex d-lg-none">
            <img src="/assets/images/payments.jpg" alt=""/>
                  <img src="/assets/images/billmelater.jpg" alt=""/>
                </div>
            </div>
      </footer>

         

        </div>
);
}

// export async function getServerSideProps({ context }:any) {
//   console.log("footer", context);      
//   // const result = await fetch(`https://fp-client-api.asakashi.com/api/top_bar?lang_id=1&guest_id=1713248912844`);
  
//   // const data = await result.json();

//   const resTranslation = await fetch('https://fp-client-api.asakashi.com/api/langs/load_page?lang_id=1&page=product/product,product/search,default&guest_id=1713248912844&country_id=1&currency_id=13');
//   const data = await resTranslation.json();
//   // ShareDataService.setTopbarapiData(data);
//    console.log("data", data);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
//     // console.log("res", res);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
//     // getCookie('lang', { req, res});
//     return {
//       props: {
//         data
//       },
//     };
// }

export default Footer;