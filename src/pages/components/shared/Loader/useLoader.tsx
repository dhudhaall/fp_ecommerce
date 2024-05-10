import React, { useState } from "react";
import Loader from "./loader";
const useLoader = () => {
  const [loading, setLoading] = useState(false);
  // const startLoading = () => setLoading(true)
  // const stopLoading = () => setLoading(false)
  return [
    loading ? <Loader /> : null,
    () => setLoading(true),
    () => setLoading(false),
  ] as const;
};

export default useLoader;

