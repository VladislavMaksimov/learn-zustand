import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export const useUrlStorage = <T extends Record<string, string>>(
  params: T,
  setParams: (params: T) => void
) => {
  const [queryParams, setQueryParams] = useSearchParams();

  const setParamsFromUrl = useCallback(() => {
    const paramsFromUrl = Object.keys(params).reduce((acc, key) => {
      const value = queryParams.get(key);
      if (value) {
        acc[key as keyof T] = value as T[keyof T];
      }
      return acc;
    }, {} as T);
    if (paramsFromUrl) {
      setParams(paramsFromUrl);
    }
  }, [params, queryParams, setParams]);

  const initialParamsSet = useRef(false);
  useEffect(() => {
    if (initialParamsSet.current) return;
    setParamsFromUrl();
    initialParamsSet.current = true;
  }, [setParamsFromUrl]);

  useEffect(() => {
    const newQueryParams = new URLSearchParams();
    for (const key in params) {
      if (params[key]) {
        newQueryParams.set(key, params[key]);
      }
    }
    setQueryParams(newQueryParams);
  }, [params, setQueryParams]);
};
