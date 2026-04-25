import AdminField from "@/components/admin/AdminField/AdminField";
import styles from "./AboutSectionEditor.module.scss";

function createFact() {
  return {
    id: `fact-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    label: "",
    value: [
      {
        type: "text",
        text: ""
      }
    ]
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

function getFactValueText(fact) {
  return (fact?.value || [])
    .filter((node) => node.type === "text")
    .map((node) => node.text || "")
    .join("");
}

function setFactValueText(fact, text) {
  return {
    ...fact,
    value: [
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

export default function AboutSectionEditor({ section, onChange }) {
  if (!section) return null;

  const aboutTour = section.data?.aboutTour || {};
  const tourInfo = section.data?.tourInfo || {};
  const facts = tourInfo.facts || [];
  const details = tourInfo.details || {};
  const detailBlocks = details.content || [];

  function updateFacts(nextFacts) {
    onChange("data.tourInfo.facts", nextFacts);
  }

  function updateDetailBlocks(nextBlocks) {
    onChange("data.tourInfo.details.content", nextBlocks);
  }

  return (
    <div className={styles.editor}>
      <section className={styles.section}>
        <h3 className={styles.section__title}>Общие настройки</h3>

        <div className={styles.grid}>
          <AdminField label="Фон секции">
            <select
              value={section.backgroundTone || "light"}
              onChange={(e) => onChange("backgroundTone", e.target.value)}
            >
              <option value="light">light</option>
              <option value="dark">dark</option>
            </select>
          </AdminField>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.section__title}>About tour</h3>

        <div className={styles.grid}>
          <AdminField label="Заголовок блока">
            <input
              value={aboutTour.title || ""}
              onChange={(e) =>
                onChange("data.aboutTour.title", e.target.value)
              }
            />
          </AdminField>
        </div>

        <AdminField
          label="Параграфы"
          hint="Каждый абзац с новой строки"
        >
          <textarea
            rows={8}
            value={(aboutTour.text?.paragraphs || []).join("\n")}
            onChange={(e) =>
              onChange(
                "data.aboutTour.text.paragraphs",
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
        <h3 className={styles.section__title}>Tour info</h3>

        <div className={styles.grid}>
          <AdminField label="Заголовок info-блока">
            <input
              value={tourInfo.title || ""}
              onChange={(e) =>
                onChange("data.tourInfo.title", e.target.value)
              }
            />
          </AdminField>
        </div>

        <div className={styles.subsection}>
          <div className={styles.subsection__head}>
            <h4>Facts</h4>
            <button
              type="button"
              onClick={() => updateFacts([...(facts || []), createFact()])}
            >
              Добавить факт
            </button>
          </div>

          {!facts.length ? (
            <p className={styles.empty}>Фактов пока нет.</p>
          ) : (
            <div className={styles.factList}>
              {facts.map((fact, index) => (
                <div key={fact.id || index} className={styles.factItem}>
                  <div className={styles.grid}>
                    <AdminField label="ID факта">
                      <input
                        value={fact.id || ""}
                        onChange={(e) => {
                          const next = [...facts];
                          next[index] = {
                            ...next[index],
                            id: e.target.value
                          };
                          updateFacts(next);
                        }}
                      />
                    </AdminField>

                    <AdminField label="Label">
                      <input
                        value={fact.label || ""}
                        onChange={(e) => {
                          const next = [...facts];
                          next[index] = {
                            ...next[index],
                            label: e.target.value
                          };
                          updateFacts(next);
                        }}
                      />
                    </AdminField>

                    <AdminField label="Value">
                      <input
                        value={getFactValueText(fact)}
                        onChange={(e) => {
                          const next = [...facts];
                          next[index] = setFactValueText(
                            next[index],
                            e.target.value
                          );
                          updateFacts(next);
                        }}
                      />
                    </AdminField>
                  </div>

                  <div className={styles.factItem__actions}>
                    <button
                      type="button"
                      className={styles.danger}
                      onClick={() => {
                        const next = facts.filter((_, i) => i !== index);
                        updateFacts(next);
                      }}
                    >
                      Удалить факт
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.subsection}>
          <div className={styles.subsection__head}>
            <h4>Details</h4>
          </div>

          <AdminField label="Summary">
            <input
              value={details.summary || ""}
              onChange={(e) =>
                onChange("data.tourInfo.details.summary", e.target.value)
              }
            />
          </AdminField>

          <div className={styles.subsection__head}>
            <h4>Blocks</h4>
            <div className={styles.inlineActions}>
              <button
                type="button"
                onClick={() =>
                  updateDetailBlocks([...detailBlocks, createParagraphBlock()])
                }
              >
                Добавить paragraph
              </button>

              <button
                type="button"
                onClick={() =>
                  updateDetailBlocks([...detailBlocks, createListBlock()])
                }
              >
                Добавить list
              </button>
            </div>
          </div>

          {!detailBlocks.length ? (
            <p className={styles.empty}>Блоков details пока нет.</p>
          ) : (
            <div className={styles.blockList}>
              {detailBlocks.map((block, index) => (
                <div key={block.id || index} className={styles.blockItem}>
                  <div className={styles.blockItem__head}>
                    <strong>{block.type}</strong>
                    <button
                      type="button"
                      className={styles.danger}
                      onClick={() => {
                        const next = detailBlocks.filter((_, i) => i !== index);
                        updateDetailBlocks(next);
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
                          const next = [...detailBlocks];
                          next[index] = {
                            ...next[index],
                            id: e.target.value
                          };
                          updateDetailBlocks(next);
                        }}
                      />
                    </AdminField>

                    {block.type === "list" ? (
                      <AdminField label="List style">
                        <select
                          value={block.style || "unordered"}
                          onChange={(e) => {
                            const next = [...detailBlocks];
                            next[index] = {
                              ...next[index],
                              style: e.target.value
                            };
                            updateDetailBlocks(next);
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
                          const next = [...detailBlocks];
                          next[index] = setParagraphText(
                            next[index],
                            e.target.value
                          );
                          updateDetailBlocks(next);
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
                          const next = [...detailBlocks];
                          next[index] = setListItemsText(
                            next[index],
                            e.target.value
                          );
                          updateDetailBlocks(next);
                        }}
                      />
                    </AdminField>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}