import React, { useMemo, useState } from "react";
import Single from "./Single";
import { RelatedWrapper } from "./RelatedWrapper";
import { useGlobal } from "../../../context/AppContext";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const HotelCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-md shadow-md p-4 animate-pulse w-full mx-auto">
      {/* Image carousel placeholder */}
      <div className="relative w-full h-72 bg-gray-200 rounded-xl overflow-hidden">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-400/60 rounded-full" />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-400/60 rounded-full" />
      </div>

      {/* Dots under image */}
      <div className="flex justify-center space-x-2 mt-3">
        <div className="w-3 h-3 bg-gray-200 rounded-full" />
        <div className="w-3 h-3 bg-gray-200 rounded-full" />
        <div className="w-3 h-3 bg-gray-200 rounded-full" />
      </div>

      {/* Hotel title */}
      <div className="mt-6 w-2/3 h-6 bg-gray-200 rounded-md" />

      {/* Description text */}
      <div className="mt-3 space-y-2">
        <div className="w-full h-4 bg-gray-200 rounded-md" />
        <div className="w-full h-4 bg-gray-200 rounded-md" />
        <div className="w-11/12 h-4 bg-gray-200 rounded-md" />
        <div className="w-10/12 h-4 bg-gray-200 rounded-md" />
        <div className="w-3/4 h-4 bg-gray-200 rounded-md" />
      </div>

      {/* Price section */}
      <div className="mt-6">
        <div className="w-20 h-5 bg-gray-200 rounded-md mb-2" />
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded-full" />
          <div className="w-40 h-4 bg-gray-200 rounded-md" />
        </div>
      </div>
    </div>
  );
};

const Wrapper = () => {
  const { client } = useGlobal();
  const { name } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["events", name],
    queryFn: async () => {
      const { data } = await client.get(`event/all?name=${name}`);
      return data.events[0];
    },
    enabled: !!name,
  });
  const categories = useMemo(
    () => data?.category?.map((i) => i._id) || [],
    [data?.categories]
  );
  const {
    data: relatedData,
    isLoading: isLoadingRelated,
    isError: isRelatedError,
  } = useQuery({
    queryKey: ["events", "related", categories, data?._id],
    queryFn: async () => {
      const res = await client.get(
        `event/all?categories=${encodeURIComponent(categories)}&eventId=${data?._id}`
      );
      return res.data.events;
    },
    enabled: !!data?._id && !!categories,
  });

  // const getRelated = async (name) => {
  //   setRecentLoading(true);
  //   try {
  //     const categoriesData = await client.get(`event/all?name=${name}`);
  //     const categories = categoriesData.data.events[0].category.map(
  //       (i) => i._id
  //     );
  //     const eventId = categoriesData.data.events[0]._id;
  //     const { data } = await client.get(
  //       `event/all?categories=${categories}&eventId=${eventId}`,
  //       { categories }
  //     );
  //     const { events } = data;
  //     dispatch({ type: actions.GET_RELATED, payload: { data: events } });
  //   } catch (error) {
  //     dispatch({ type: actions.GET_RELATED, payload: { data: [] } });
  //   }
  // };
  // Loading State
  if (isLoading || isLoadingRelated) return <HotelCardSkeleton />;
  return (
    <RelatedWrapper
      related={relatedData}
      isRelatedError={isRelatedError}
      element={<Single data={data} isError={isError} />}
      comments={true}
    />
  );
};

export default Wrapper;
