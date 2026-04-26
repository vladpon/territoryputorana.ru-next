"use client";

import { useState } from "react";
import { createTourPageInitialValues } from "@/lib/admin/tourPageInitialValues";
import AdminField from "@/components/admin/AdminField/AdminField";
import AdminActionsBar from "@/components/admin/AdminActionsBar/AdminActionsBar";
import AdminSectionsEditor from "@/components/admin/AdminSectionsEditor/AdminSectionsEditor";
import styles from "./AdminTourPageForm.module.scss";

function setByPath(object, path, value) {
  const keys = path.split(".");
  const result = structuredClone(object);
  let current = result;

  for (let i = 0; i < keys.length - 1; i += 1) {
    current = current[keys[i]];
  }

  current[keys[keys.length - 1]] = value;
  return result;
}

export default function AdminTourPageForm({ tourId, initialData }) {
  const [formData, setFormData] = useState(
    createTourPageInitialValues(initialData)
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateField(path, value) {
    setFormData((prev) => setByPath(prev, path, value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      const payload = {
        title: formData.title,
        path: formData.path,
        status: formData.status,

        card: {
          price: formData.card.price,
          duration: formData.card.duration,
          season: formData.card.season,
          img: {
            src: formData.card.img.src,
            alt: formData.card.img.alt
          }
        },

        homePage: {
          show: formData.homePage.show,
          order: Number(formData.homePage.order) || 0
        },

        navigation: {
          showInMainMenu: formData.navigation.showInMainMenu,
          mainMenuOrder: Number(formData.navigation.mainMenuOrder) || 0,
          menuTitle: formData.navigation.menuTitle
        },

        seo: {
          metaTitle: formData.seo.metaTitle,
          metaDescription: formData.seo.metaDescription,
          canonicalUrl: formData.seo.canonicalUrl,
          ogTitle: formData.seo.ogTitle,
          ogDescription: formData.seo.ogDescription,
          ogImage: formData.seo.ogImage,
          keywords: formData.seo.keywords
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          robots: {
            index: formData.seo.robots.index,
            follow: formData.seo.robots.follow
          }
        },

        sections: formData.sections
      };

      const response = await fetch(`/api/tourpages/${tourId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.error || "Не удалось сохранить изменения");
      }

      setSuccess("Изменения сохранены");
    } catch (err) {
      console.error(err);
      setError(err.message || "Не удалось сохранить изменения");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <section className={styles.section}>
        <h2 className={styles.section__title}>Основное</h2>

        <div className={styles.grid}>
          <AdminField label="Название">
            <input
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </AdminField>

          <AdminField label="Path" hint="Например: /lostput">
            <input
              value={formData.path}
              onChange={(e) => updateField("path", e.target.value)}
            />
          </AdminField>

          <AdminField label="Статус">
            <select
              value={formData.status}
              onChange={(e) => updateField("status", e.target.value)}
            >
              <option value="draft">Черновик</option>
              <option value="published">Опубликован</option>
              <option value="archived">Архив</option>
            </select>
          </AdminField>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Карточка</h2>

        <div className={styles.grid}>
          <AdminField label="Цена">
            <input
              value={formData.card.price}
              onChange={(e) => updateField("card.price", e.target.value)}
            />
          </AdminField>

          <AdminField label="Длительность">
            <input
              value={formData.card.duration}
              onChange={(e) => updateField("card.duration", e.target.value)}
            />
          </AdminField>

          <AdminField label="Сезон">
            <input
              value={formData.card.season}
              onChange={(e) => updateField("card.season", e.target.value)}
            />
          </AdminField>

          <AdminField label="Изображение карточки: src">
            <input
              value={formData.card.img.src}
              onChange={(e) => updateField("card.img.src", e.target.value)}
            />
          </AdminField>

          <AdminField label="Изображение карточки: alt">
            <input
              value={formData.card.img.alt}
              onChange={(e) => updateField("card.img.alt", e.target.value)}
            />
          </AdminField>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Главная страница</h2>

        <div className={styles.grid}>
          <AdminField label="Показывать на главной">
            <input
              type="checkbox"
              checked={formData.homePage.show}
              onChange={(e) => updateField("homePage.show", e.target.checked)}
            />
          </AdminField>

          <AdminField label="Порядок на главной">
            <input
              type="number"
              value={formData.homePage.order}
              onChange={(e) => updateField("homePage.order", e.target.value)}
            />
          </AdminField>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Навигация</h2>

        <div className={styles.grid}>
          <AdminField label="Показывать в главном меню">
            <input
              type="checkbox"
              checked={formData.navigation.showInMainMenu}
              onChange={(e) =>
                updateField("navigation.showInMainMenu", e.target.checked)
              }
            />
          </AdminField>

          <AdminField label="Порядок в меню">
            <input
              type="number"
              value={formData.navigation.mainMenuOrder}
              onChange={(e) =>
                updateField("navigation.mainMenuOrder", e.target.value)
              }
            />
          </AdminField>

          <AdminField label="Название в меню">
            <input
              value={formData.navigation.menuTitle}
              onChange={(e) =>
                updateField("navigation.menuTitle", e.target.value)
              }
            />
          </AdminField>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>SEO</h2>

        <div className={styles.grid}>
          <AdminField label="Meta title">
            <input
              value={formData.seo.metaTitle}
              onChange={(e) => updateField("seo.metaTitle", e.target.value)}
            />
          </AdminField>

          <AdminField label="Canonical URL">
            <input
              value={formData.seo.canonicalUrl}
              onChange={(e) => updateField("seo.canonicalUrl", e.target.value)}
            />
          </AdminField>

          <AdminField label="OG title">
            <input
              value={formData.seo.ogTitle}
              onChange={(e) => updateField("seo.ogTitle", e.target.value)}
            />
          </AdminField>

          <AdminField label="OG image">
            <input
              value={formData.seo.ogImage}
              onChange={(e) => updateField("seo.ogImage", e.target.value)}
            />
          </AdminField>

          <AdminField label="Keywords" hint="Через запятую">
            <input
              value={formData.seo.keywords}
              onChange={(e) => updateField("seo.keywords", e.target.value)}
            />
          </AdminField>

          <AdminField label="Robots: index">
            <input
              type="checkbox"
              checked={formData.seo.robots.index}
              onChange={(e) => updateField("seo.robots.index", e.target.checked)}
            />
          </AdminField>

          <AdminField label="Robots: follow">
            <input
              type="checkbox"
              checked={formData.seo.robots.follow}
              onChange={(e) => updateField("seo.robots.follow", e.target.checked)}
            />
          </AdminField>
        </div>

        <div className={styles.stack}>
          <AdminField label="Meta description">
            <textarea
              rows={4}
              value={formData.seo.metaDescription}
              onChange={(e) =>
                updateField("seo.metaDescription", e.target.value)
              }
            />
          </AdminField>

          <AdminField label="OG description">
            <textarea
              rows={4}
              value={formData.seo.ogDescription}
              onChange={(e) =>
                updateField("seo.ogDescription", e.target.value)
              }
            />
          </AdminField>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Секции</h2>

        <AdminSectionsEditor
          tourId={tourId}
          sections={formData.sections}
          onChange={(sections) => updateField("sections", sections)}
        />
      </section>

      <AdminActionsBar
        isSaving={isSaving}
        error={error}
        success={success}
      />
    </form>
  );
}