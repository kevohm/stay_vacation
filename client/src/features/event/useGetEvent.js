import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useGlobal } from "../../context/AppContext";
import { actions } from "../../context/appActions";

const useGetEvent = ({
  page = 1,
  limit = 5,
  sort = "created at",
  arrange = "desc",
  validity = "lte",
  expiry = new Date().toISOString(),
  min = 0,
  max = 900000,
  category = "",
  search = "",
} = {}) => {
  const mapSort = {
    name: "name",
    description: "descripton",
    validity: "validity",
    city: "city",
    country: "country",
    "created at": "createdAt",
    "updated at": "updatedAt",
  };

  const { dispatch } = useGlobal();
  const { data, isLoading, isError, error } = useFetch({
    path: `event/all`,
    filters: {
      page,
      limit,
      sort: mapSort[sort],
      arrange,
      validity,
      expiry,
      min,
      max,
      category,
      search
    },
  });
  useEffect(() => {
    if (data && !isLoading && !isError) {
      const { events, pages } = data;
      dispatch({
        type: actions.GET_EVENTS,
        payload: {
          data: events,
          pages: pages.pages,
          currentPage: pages.currentPage,
        },
      });
    }
  }, [data, isLoading, isError]);

  return { data, isError, error, isLoading };
};

export default useGetEvent;
