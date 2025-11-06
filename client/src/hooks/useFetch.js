import React, { useEffect } from "react";
import { useGlobal } from "../context/AppContext";
import axios from "axios";
import { useState } from "react";

/**
 * Custom hook for performing a mutation request using Axios.
 *
 * @param {Object} params - Mutation parameters.
 * @param {"get"} params.method - The HTTP method to use.
 * @param {string} [params.path="users/user"] - The API endpoint path.
 * @param {Object} [params.filters] - Query parameters or filters for the request.
 * @param {Object} [params.options] - Additional Axios request options.
 *
 * @returns {{
 *   data: any,
 *   error: any,
 *   isError: boolean,
 *   isLoading: boolean
 * }} Mutation result state.
 */

const useFetch = ({ path = `users/user`, filters, options }) => {
  const { client } = useGlobal();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetcher = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const { data } = await client.get?.(path, {
        ...options,
        params: filters,
      });
      setData(data);
    } catch (error) {
      setError(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Stringify filters to compare by value instead of reference
  useEffect(() => {
    fetcher();
  }, [path, JSON.stringify(filters)]); // 👈 triggers only if filters actually change

  return { data, error, isError, isLoading, refetch: fetcher };
};

export default useFetch;
