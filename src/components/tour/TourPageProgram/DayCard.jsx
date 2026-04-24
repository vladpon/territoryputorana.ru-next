// // 'use client'

// // import { useEffect, useState } from 'react'
// import Image from 'next/image'
// import styles from './DayCard.module.scss'

// const DayCard = (props) => {
//     const { dayTitle, dayDesc, dayImg} = props.day

//     // const [opened, setOpened] = useState(false)

//     // useEffect( () => {
//     //     console.log(opened)
//     // }, [opened])


//   return (
//     // <div className = {`${styles["day"]} ${opened && styles.day_opened }`} onClick = { () => opened ? setOpened(false) : setOpened(true)}>
//     <div className = {styles.day}>
                
//                 <div className = {styles['day__content']}>
//                     <div className = {styles["day__text"]}>
//                         <div className = {`${styles["day__title"]}`}>
//                             <h3>{dayTitle}</h3>
//                         </div>
//                         {dayDesc && dayDesc.map( (p, index) => <p key = {index}>{p}</p>)}
//                     </div>
//                     <div className={styles["day__img"]}>
//                         <Image 
//                             src={dayImg}
//                             alt=""
//                             fill
//                             style={{ objectFit: "cover" }}
//                             />
//                     </div>
//                 </div>
//     </div>   
//   )
// }

// export default DayCard



import styles from "./DayCard.module.scss";
import PhotoSlider from "@/components/ui/PhotoSlider/PhotoSlider";
import InlineRichText from "@/components/ui/RichText/InlineRichText";

function renderDescriptionBlock(block, index) {
  if (block.type === "paragraph") {
    return (
      <p key={block.id || index}>
        <InlineRichText
          nodes={block.content || []}
          keyPrefix={`program-paragraph-${index}`}
        />
      </p>
    );
  }

  if (block.type === "list") {
    const Tag = block.style === "ordered" ? "ol" : "ul";

    return (
      <Tag key={block.id || index}>
        {(block.items || []).map((item, itemIndex) => (
          <li key={item.id || `${index}-${itemIndex}`}>
            <InlineRichText
              nodes={item.children || []}
              keyPrefix={`program-list-${index}-${itemIndex}`}
            />
          </li>
        ))}
      </Tag>
    );
  }

  return null;
}

const DayCard = ({ day, index }) => {
  const title = day?.title || "";
  const photos = day?.photos || [];
  const descriptionBlocks = day?.description?.blocks || [];

  return (
    <div className={styles.day}>
      <div className={styles["day__content"]}>
        <div className={styles["day__text"]}>
          {title ? (
            <div className={styles["day__title"]}>
              <h3>{title}</h3>
            </div>
          ) : null}

          {descriptionBlocks.map((block, blockIndex) =>
            renderDescriptionBlock(block, blockIndex)
          )}
        </div>

        {photos.length ? (
                <div className={styles["day__slider"]}>
                    <PhotoSlider photos={photos} />
                </div>
            ) : null}
      </div>
    </div>
  );
};

export default DayCard;