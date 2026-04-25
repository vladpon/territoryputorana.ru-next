import AdminField from "@/components/admin/AdminField/AdminField";
import styles from "./HeroSectionEditor.module.scss";

export default function HeroSectionEditor({ section, onChange }) {
  if (!section) return null;

  return (
    <div className={styles.editor}>
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

        <AdminField label="Заголовок hero" hint="Если пусто, фронт может взять page.title">
          <input
            value={section.data?.title || ""}
            onChange={(e) => onChange("data.title", e.target.value)}
          />
        </AdminField>

        <AdminField label="Изображение: src">
          <input
            value={section.data?.image?.src || ""}
            onChange={(e) => onChange("data.image.src", e.target.value)}
          />
        </AdminField>

        <AdminField label="Изображение: alt">
          <input
            value={section.data?.image?.alt || ""}
            onChange={(e) => onChange("data.image.alt", e.target.value)}
          />
        </AdminField>
      </div>
    </div>
  );
}