import styles from "./TourPageCover.module.scss";

const TourPageCover = ({ page, section, children }) => {
  const title = section?.data?.title || page?.title || "";
  const duration = page?.card?.duration || "";
  const season = page?.card?.season || "";
  const imageSrc = section?.data?.image?.src || "";
  const imageAlt = section?.data?.image?.alt || title;

  return (
    <div className={styles["tp-cover"]}>
      {children}

      {imageSrc ? (
        <img
          className={styles["tp-cover__bg"]}
          src={imageSrc}
          alt={imageAlt}
        />
      ) : null}

      <div className={`${styles["tp-cover__text"]} container`}>
        <h1>{title}</h1>

        {duration || season ? (
          <div className={styles["tp-cover__opt-block"]}>
            {duration ? (
              <div className={styles["tp-cover__opt-item"]}>
                <img src="./img/time.png" alt="" />
                <span>{duration}</span>
              </div>
            ) : null}

            {season ? (
              <div className={styles["tp-cover__opt-item"]}>
                <img src="./img/calendar.png" alt="" />
                <span>{season}</span>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TourPageCover;