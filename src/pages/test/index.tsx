import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";

function Test() {

  const router = useRouter();

  const { query } = router;
  const {formType} = router.query;

//   useEffect(() => {
//     hitapi();
//   }, []);

    const hitapi = async ()=>{
        console.log("query test", query);
    // const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_BASE_URL}/products/part_search?`, query);

    const data = { ...query};
    // const products = await res.json();
//     fetch(`${process.env.NEXT_PUBLIC_MAIN_BASE_URL}/products/part_search`, {
// 	method: 'GET',
// 	headers: {
// 		'Content-Type': 'application/x-www-form-urlencoded',
//         'Access-Control-Allow-Origin': '*'
// 	}, 
// }).then(res=>{

// })
  }
  
  return (
    <>
     <p>test opage {formType}</p>
    </>
  );
}

export default Test;
