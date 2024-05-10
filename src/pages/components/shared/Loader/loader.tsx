import React from "react";
import './loaderStyles.scss';
const Loader = () => {
  const style = {}
  return (
    <div className="loader-wrapper js-loader">
      <div className="shaft-load"><div className="shaft1"></div><div className="shaft2"></div><div className="shaft3"></div><div className="shaft4"></div><div className="shaft5"></div><div className="shaft6"></div><div className="shaft7"></div><div className="shaft8"></div><div className="shaft9"></div><div className="shaft10"></div></div>
    </div>
  );
};




export default Loader;