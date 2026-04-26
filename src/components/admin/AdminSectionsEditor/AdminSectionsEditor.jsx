"use client";

import { useState } from "react";
import { sectionRegistry, sectionTypeOptions } from "@/lib/admin/sectionRegistry";
import HeroSectionEditor from "@/components/admin/section-editors/HeroSectionEditor/HeroSectionEditor";
import AboutSectionEditor from "@/components/admin/section-editors/AboutSectionEditor/AboutSectionEditor";
import ProgramSectionEditor from "@/components/admin/section-editors/ProgramSectionEditor/ProgramSectionEditor";
import GallerySectionEditor from "@/components/admin/section-editors/GallerySectionEditor/GallerySectionEditor";
import CtaFormSectionEditor from "@/components/admin/section-editors/CtaFormSectionEditor/CtaFormSectionEditor";
import NoteSectionEditor from "@/components/admin/section-editors/NoteSectionEditor/NoteSectionEditor";
import AccordionGroupSectionEditor from "@/components/admin/section-editors/AccordionGroupSectionEditor/AccordionGroupSectionEditor";

import styles from "./AdminSectionsEditor.module.scss";


function reindexSections(sections) {
  return sections.map((section, index) => ({
    ...section,
    order: index + 1
  }));
}

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

function renderSectionEditor(section, onChange) {
  switch (section.type) {
    case "hero":
      return <HeroSectionEditor section={section} onChange={onChange} />;

    case "about":
      return <AboutSectionEditor section={section} onChange={onChange} />;

    case "program":
      return <ProgramSectionEditor section={section} onChange={onChange} />;

    case "gallery":
      return <GallerySectionEditor section={section} onChange={onChange} />;

    case "ctaForm":
      return <CtaFormSectionEditor section={section} onChange={onChange} />;

    case "note":
      return <NoteSectionEditor section={section} onChange={onChange} />;

    case "accordionGroup":
      return <AccordionGroupSectionEditor section={section} onChange={onChange} />;

    default:
      return null;
  }
}

export default function AdminSectionsEditor({ sections = [], onChange }) {
  const [selectedType, setSelectedType] = useState("hero");
  const [expandedSectionId, setExpandedSectionId] = useState(null);

  function handleAddSection() {
    const factory = sectionRegistry[selectedType]?.create;
    if (!factory) return;

    const nextSections = reindexSections([
      ...sections,
      factory(sections.length + 1)
    ]);

    onChange(nextSections);
    setExpandedSectionId(nextSections[nextSections.length - 1]?.id || null);
  }

  function moveSection(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const next = [...sections];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    onChange(reindexSections(next));
  }

  function toggleEnabled(index) {
    const next = sections.map((section, i) =>
      i === index
        ? { ...section, enabled: !section.enabled }
        : section
    );

    onChange(next);
  }

  function removeSection(index) {
    const removedId = sections[index]?.id;
    const next = sections.filter((_, i) => i !== index);
    onChange(reindexSections(next));

    if (expandedSectionId === removedId) {
      setExpandedSectionId(null);
    }
  }

  function updateSectionByPath(index, path, value) {
    const next = sections.map((section, i) =>
      i === index ? setByPath(section, path, value) : section
    );

    onChange(next);
  }

  function toggleExpanded(sectionId) {
    setExpandedSectionId((prev) => (prev === sectionId ? null : sectionId));
  }

  return (
    <div className={styles.editor}>
      <div className={styles.editor__toolbar}>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {sectionTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          className={styles.editor__addButton}
          onClick={handleAddSection}
        >
          Добавить секцию
        </button>
      </div>

      {!sections.length ? (
        <p className={styles.editor__empty}>Секций пока нет.</p>
      ) : (
        <div className={styles.editor__list}>
          {sections.map((section, index) => {
            const isExpanded = expandedSectionId === section.id;

            return (
              <div key={section.id} className={styles.item}>
                <div className={styles.item__main}>
                  <div className={styles.item__titleRow}>
                    <strong>{sectionRegistry[section.type]?.label || section.type}</strong>
                    <span className={styles.item__meta}>id: {section.id}</span>
                  </div>

                  <div className={styles.item__metaRow}>
                    <span>type: {section.type}</span>
                    <span>order: {section.order}</span>
                    <span>tone: {section.backgroundTone}</span>
                    <span>{section.enabled ? "enabled" : "disabled"}</span>
                  </div>

                  {isExpanded
                    ? renderSectionEditor(section, (path, value) =>
                        updateSectionByPath(index, path, value)
                      )
                    : null}
                </div>

                <div className={styles.item__actions}>
                  <button
                    type="button"
                    onClick={() => toggleExpanded(section.id)}
                  >
                    {isExpanded ? "Скрыть" : "Редактировать"}
                  </button>

                  <button
                    type="button"
                    onClick={() => moveSection(index, -1)}
                    disabled={index === 0}
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    onClick={() => moveSection(index, 1)}
                    disabled={index === sections.length - 1}
                  >
                    ↓
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleEnabled(index)}
                  >
                    {section.enabled ? "Выключить" : "Включить"}
                  </button>

                  <button
                    type="button"
                    className={styles.item__danger}
                    onClick={() => removeSection(index)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}