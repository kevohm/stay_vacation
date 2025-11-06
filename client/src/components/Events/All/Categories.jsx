import React, { useEffect } from "react";
import { Loader } from "../../smaller/load/Loader";
import { BiLoaderAlt } from "react-icons/bi";
import { useEvent } from "../context/EventContext";

const Categories = ({ handleChange, category }) => {
  const { categories, getCategories } = useEvent();
  useEffect(() => {
    getCategories();
  }, []);
  if (categories.loading) {
    return (
      <div className="error">
        <label>Category</label>
        <div>
          <div>
            <p>loading...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="input flex flex-col gap-4">
      <label className="text-dark-blue ">Category</label>
      <div className="radio flex flex-wrap gap-x-4 gap-y-2.5">
        {categories.length === 0 ? (
          <div>No Categories Available</div>
        ) : (
          categories.data.map((i) => {
            const { name } = i;
            return (
              <label
                key={name}
                className={`px-4 py-2 rounded-full border cursor-pointer font-medium transition-all duration-200 
        ${
          category === name
            ? "bg-orange  text-white border-orange"
            : "border-orange text-dark-blue hover:bg-orange/10"
        }`}
              >
                <input
                  type="radio"
                  name="category"
                  value={name}
                  checked={category === name}
                  onChange={handleChange}
                  className="hidden"
                />
                {name}
              </label>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Categories;
