"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./PhotoSlider.module.scss";

export default function PhotoSlider({ photos }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const close = () => setActiveIndex(null);

  const next = () => {
    setActiveIndex((prev) =>
      prev === photos.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? photos.length - 1 : prev - 1
    );
  };

useEffect(() => {
  const handleKey = (e) => {
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  if (activeIndex !== null) {
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    window.removeEventListener("keydown", handleKey);
    document.body.style.overflow = "";
  };
}, [activeIndex]);

  return (
    <>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className={styles.slider}
      >
        {photos.map((photo, i) => (
          <SwiperSlide key={i}>
            <div
              className={styles.imageWrapper}
              onClick={() => setActiveIndex(i)}
            >
              <Image
                src={photo.path}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {activeIndex !== null && (
        <div className={styles.fullscreen}>

          <button className={styles.close} onClick={close}>
            ✕
          </button>

          <button className={styles.prev} onClick={prev}>
            ‹
          </button>

          <div className={styles.fullImageWrapper}>
            <Image
              src={photos[activeIndex].path}
              alt={photos[activeIndex].alt}
              fill
              sizes="100vw"
              className={styles.fullImage}
              priority
            />
          </div>

          <button className={styles.next} onClick={next}>
            ›
          </button>

        </div>
      )}
    </>
  );
}