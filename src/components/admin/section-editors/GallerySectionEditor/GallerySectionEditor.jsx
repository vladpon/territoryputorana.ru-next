import AdminField from "@/components/admin/AdminField/AdminField";
import styles from "./GallerySectionEditor.module.scss";

function createPhoto() {
  return {
    src: "",
    alt: ""
  };
}

export default function GallerySectionEditor({ section, onChange }) {
  if (!section) return null;

  const data = section.data || {};
  const photos = data.photos || [];

  function updatePhotos(nextPhotos) {
    onChange("data.photos", nextPhotos);
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

          <AdminField label="Заголовок галереи">
            <input
              value={data.title || ""}
              onChange={(e) => onChange("data.title", e.target.value)}
            />
          </AdminField>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.section__head}>
          <h3 className={styles.section__title}>Фотографии</h3>

          <button
            type="button"
            onClick={() => updatePhotos([...(photos || []), createPhoto()])}
          >
            Добавить фото
          </button>
        </div>

        {!photos.length ? (
          <p className={styles.empty}>Фотографий пока нет.</p>
        ) : (
          <div className={styles.photoList}>
            {photos.map((photo, index) => (
              <div key={index} className={styles.photoItem}>
                <div className={styles.grid}>
                  <AdminField label="Photo src">
                    <input
                      value={photo.src || ""}
                      onChange={(e) => {
                        const next = [...photos];
                        next[index] = {
                          ...next[index],
                          src: e.target.value
                        };
                        updatePhotos(next);
                      }}
                    />
                  </AdminField>

                  <AdminField label="Photo alt">
                    <input
                      value={photo.alt || ""}
                      onChange={(e) => {
                        const next = [...photos];
                        next[index] = {
                          ...next[index],
                          alt: e.target.value
                        };
                        updatePhotos(next);
                      }}
                    />
                  </AdminField>
                </div>

                <div className={styles.photoItem__actions}>
                  <button
                    type="button"
                    onClick={() => {
                      if (index === 0) return;
                      const next = [...photos];
                      [next[index - 1], next[index]] = [next[index], next[index - 1]];
                      updatePhotos(next);
                    }}
                    disabled={index === 0}
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (index === photos.length - 1) return;
                      const next = [...photos];
                      [next[index + 1], next[index]] = [next[index], next[index + 1]];
                      updatePhotos(next);
                    }}
                    disabled={index === photos.length - 1}
                  >
                    ↓
                  </button>

                  <button
                    type="button"
                    className={styles.danger}
                    onClick={() => {
                      const next = photos.filter((_, i) => i !== index);
                      updatePhotos(next);
                    }}
                  >
                    Удалить фото
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}