import React, { useEffect, useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import { useGlobal } from "../../context/AppContext";
import { actions } from "../../components/Events/context/EventActions";
import { useEvent } from "../../components/Events/context/EventContext";

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

  const { dispatch } = useEvent()
  const filters = useMemo(
    () => ({
      page,
      limit,
      sort: mapSort[sort],
      arrange,
      validity,
      expiry,
      min,
      max,
      category,
      search,
    }),
    [page, limit, sort, arrange, validity, expiry, min, max, category, search]
  );
  const { data, isLoading, isError, error } = useFetch({
    path: `event/all`,
    filters
  });
  useEffect(() => {
    if (data && !isLoading && !isError) {
      const { events, pages } = data;
      dispatch({
        type: actions.GET_EVENTS,
        payload: {
          data: events,
          pages: pages?.pages ,
          currentPage: pages?.currentPage ,
        },
      });
    }
  }, [data, isLoading, isError]);

  return { data, isError, error, isLoading };
};

export default useGetEvent;
