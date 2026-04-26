import AdminField from "@/components/admin/AdminField/AdminField";
import styles from "./AccordionGroupSectionEditor.module.scss";

function createAccordionItem() {
  return {
    id: `accordion-item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    summary: "",
    content: {
      version: 1,
      blocks: []
    },
    photos: []
  };
}

function createPhoto() {
  return {
    src: "",
    alt: ""
  };
}

function createParagraphBlock() {
  return {
    id: `p-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: "paragraph",
    content: [
      {
        type: "text",
        text: ""
      }
    ]
  };
}

function createListBlock() {
  return {
    id: `list-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: "list",
    style: "unordered",
    items: []
  };
}

function getParagraphText(block) {
  return (block?.content || [])
    .filter((node) => node.type === "text")
    .map((node) => node.text || "")
    .join("");
}

function setParagraphText(block, text) {
  return {
    ...block,
    content: [
      {
        type: "text",
        text
      }
    ]
  };
}

function getListItemsText(block) {
  return (block?.items || [])
    .map((item) =>
      (item.children || [])
        .filter((node) => node.type === "text")
        .map((node) => node.text || "")
        .join("")
    )
    .join("\n");
}

function setListItemsText(block, text) {
  const lines = text
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    ...block,
    items: lines.map((line, index) => ({
      id: `item-${index + 1}-${Date.now()}`,
      children: [
        {
          type: "text",
          text: line
        }
      ]
    }))
  };
}

export default function AccordionGroupSectionEditor({ section, onChange }) {
  if (!section) return null;

  const data = section.data || {};
  const items = data.items || [];

  function updateItems(nextItems) {
    onChange("data.items", nextItems);
  }

  return (
    <div className={styles.editor}>
      <section className={styles.section}>
        <h3 className={styles.section__title}>Общие настройки</h3>

        <div className={styles.grid}>
          <AdminField label="Фон секции">
            <select
              value={section.backgroundTone || "dark"}
              onChange={(e) => onChange("backgroundTone", e.target.value)}
            >
              <option value="light">light</option>
              <option value="dark">dark</option>
            </select>
          </AdminField>

          <AdminField label="Заголовок группы">
            <input
              value={data.title || ""}
              onChange={(e) => onChange("data.title", e.target.value)}
            />
          </AdminField>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.section__head}>
          <h3 className={styles.section__title}>Accordion items</h3>

          <button
            type="button"
            onClick={() => updateItems([...(items || []), createAccordionItem()])}
          >
            Добавить item
          </button>
        </div>

        {!items.length ? (
          <p className={styles.empty}>Аккордеонов пока нет.</p>
        ) : (
          <div className={styles.itemList}>
            {items.map((item, itemIndex) => {
              const blocks = item.content?.blocks || [];
              const photos = item.photos || [];

              return (
                <div key={item.id || itemIndex} className={styles.itemCard}>
                  <div className={styles.itemCard__head}>
                    <strong>{item.summary || `Item ${itemIndex + 1}`}</strong>

                    <div className={styles.inlineActions}>
                      <button
                        type="button"
                        onClick={() => {
                          if (itemIndex === 0) return;
                          const next = [...items];
                          [next[itemIndex - 1], next[itemIndex]] = [
                            next[itemIndex],
                            next[itemIndex - 1]
                          ];
                          updateItems(next);
                        }}
                        disabled={itemIndex === 0}
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (itemIndex === items.length - 1) return;
                          const next = [...items];
                          [next[itemIndex + 1], next[itemIndex]] = [
                            next[itemIndex],
                            next[itemIndex + 1]
                          ];
                          updateItems(next);
                        }}
                        disabled={itemIndex === items.length - 1}
                      >
                        ↓
                      </button>

                      <button
                        type="button"
                        className={styles.danger}
                        onClick={() => {
                          const next = items.filter((_, i) => i !== itemIndex);
                          updateItems(next);
                        }}
                      >
                        Удалить item
                      </button>
                    </div>
                  </div>

                  <div className={styles.grid}>
                    <AdminField label="Item ID">
                      <input
                        value={item.id || ""}
                        onChange={(e) => {
                          const next = [...items];
                          next[itemIndex] = {
                            ...next[itemIndex],
                            id: e.target.value
                          };
                          updateItems(next);
                        }}
                      />
                    </AdminField>

                    <AdminField label="Summary">
                      <input
                        value={item.summary || ""}
                        onChange={(e) => {
                          const next = [...items];
                          next[itemIndex] = {
                            ...next[itemIndex],
                            summary: e.target.value
                          };
                          updateItems(next);
                        }}
                      />
                    </AdminField>
                  </div>

                  <div className={styles.subsection}>
                    <div className={styles.subsection__head}>
                      <h4>Content blocks</h4>

                      <div className={styles.inlineActions}>
                        <button
                          type="button"
                          onClick={() => {
                            const next = [...items];
                            next[itemIndex] = {
                              ...next[itemIndex],
                              content: {
                                ...next[itemIndex].content,
                                blocks: [...blocks, createParagraphBlock()]
                              }
                            };
                            updateItems(next);
                          }}
                        >
                          Добавить paragraph
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const next = [...items];
                            next[itemIndex] = {
                              ...next[itemIndex],
                              content: {
                                ...next[itemIndex].content,
                                blocks: [...blocks, createListBlock()]
                              }
                            };
                            updateItems(next);
                          }}
                        >
                          Добавить list
                        </button>
                      </div>
                    </div>

                    {!blocks.length ? (
                      <p className={styles.empty}>Контентных блоков пока нет.</p>
                    ) : (
                      <div className={styles.blockList}>
                        {blocks.map((block, blockIndex) => (
                          <div key={block.id || blockIndex} className={styles.blockItem}>
                            <div className={styles.blockItem__head}>
                              <strong>{block.type}</strong>

                              <button
                                type="button"
                                className={styles.danger}
                                onClick={() => {
                                  const next = [...items];
                                  next[itemIndex] = {
                                    ...next[itemIndex],
                                    content: {
                                      ...next[itemIndex].content,
                                      blocks: blocks.filter((_, i) => i !== blockIndex)
                                    }
                                  };
                                  updateItems(next);
                                }}
                              >
                                Удалить блок
                              </button>
                            </div>

                            <div className={styles.grid}>
                              <AdminField label="Block ID">
                                <input
                                  value={block.id || ""}
                                  onChange={(e) => {
                                    const next = [...items];
                                    const nextBlocks = [...blocks];
                                    nextBlocks[blockIndex] = {
                                      ...nextBlocks[blockIndex],
                                      id: e.target.value
                                    };
                                    next[itemIndex] = {
                                      ...next[itemIndex],
                                      content: {
                                        ...next[itemIndex].content,
                                        blocks: nextBlocks
                                      }
                                    };
                                    updateItems(next);
                                  }}
                                />
                              </AdminField>

                              {block.type === "list" ? (
                                <AdminField label="List style">
                                  <select
                                    value={block.style || "unordered"}
                                    onChange={(e) => {
                                      const next = [...items];
                                      const nextBlocks = [...blocks];
                                      nextBlocks[blockIndex] = {
                                        ...nextBlocks[blockIndex],
                                        style: e.target.value
                                      };
                                      next[itemIndex] = {
                                        ...next[itemIndex],
                                        content: {
                                          ...next[itemIndex].content,
                                          blocks: nextBlocks
                                        }
                                      };
                                      updateItems(next);
                                    }}
                                  >
                                    <option value="unordered">unordered</option>
                                    <option value="ordered">ordered</option>
                                  </select>
                                </AdminField>
                              ) : null}
                            </div>

                            {block.type === "paragraph" ? (
                              <AdminField label="Текст paragraph">
                                <textarea
                                  rows={4}
                                  value={getParagraphText(block)}
                                  onChange={(e) => {
                                    const next = [...items];
                                    const nextBlocks = [...blocks];
                                    nextBlocks[blockIndex] = setParagraphText(
                                      nextBlocks[blockIndex],
                                      e.target.value
                                    );
                                    next[itemIndex] = {
                                      ...next[itemIndex],
                                      content: {
                                        ...next[itemIndex].content,
                                        blocks: nextBlocks
                                      }
                                    };
                                    updateItems(next);
                                  }}
                                />
                              </AdminField>
                            ) : null}

                            {block.type === "list" ? (
                              <AdminField
                                label="Элементы списка"
                                hint="Каждый пункт с новой строки"
                              >
                                <textarea
                                  rows={6}
                                  value={getListItemsText(block)}
                                  onChange={(e) => {
                                    const next = [...items];
                                    const nextBlocks = [...blocks];
                                    nextBlocks[blockIndex] = setListItemsText(
                                      nextBlocks[blockIndex],
                                      e.target.value
                                    );
                                    next[itemIndex] = {
                                      ...next[itemIndex],
                                      content: {
                                        ...next[itemIndex].content,
                                        blocks: nextBlocks
                                      }
                                    };
                                    updateItems(next);
                                  }}
                                />
                              </AdminField>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={styles.subsection}>
                    <div className={styles.subsection__head}>
                      <h4>Photos</h4>

                      <button
                        type="button"
                        onClick={() => {
                          const next = [...items];
                          next[itemIndex] = {
                            ...next[itemIndex],
                            photos: [...photos, createPhoto()]
                          };
                          updateItems(next);
                        }}
                      >
                        Добавить фото
                      </button>
                    </div>

                    {!photos.length ? (
                      <p className={styles.empty}>Фотографий пока нет.</p>
                    ) : (
                      <div className={styles.photoList}>
                        {photos.map((photo, photoIndex) => (
                          <div
                            key={`${item.id || itemIndex}-${photoIndex}`}
                            className={styles.photoItem}
                          >
                            <div className={styles.grid}>
                              <AdminField label="Photo src">
                                <input
                                  value={photo.src || ""}
                                  onChange={(e) => {
                                    const next = [...items];
                                    const nextPhotos = [...photos];
                                    nextPhotos[photoIndex] = {
                                      ...nextPhotos[photoIndex],
                                      src: e.target.value
                                    };
                                    next[itemIndex] = {
                                      ...next[itemIndex],
                                      photos: nextPhotos
                                    };
                                    updateItems(next);
                                  }}
                                />
                              </AdminField>

                              <AdminField label="Photo alt">
                                <input
                                  value={photo.alt || ""}
                                  onChange={(e) => {
                                    const next = [...items];
                                    const nextPhotos = [...photos];
                                    nextPhotos[photoIndex] = {
                                      ...nextPhotos[photoIndex],
                                      alt: e.target.value
                                    };
                                    next[itemIndex] = {
                                      ...next[itemIndex],
                                      photos: nextPhotos
                                    };
                                    updateItems(next);
                                  }}
                                />
                              </AdminField>
                            </div>

                            <div className={styles.photoItem__actions}>
                              <button
                                type="button"
                                onClick={() => {
                                  if (photoIndex === 0) return;
                                  const next = [...items];
                                  const nextPhotos = [...photos];
                                  [nextPhotos[photoIndex - 1], nextPhotos[photoIndex]] = [
                                    nextPhotos[photoIndex],
                                    nextPhotos[photoIndex - 1]
                                  ];
                                  next[itemIndex] = {
                                    ...next[itemIndex],
                                    photos: nextPhotos
                                  };
                                  updateItems(next);
                                }}
                                disabled={photoIndex === 0}
                              >
                                ↑
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (photoIndex === photos.length - 1) return;
                                  const next = [...items];
                                  const nextPhotos = [...photos];
                                  [nextPhotos[photoIndex + 1], nextPhotos[photoIndex]] = [
                                    nextPhotos[photoIndex],
                                    nextPhotos[photoIndex + 1]
                                  ];
                                  next[itemIndex] = {
                                    ...next[itemIndex],
                                    photos: nextPhotos
                                  };
                                  updateItems(next);
                                }}
                                disabled={photoIndex === photos.length - 1}
                              >
                                ↓
                              </button>

                              <button
                                type="button"
                                className={styles.danger}
                                onClick={() => {
                                  const next = [...items];
                                  const nextPhotos = photos.filter((_, i) => i !== photoIndex);
                                  next[itemIndex] = {
                                    ...next[itemIndex],
                                    photos: nextPhotos
                                  };
                                  updateItems(next);
                                }}
                              >
                                Удалить фото
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}