"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Section from "@/components/layout/Section/Section";
import styles from "./CtaFormBlock.module.scss";

export default function CtaFormBlock({
  backgroundTone = "light",
  image = { src: "", alt: "" },
  title = "",
  subtitle = "",
  buttonText = "Отправить",
  successMessage = "Спасибо! Мы скоро свяжемся с вами.",
  tourOptions = [],
  defaultTourValue = "",
  privacyHref = "/privacy"
}) {
  const router = useRouter();

  const initialTourValue = useMemo(() => {
    if (defaultTourValue) return defaultTourValue;
    if (tourOptions.length === 1) return tourOptions[0].value;
    return "";
  }, [defaultTourValue, tourOptions]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    tour: initialTourValue,
    count: "",
    text: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim()) {
      setSubmitError("Введите Ваше имя");
      return;
    }

    if (!formData.tel.trim()) {
      setSubmitError("Введите Ваш телефон");
      return;
    }

    if (!formData.tour.trim()) {
      setSubmitError("Выберите тур");
      return;
    }

    if (!formData.count.trim()) {
      setSubmitError("Введите количество участников");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");

      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          tel: formData.tel,
          tour: formData.tour,
          count: formData.count,
          text: formData.text
        })
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.error || "Не удалось отправить заявку");
      }

      setIsSuccess(true);

      setFormData({
        name: "",
        email: "",
        tel: "",
        tour: initialTourValue,
        count: "",
        text: ""
      });

      router.push("/thankyou");
    } catch (error) {
      console.error(error);
      setSubmitError(error.message || "Не удалось отправить заявку");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Section backgroundTone={backgroundTone}>
      <div className={styles.block}>
        <div className={styles.block__text}>
          {title ? <h2>{title}</h2> : null}
          {subtitle ? <p>{subtitle}</p> : null}
        </div>

        <div className={styles.block__layout}>
          {image?.src ? (
            <div className={styles.block__image}>
              <img src={image.src} alt={image.alt || title || ""} />
            </div>
          ) : null}

          <div className={styles.block__form}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Имя"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="e-mail"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
              />

              <input
                type="tel"
                name="tel"
                placeholder="Телефон"
                value={formData.tel}
                onChange={(e) => updateField("tel", e.target.value)}
                required
              />

              <select
                name="tour-select"
                value={formData.tour}
                onChange={(e) => updateField("tour", e.target.value)}
                required
              >
                <option value="" disabled>
                  Какой тур Вас интересует
                </option>

                {tourOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="count"
                placeholder="Количество участников в Вашей группе"
                value={formData.count}
                onChange={(e) => updateField("count", e.target.value)}
                required
              />

              <textarea
                name="text"
                placeholder="Дополнительная информация (желательные даты)"
                rows="5"
                value={formData.text}
                onChange={(e) => updateField("text", e.target.value)}
              />

              <button
                className={styles.block__button}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : buttonText}
              </button>

              <label className={styles.block__privacy}>
                Нажимая кнопку "{buttonText}", вы соглашаетесь с{" "}
                <a href={privacyHref}>обработкой персональных данных</a>
              </label>

              {submitError ? (
                <p className={styles.block__error}>{submitError}</p>
              ) : null}

              {isSuccess ? (
                <p className={styles.block__success}>{successMessage}</p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}