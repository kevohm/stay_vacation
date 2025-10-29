import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvent } from "../context/EventContext";
import { FormError } from "../../smaller/error/FormError";

export const BookFormReadOnly = () => {
  const {
    book_event_id,
    stages,
    payNow,
    setGlobalErrors,
    setGlobalResponse,
    book_event,
    setBookingError,
  } = useEvent();

  const [data, setData] = useState({ price: 0, category: "" });
  const { name } = useParams();
  const navigate = useNavigate();

  const handlePrice = (price, category) => {
    setData({ price, category });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.price === 0) {
      setBookingError({
        msg: "Please choose a price plan.",
        state: "warning",
        show: true,
      });
      return;
    }
    payNow(book_event_id, stages.user.id, data.category)
      .then(() => {
        setBookingError({
          msg: "Paid for Event. Check Profile for details.",
          state: "success",
          show: true,
        });
        setGlobalErrors({
          msg: "Paid for Event. Check Profile for details.",
          type: "success",
          show: true,
        });
        setTimeout(() => navigate(`/profile`), 3000);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setBookingError({
            msg: error.response.data.msg,
            state: "warning",
            show: true,
          });
        }
        setGlobalResponse(error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        width: "100%",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0px 2px 6px rgba(1, 49, 91, 0.25)",
      }}
    >
      <header
        style={{
          fontFamily: "montserratSemi",
          textTransform: "capitalize",
          color: "rgba(1,49,91,1)",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      >
        payment details
      </header>

      {stages.err.show && (
        <div style={{ marginBottom: "10px" }}>
          <FormError {...stages.err} />
        </div>
      )}

      {/* Inputs wrapper */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {/* Left column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: "1",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{
                fontFamily: "montserratSemi",
                textTransform: "capitalize",
                color: "rgba(1,49,91,1)",
                fontSize: "14px",
              }}
            >
              username
            </label>
            <p>{stages.user.username}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{
                fontFamily: "montserratSemi",
                textTransform: "capitalize",
                color: "rgba(1,49,91,1)",
                fontSize: "14px",
              }}
            >
              email
            </label>
            <p>{stages.user.email}</p>
          </div>
        </div>

        {/* Right column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: "1",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{
                fontFamily: "montserratSemi",
                textTransform: "capitalize",
                color: "rgba(1,49,91,1)",
                fontSize: "14px",
              }}
            >
              phone number
            </label>
            <p>{stages.user.phone_number}</p>
          </div>

          {book_event.data && (
            <>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label
                  style={{
                    fontFamily: "montserratSemi",
                    color: "rgba(1,49,91,1)",
                  }}
                >
                  Price
                </label>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {book_event.data.price_choices.map((item, index) => {
                    const { price, category } = item;
                    const checked =
                      price === data.price && category === data.category;

                    return (
                      <label
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="radio"
                          style={{
                            width: "14px",
                            height: "14px",
                            accentColor: "#ea580c",
                          }}
                          checked={checked}
                          onChange={() => handlePrice(price, category)}
                        />
                        <span style={{ fontFamily: "montserratMedium" }}>
                          ksh. {price.toLocaleString("en-US")} per {category}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "flex", gap: "6px" }}>
                <span
                  style={{
                    fontFamily: "montserratSemi",
                    color: "rgba(1,49,91,1)",
                    textTransform: "capitalize",
                  }}
                >
                  total amount:
                </span>
                <p
                  style={{
                    fontFamily: "poppinsMedium",
                    color: "rgba(0,0,0,.5)",
                  }}
                >
                  ksh. {data.price.toLocaleString("en-US")}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <input
          type="submit"
          value="Pay Now"
          style={{
            background: "#22C55E",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            color: "rgba(1,49,91,1)",
            fontFamily: "poppinsMedium",
            textTransform: "capitalize",
          }}
        />
      </div>
    </form>
  );
};
