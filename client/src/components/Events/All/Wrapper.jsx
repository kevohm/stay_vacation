import React, { useEffect, useState, useMemo } from "react";
import Events from "./Events";
import Search from "./Search";
import Recent from "./Recent";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useGlobal } from "../../../context/AppContext";
import { minDate } from "../context/utils";

const EventCardSkeleton = () => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow animate-pulse">
      {/* Image placeholder */}
      <div className="w-56 h-36 bg-gray-200 rounded-xl" />

      {/* Text content */}
      <div className="flex-1 space-y-3">
        <div className="w-1/3 h-5 bg-gray-200 rounded" />
        <div className="w-2/3 h-4 bg-gray-200 rounded" />
        <div className="w-full h-3 bg-gray-200 rounded" />
        <div className="w-5/6 h-3 bg-gray-200 rounded" />
      </div>

      {/* Button placeholder */}
      <div className="w-16 h-8 bg-gray-200 rounded-md" />
    </div>
  );
};

const FilterCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow animate-pulse space-y-6 w-full">
      {/* Toggle Buttons */}
      <div className="flex gap-3">
        <div className="w-24 h-8 bg-gray-200 rounded-md" />
        <div className="w-24 h-8 bg-gray-200 rounded-md" />
      </div>

      {/* Search */}
      <div className="space-y-2">
        <div className="w-20 h-4 bg-gray-200 rounded" />
        <div className="flex">
          <div className="flex-1 h-10 bg-gray-200 rounded-l-md" />
          <div className="w-16 h-10 bg-gray-200 rounded-r-md" />
        </div>
      </div>

      {/* Price */}
      <div className="space-y-3">
        <div className="w-16 h-4 bg-gray-200 rounded" />
        <div className="h-2 bg-gray-200 rounded-full" />
        <div className="flex justify-between">
          <div className="w-16 h-3 bg-gray-200 rounded" />
          <div className="w-20 h-3 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-3">
        <div className="w-24 h-4 bg-gray-200 rounded" />
        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-20 h-8 bg-gray-200 rounded-full" />
          ))}
        </div>
      </div>

      {/* Date */}
      <div className="space-y-2">
        <div className="w-16 h-4 bg-gray-200 rounded" />
        <div className="w-full h-10 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
};

const EventSkeleton = () => {
  return (
    <div className="flex flex-col space-y-12 md:space-y-0 md:grid md:grid-cols-[repeat(3,1fr)] grid-flow-col-dense md:grid-rows-[38.958rem,780px,1fr] gap-5 items-start">
      <FilterCardSkeleton />
      <div className="space-y-4 col-span-2">
        {[...Array(3)].map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

const Wrapper = () => {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { client } = useGlobal();

  // ✅ Get filters from query params safely
  const initialFilters = {
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    price: {
      min: Number(searchParams.get("min")) || 0,
      max: Number(searchParams.get("max")) || 10000,
    },
  };

  const [filterData, setfilterData] = useState(initialFilters);
  const [sortBy, setSortBy] = useState({
    sort: "created_at",
    arrange: "desc",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["events", filterData, page],
    queryFn: async () => {
      const { data } = await client.get(`event/all`, {
        params: {
          sort: sortBy.sort,
          arrange: sortBy.arrange,
          category: filterData.category,
          search: filterData.search,
          price_start: filterData.price.min,
          price_end: filterData.price.max,
          page,
          limit: 6,
        },
      });
      return data;
    },
    enabled: true,
  });

  // ✅ Sync filters with query params
  useEffect(() => {
    const search = searchParams.get("search");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const category = searchParams.get("category");

    setfilterData({
      search: search || "",
      category: category || "",
      price: {
        min: Number(min) || 0,
        max: Number(max) || 10000,
      },
    });
  }, [searchParams]);

  // ✅ Handle navigation + query sync
  const handleRefresh = (data) => {
    const { price, ...filters } = data;
    const queryParams = new URLSearchParams({
      ...filters,
      min: price?.min ?? filterData.price.min,
      max: price?.max ?? filterData.price.max,
    }).toString();
    navigate(`/events?${queryParams}`);
  };

  const changePage = (value) => setPage(Number(value));
  const handleSort = (sort, arrange) => setSortBy({ sort, arrange });

  if (isLoading) return <EventSkeleton />;
  if (isError) return <div>Error loading events.</div>;

  console.log("Filters:", filterData);
  console.log("Data:", data);

  return (
    <div className="flex flex-col space-y-12 md:space-y-0 md:grid md:grid-cols-[repeat(3,1fr)] grid-flow-col-dense md:grid-rows-[38.958rem,780px,1fr] gap-5 items-start">
      <Search
        handleRefresh={handleRefresh}
        filter={filterData}
        setfilterData={setfilterData}
      />
      <Events
        loading={isLoading}
        isError={isError}
        eventsData={data?.events || []}
        page={page}
        pages={data?.pages}
        changePage={changePage}
        handleCategory={handleSort}
      />
      <Recent />
    </div>
  );
};

export default Wrapper;
