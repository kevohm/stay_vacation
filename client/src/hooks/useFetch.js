import React, { useEffect, useRef, useState } from "react";
import { useGlobal } from "../context/AppContext";

const useFetch = ({ path, filters, options, staleTime = 0 }) => {
  const { client } = useGlobal();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const cacheRef = useRef(new Map()); // cache per queryKey
  const timerRef = useRef(null);

  const queryKey = JSON.stringify({ path, filters });

  const fetcher = async (force = false) => {
    const cached = cacheRef.current.get(queryKey);
    const now = Date.now();

    // 🕒 Use cached data if it's still fresh
    if (!force && cached && now - cached.timestamp < staleTime) {
      setData(cached.data);
      return;
    }

    try {
      setIsLoading(true);
      setIsError(false);
      const { data } = await client.get(path, { ...options, params: filters });
      setData(data);
      cacheRef.current.set(queryKey, { data, timestamp: now });
    } catch (err) {
      setIsError(true);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Fetch when path or filters change
  // useEffect(() => {
  //   if (path) fetcher();
  //   return () => clearTimeout(timerRef.current);
  // }, [queryKey]);

  return { data, isLoading, isError, error, refetch: () => fetcher(true) };
};

export default useFetch;
