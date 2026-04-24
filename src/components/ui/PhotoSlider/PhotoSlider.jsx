"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./PhotoSlider.module.scss";

function getSlidesPerViewConfig(count) {
  return {
    320: { slidesPerView: Math.min(count, 1) },
    640: { slidesPerView: Math.min(count, 2) },
    1024: { slidesPerView: Math.min(count, 3) }
  };
}

export default function PhotoSlider({ photos = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const hasPhotos = Array.isArray(photos) && photos.length > 0;
  const hasMultiplePhotos = photos.length > 1;

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
      if (!hasMultiplePhotos) return;
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
  }, [activeIndex, hasMultiplePhotos]);

  if (!hasPhotos) return null;

  return (
    <>
      <div className={styles.slider}>
        {hasMultiplePhotos ? (
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={Math.min(photos.length, 3)}
            breakpoints={getSlidesPerViewConfig(photos.length)}
            className={styles.swiper}
          >
            {photos.map((photo, i) => (
              <SwiperSlide key={i}>
                <div
                  className={styles.imageWrapper}
                  onClick={() => setActiveIndex(i)}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.image}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div
            className={styles.imageWrapper}
            onClick={() => setActiveIndex(0)}
          >
            <Image
              src={photos[0].src}
              alt={photos[0].alt || ""}
              fill
              sizes="100vw"
              className={styles.image}
            />
          </div>
        )}
      </div>

      {activeIndex !== null && (
        <div className={styles.fullscreen}>
          <button className={styles.close} onClick={close}>
            ✕
          </button>

          {hasMultiplePhotos ? (
            <button className={styles.prev} onClick={prev}>
              ‹
            </button>
          ) : null}

          <div className={styles.fullImageWrapper}>
            <Image
              src={photos[activeIndex].src}
              alt={photos[activeIndex].alt || ""}
              fill
              sizes="100vw"
              className={styles.fullImage}
              priority
            />
          </div>

          {hasMultiplePhotos ? (
            <button className={styles.next} onClick={next}>
              ›
            </button>
          ) : null}
        </div>
      )}
    </>
  );
}