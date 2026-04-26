import AdminField from "@/components/admin/AdminField/AdminField";
import styles from "./NoteSectionEditor.module.scss";

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

export default function NoteSectionEditor({ section, onChange }) {
  if (!section) return null;

  const data = section.data || {};
  const appearance = data.appearance || {};
  const blocks = data.content?.blocks || [];

  function updateBlocks(nextBlocks) {
    onChange("data.content.blocks", nextBlocks);
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

          <AdminField label="Заголовок">
            <input
              value={data.title || ""}
              onChange={(e) => onChange("data.title", e.target.value)}
            />
          </AdminField>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.section__title}>Appearance</h3>

        <div className={styles.grid}>
          <AdminField label="Color scheme">
            <select
              value={appearance.colorScheme || "default"}
              onChange={(e) =>
                onChange("data.appearance.colorScheme", e.target.value)
              }
            >
              <option value="default">default</option>
              <option value="inverted">inverted</option>
              <option value="accent">accent</option>
              <option value="muted">muted</option>
            </select>
          </AdminField>

          <AdminField label="Title align">
            <select
              value={appearance.titleAlign || "left"}
              onChange={(e) =>
                onChange("data.appearance.titleAlign", e.target.value)
              }
            >
              <option value="left">left</option>
              <option value="center">center</option>
              <option value="right">right</option>
            </select>
          </AdminField>

          <AdminField label="Content align">
            <select
              value={appearance.contentAlign || "left"}
              onChange={(e) =>
                onChange("data.appearance.contentAlign", e.target.value)
              }
            >
              <option value="left">left</option>
              <option value="center">center</option>
              <option value="right">right</option>
            </select>
          </AdminField>

          <AdminField label="Width">
            <select
              value={appearance.width || "normal"}
              onChange={(e) =>
                onChange("data.appearance.width", e.target.value)
              }
            >
              <option value="narrow">narrow</option>
              <option value="normal">normal</option>
              <option value="wide">wide</option>
            </select>
          </AdminField>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.section__head}>
          <h3 className={styles.section__title}>Content blocks</h3>

          <div className={styles.inlineActions}>
            <button
              type="button"
              onClick={() => updateBlocks([...blocks, createParagraphBlock()])}
            >
              Добавить paragraph
            </button>

            <button
              type="button"
              onClick={() => updateBlocks([...blocks, createListBlock()])}
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
                      const next = blocks.filter((_, i) => i !== blockIndex);
                      updateBlocks(next);
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
                        const next = [...blocks];
                        next[blockIndex] = {
                          ...next[blockIndex],
                          id: e.target.value
                        };
                        updateBlocks(next);
                      }}
                    />
                  </AdminField>

                  {block.type === "list" ? (
                    <AdminField label="List style">
                      <select
                        value={block.style || "unordered"}
                        onChange={(e) => {
                          const next = [...blocks];
                          next[blockIndex] = {
                            ...next[blockIndex],
                            style: e.target.value
                          };
                          updateBlocks(next);
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
                        const next = [...blocks];
                        next[blockIndex] = setParagraphText(
                          next[blockIndex],
                          e.target.value
                        );
                        updateBlocks(next);
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
                        const next = [...blocks];
                        next[blockIndex] = setListItemsText(
                          next[blockIndex],
                          e.target.value
                        );
                        updateBlocks(next);
                      }}
                    />
                  </AdminField>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}