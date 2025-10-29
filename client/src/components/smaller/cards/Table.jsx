import React from "react";
import { StateCheck } from "../table/TableData";

export const Table = ({ data = [], title = [], type }) => {
  const isUserTable = type === "users";
  const isPaymentTable = type === "payments";
  const isEventTable = type === "events";

  return (
    <table
      className={`text-sm border-collapse ${
        isPaymentTable ? "w-full" : "w-max"
      }`}
    >
      <thead>
        <tr className="border-b border-black/5">
          {title.map((text) => (
            <th
              key={text}
              className="capitalize p-5 text-left text-black/70 font-poppinsMedium"
            >
              {text.replace("_", " ")}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {/* USERS TABLE */}
        {isUserTable &&
          data.map((item, index) => (
            <tr key={index} className="border-b border-black/5">
              <td className="p-4 text-black/50 py-8">0{index + 1}</td>
              <td className="p-4 text-black/50">{item[title[1]]}</td>
              <td className="p-4 text-black/50">{item[title[2]]}</td>
              <td className="p-4 text-black/50">{item[title[3]]}</td>
            </tr>
          ))}

        {/* EVENTS TABLE */}
        {isEventTable &&
          data.map((item, index) => (
            <tr key={index} className="border-b border-black/5">
              <td className="p-4 text-black/50">{item.name}</td>
              <td className="p-4 text-black/50">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
              </td>
              <td className="p-4 text-black/50">
                {item.description.length > 45
                  ? `${item.description.slice(0, 45)}...`
                  : item.description}
              </td>
              <td className="p-4 text-black/50">{item.city}</td>
              <td className="p-4 text-black/50">{item.country}</td>
            </tr>
          ))}

        {/* PAYMENTS TABLE */}
        {isPaymentTable &&
          data.map((item, index) => (
            <tr key={index} className="border-b border-black/5">
              <td className="p-4 text-black/50">0{index + 1}</td>

              {/* Status Component */}
              <StateCheck state={item.state} id={item._id} />

              <td className="p-4 text-black/50">{item.category}</td>
              <td className="p-4 text-black/50">
                {`${item.currency}. ${Number(item.amount).toLocaleString()}`}
              </td>
              <td className="p-4 text-black/50">{item.event.name}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
