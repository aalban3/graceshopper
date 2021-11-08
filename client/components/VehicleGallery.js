import React from "react";
import { vehicleImages } from "../vehicleImages";

export default function VehicleGallery(props) {
  const { vehicle } = props;
  const image = vehicleImages[vehicle];

  return (
    <div
      id="carouselExampleControls"
      className="carousel slide vehicle-gallery"
    >
      <section className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={image.frontQuarter}
            className="vehicle-gallery-img"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src={image.rearQuarter}
            className="vehicle-gallery-img"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img src={image.front} className="vehicle-gallery-img" alt="..." />
        </div>
        <div className="carousel-item">
          <img src={image.rear} className="vehicle-gallery-img" alt="..." />
        </div>
        <div className="carousel-item">
          <img src={image.side} className="vehicle-gallery-img" alt="..." />
        </div>
      </section>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
