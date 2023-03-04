import { useState, useEffect, memo } from "react";
import { Http } from "@/utils";

function useHttpHook({ url, method = "post", headers, body = {}, watch = [] }) {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Http({
      url,
      method,
      headers,
      body,
      setResult,
      setLoading,
    });
  }, watch);

  return [result, loading];
}

export default memo(useHttpHook);
