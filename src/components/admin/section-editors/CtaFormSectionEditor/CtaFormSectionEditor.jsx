import AdminField from "@/components/admin/AdminField/AdminField";
import styles from "./CtaFormSectionEditor.module.scss";
import AdminImageField from "../../AdminImageField/AdminImageField";

export default function CtaFormSectionEditor({ section, onChange, tourId }) {
  if (!section) return null;

  const data = section.data || {};
  const image = data.image || {};

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

          <AdminField label="Подзаголовок">
            <input
              value={data.subtitle || ""}
              onChange={(e) => onChange("data.subtitle", e.target.value)}
            />
          </AdminField>

          <AdminField label="Текст кнопки">
            <input
              value={data.buttonText || ""}
              onChange={(e) => onChange("data.buttonText", e.target.value)}
            />
          </AdminField>

          <AdminField label="Сообщение после отправки">
            <input
              value={data.successMessage || ""}
              onChange={(e) => onChange("data.successMessage", e.target.value)}
            />
          </AdminField>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.section__title}>Изображение</h3>

        <div className={styles.grid}>
          {/* <AdminField label="Image src">
            <input
              value={image.src || ""}
              onChange={(e) => onChange("data.image.src", e.target.value)}
            />
          </AdminField>

          <AdminField label="Image alt">
            <input
              value={image.alt || ""}
              onChange={(e) => onChange("data.image.alt", e.target.value)}
            />
          </AdminField> */}
          <AdminImageField
            label="Изображение CTA"
            value={section.data?.image}
            tourId={tourId}
            kind="cta"
            onChange={(nextImage) =>
              onChange("data.image", nextImage)
            }
          />
        </div>
      </section>
    </div>
  );
}