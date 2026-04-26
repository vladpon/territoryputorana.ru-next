import AdminField from "@/components/admin/AdminField/AdminField";
import styles from "./ProgramSectionEditor.module.scss";

function createDay() {
  return {
    id: `day-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title: "",
    photos: [],
    description: {
      version: 1,
      blocks: []
    }
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

export default function ProgramSectionEditor({ section, onChange }) {
  if (!section) return null;

  const data = section.data || {};
  const days = data.days || [];
  const prefaceParagraphs = data.preface?.paragraphs || [];

  function updateDays(nextDays) {
    onChange("data.days", nextDays);
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

          <AdminField label="Заголовок программы">
            <input
              value={data.title || ""}
              onChange={(e) => onChange("data.title", e.target.value)}
            />
          </AdminField>

          <AdminField label="Подзаголовок программы">
            <input
              value={data.subtitle || ""}
              onChange={(e) => onChange("data.subtitle", e.target.value)}
            />
          </AdminField>
        </div>

        <AdminField
          label="Preface paragraphs"
          hint="Каждый абзац с новой строки"
        >
          <textarea
            rows={6}
            value={prefaceParagraphs.join("\n")}
            onChange={(e) =>
              onChange(
                "data.preface.paragraphs",
                e.target.value
                  .split("\n")
                  .map((item) => item)
                  .filter((item) => item !== "")
              )
            }
          />
        </AdminField>
      </section>

      <section className={styles.section}>
        <div className={styles.section__head}>
          <h3 className={styles.section__title}>Days</h3>

          <button
            type="button"
            onClick={() => updateDays([...(days || []), createDay()])}
          >
            Добавить день
          </button>
        </div>

        {!days.length ? (
          <p className={styles.empty}>Дней пока нет.</p>
        ) : (
          <div className={styles.dayList}>
            {days.map((day, dayIndex) => {
              const blocks = day.description?.blocks || [];
              const photos = day.photos || [];

              return (
                <div key={day.id || dayIndex} className={styles.dayItem}>
                  <div className={styles.dayItem__head}>
                    <strong>{day.title || `Day ${dayIndex + 1}`}</strong>

                    <div className={styles.inlineActions}>
                      <button
                        type="button"
                        onClick={() => {
                          if (dayIndex === 0) return;
                          const next = [...days];
                          [next[dayIndex - 1], next[dayIndex]] = [
                            next[dayIndex],
                            next[dayIndex - 1]
                          ];
                          updateDays(next);
                        }}
                        disabled={dayIndex === 0}
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (dayIndex === days.length - 1) return;
                          const next = [...days];
                          [next[dayIndex + 1], next[dayIndex]] = [
                            next[dayIndex],
                            next[dayIndex + 1]
                          ];
                          updateDays(next);
                        }}
                        disabled={dayIndex === days.length - 1}
                      >
                        ↓
                      </button>

                      <button
                        type="button"
                        className={styles.danger}
                        onClick={() => {
                          const next = days.filter((_, i) => i !== dayIndex);
                          updateDays(next);
                        }}
                      >
                        Удалить день
                      </button>
                    </div>
                  </div>

                  <div className={styles.grid}>
                    <AdminField label="Day ID">
                      <input
                        value={day.id || ""}
                        onChange={(e) => {
                          const next = [...days];
                          next[dayIndex] = {
                            ...next[dayIndex],
                            id: e.target.value
                          };
                          updateDays(next);
                        }}
                      />
                    </AdminField>

                    <AdminField label="Day title">
                      <input
                        value={day.title || ""}
                        onChange={(e) => {
                          const next = [...days];
                          next[dayIndex] = {
                            ...next[dayIndex],
                            title: e.target.value
                          };
                          updateDays(next);
                        }}
                      />
                    </AdminField>
                  </div>

                  <div className={styles.subsection}>
                    <div className={styles.subsection__head}>
                      <h4>Photos</h4>

                      <button
                        type="button"
                        onClick={() => {
                          const next = [...days];
                          next[dayIndex] = {
                            ...next[dayIndex],
                            photos: [...photos, createPhoto()]
                          };
                          updateDays(next);
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
                            key={`${day.id || dayIndex}-${photoIndex}`}
                            className={styles.photoItem}
                          >
                            <div className={styles.grid}>
                              <AdminField label="Photo src">
                                <input
                                  value={photo.src || ""}
                                  onChange={(e) => {
                                    const next = [...days];
                                    const nextPhotos = [...photos];
                                    nextPhotos[photoIndex] = {
                                      ...nextPhotos[photoIndex],
                                      src: e.target.value
                                    };
                                    next[dayIndex] = {
                                      ...next[dayIndex],
                                      photos: nextPhotos
                                    };
                                    updateDays(next);
                                  }}
                                />
                              </AdminField>

                              <AdminField label="Photo alt">
                                <input
                                  value={photo.alt || ""}
                                  onChange={(e) => {
                                    const next = [...days];
                                    const nextPhotos = [...photos];
                                    nextPhotos[photoIndex] = {
                                      ...nextPhotos[photoIndex],
                                      alt: e.target.value
                                    };
                                    next[dayIndex] = {
                                      ...next[dayIndex],
                                      photos: nextPhotos
                                    };
                                    updateDays(next);
                                  }}
                                />
                              </AdminField>
                            </div>

                            <div className={styles.photoItem__actions}>
                              <button
                                type="button"
                                className={styles.danger}
                                onClick={() => {
                                  const next = [...days];
                                  const nextPhotos = photos.filter(
                                    (_, i) => i !== photoIndex
                                  );
                                  next[dayIndex] = {
                                    ...next[dayIndex],
                                    photos: nextPhotos
                                  };
                                  updateDays(next);
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

                  <div className={styles.subsection}>
                    <div className={styles.subsection__head}>
                      <h4>Description blocks</h4>

                      <div className={styles.inlineActions}>
                        <button
                          type="button"
                          onClick={() => {
                            const next = [...days];
                            next[dayIndex] = {
                              ...next[dayIndex],
                              description: {
                                ...next[dayIndex].description,
                                blocks: [...blocks, createParagraphBlock()]
                              }
                            };
                            updateDays(next);
                          }}
                        >
                          Добавить paragraph
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const next = [...days];
                            next[dayIndex] = {
                              ...next[dayIndex],
                              description: {
                                ...next[dayIndex].description,
                                blocks: [...blocks, createListBlock()]
                              }
                            };
                            updateDays(next);
                          }}
                        >
                          Добавить list
                        </button>
                      </div>
                    </div>

                    {!blocks.length ? (
                      <p className={styles.empty}>Description blocks пока нет.</p>
                    ) : (
                      <div className={styles.blockList}>
                        {blocks.map((block, blockIndex) => (
                          <div
                            key={block.id || blockIndex}
                            className={styles.blockItem}
                          >
                            <div className={styles.blockItem__head}>
                              <strong>{block.type}</strong>

                              <button
                                type="button"
                                className={styles.danger}
                                onClick={() => {
                                  const next = [...days];
                                  next[dayIndex] = {
                                    ...next[dayIndex],
                                    description: {
                                      ...next[dayIndex].description,
                                      blocks: blocks.filter(
                                        (_, i) => i !== blockIndex
                                      )
                                    }
                                  };
                                  updateDays(next);
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
                                    const next = [...days];
                                    const nextBlocks = [...blocks];
                                    nextBlocks[blockIndex] = {
                                      ...nextBlocks[blockIndex],
                                      id: e.target.value
                                    };
                                    next[dayIndex] = {
                                      ...next[dayIndex],
                                      description: {
                                        ...next[dayIndex].description,
                                        blocks: nextBlocks
                                      }
                                    };
                                    updateDays(next);
                                  }}
                                />
                              </AdminField>

                              {block.type === "list" ? (
                                <AdminField label="List style">
                                  <select
                                    value={block.style || "unordered"}
                                    onChange={(e) => {
                                      const next = [...days];
                                      const nextBlocks = [...blocks];
                                      nextBlocks[blockIndex] = {
                                        ...nextBlocks[blockIndex],
                                        style: e.target.value
                                      };
                                      next[dayIndex] = {
                                        ...next[dayIndex],
                                        description: {
                                          ...next[dayIndex].description,
                                          blocks: nextBlocks
                                        }
                                      };
                                      updateDays(next);
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
                                    const next = [...days];
                                    const nextBlocks = [...blocks];
                                    nextBlocks[blockIndex] = setParagraphText(
                                      nextBlocks[blockIndex],
                                      e.target.value
                                    );
                                    next[dayIndex] = {
                                      ...next[dayIndex],
                                      description: {
                                        ...next[dayIndex].description,
                                        blocks: nextBlocks
                                      }
                                    };
                                    updateDays(next);
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
                                    const next = [...days];
                                    const nextBlocks = [...blocks];
                                    nextBlocks[blockIndex] = setListItemsText(
                                      nextBlocks[blockIndex],
                                      e.target.value
                                    );
                                    next[dayIndex] = {
                                      ...next[dayIndex],
                                      description: {
                                        ...next[dayIndex].description,
                                        blocks: nextBlocks
                                      }
                                    };
                                    updateDays(next);
                                  }}
                                />
                              </AdminField>
                            ) : null}
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