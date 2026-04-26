import AdminField from "@/components/admin/AdminField/AdminField";
import AdminImageField from "../../AdminImageField/AdminImageField";
import styles from "./HeroSectionEditor.module.scss";

export default function HeroSectionEditor({ section, onChange, tourId }) {
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

        <AdminImageField
          label="Изображение hero"
          value={section.data?.image}
          tourId={tourId}
          kind="hero"
          onChange={(nextImage) => onChange("data.image", nextImage)}
          />

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