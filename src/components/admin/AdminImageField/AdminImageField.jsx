"use client";

import { useRef, useState } from "react";
import AdminField from "@/components/admin/AdminField/AdminField";
import styles from "./AdminImageField.module.scss";

export default function AdminImageField({
  label = "Изображение",
  value = { src: "", alt: "" },
  onChange,
  tourId = "",
  kind = "general",
  disabled = false
}) {
  const inputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const image = value || { src: "", alt: "" };

  function handleValueChange(next) {
    onChange?.({
      src: next?.src || "",
      alt: next?.alt || ""
    });
  }

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tourId", tourId);
      formData.append("kind", kind);
      formData.append("alt", image.alt || "");

      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.error || "Не удалось загрузить изображение");
      }

      handleValueChange({
        src: result.src || "",
        alt: image.alt || ""
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Не удалось загрузить изображение");
    } finally {
      setIsUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <AdminField label={label}>
        <div className={styles.field}>
          {image.src ? (
            <div className={styles.preview}>
              <img src={image.src} alt={image.alt || ""} />
            </div>
          ) : (
            <div className={styles.empty}>Изображение не выбрано</div>
          )}

          <div className={styles.controls}>
            <AdminField label="src">
              <input
                value={image.src || ""}
                onChange={(e) =>
                  handleValueChange({
                    ...image,
                    src: e.target.value
                  })
                }
                disabled={disabled || isUploading}
              />
            </AdminField>

            <AdminField label="alt">
              <input
                value={image.alt || ""}
                onChange={(e) =>
                  handleValueChange({
                    ...image,
                    alt: e.target.value
                  })
                }
                disabled={disabled || isUploading}
              />
            </AdminField>

            <div className={styles.actions}>
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={disabled || isUploading || !tourId}
                className={styles.fileInput}
              />

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={disabled || isUploading || !tourId}
                className={styles.button}
              >
                {isUploading ? "Загрузка..." : "Загрузить файл"}
              </button>

              <button
                type="button"
                onClick={() => handleValueChange({ src: "", alt: "" })}
                disabled={disabled || isUploading}
                className={`${styles.button} ${styles.button_secondary}`}
              >
                Очистить
              </button>
            </div>

            {!tourId ? (
              <p className={styles.hint}>
                Сначала нужен tourId, чтобы загрузить файл в папку тура.
              </p>
            ) : null}

            {error ? <p className={styles.error}>{error}</p> : null}
          </div>
        </div>
      </AdminField>
    </div>
  );
}