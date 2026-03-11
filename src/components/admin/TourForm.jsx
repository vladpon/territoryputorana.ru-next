"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";

export default function TourForm({ initialData }) {

  const [tour, setTour] = useState(
    initialData || {
      title: "",
      price: "",
      season: "",
      bigImg: ""
    }
  );

  function handleChange(e) {

    setTour({
      ...tour,
      [e.target.name]: e.target.value
    });

  }

  async function save() {

    if (tour._id) {

      await fetch("/api/tours/" + tour._id, {
        method: "PUT",
        body: JSON.stringify(tour)
      });

    } else {

      await fetch("/api/tours", {
        method: "POST",
        body: JSON.stringify(tour)
      });

    }

    alert("Saved");

  }

  return (

    <div>

      <input
        name="title"
        placeholder="Title"
        value={tour.title}
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Price"
        value={tour.price}
        onChange={handleChange}
      />

      <input
        name="season"
        placeholder="Season"
        value={tour.season}
        onChange={handleChange}
      />

      <ImageUploader
        onUpload={(path) =>
          setTour({ ...tour, bigImg: path })
        }
      />

      {tour.bigImg && (
        <img src={tour.bigImg} width="200" />
      )}

      <button onClick={save}>
        Save
      </button>

    </div>

  );

}