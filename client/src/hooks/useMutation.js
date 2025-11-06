import { useState } from "react";
import { useGlobal } from "../context/AppContext";

/**
 * Custom hook for performing a mutation request using Axios.
 *
 * @param {Object} params - Mutation parameters.
 * @param {"post" | "patch" | "put" | "delete"} params.method - The HTTP method to use.
 * @param {string} [params.path="users/user"] - The API endpoint path.
 * @param {Object} [params.filters] - Query parameters or filters for the request.
 *
 * @returns {{
 *   mutateAsync: (options?: object, callbacks?: { onSuccess?: (data:any)=>void, onError?: (error:any)=>void }) => Promise<any>,
 *   error: any,
 *   isError: boolean,
 *   isLoading: boolean
 * }}
 */
const useMutation = ({ path = "users/user", method, filters }) => {
  const { client } = useGlobal();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const mutateAsync = async (options, { onSuccess, onError } = {}) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const { data } = await client[method]?.(path, {
        ...options,
        params: filters,
      });
      onSuccess?.(data);
      return data;
    } catch (err) {
      const message = err.response?.data || err.message;
      setError(message);
      setIsError(true);
      onError?.(err);
      throw err; // optionally rethrow to allow `await` try/catch outside
    } finally {
      setIsLoading(false);
    }
  };

  return { mutateAsync, error, isError, isLoading };
};

export default useMutation;
