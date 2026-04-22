import { normalizeHeroSection } from "./sections/hero"
import { normalizeAboutSection } from "./sections/about"
import { normalizeProgramSection } from "./sections/program"
import { normalizeGallerySection } from "./sections/gallery"
import { normalizeAccordionGroupSection } from "./sections/accordionGroup"
import { normalizeCtaFormSection } from "./sections/ctaForm"
import { normalizeNoteSection } from "./sections/note"

export function normalizeSection(section) {
  const type = section?.type

  switch (type) {
    case "hero":
      return normalizeHeroSection(section)
    case "about":
      return normalizeAboutSection(section)
    case "program":
      return normalizeProgramSection(section)
    case "gallery":
      return normalizeGallerySection(section)
    case "accordionGroup":
      return normalizeAccordionGroupSection(section)
    case "ctaForm":
      return normalizeCtaFormSection(section)
    case "note":
      return normalizeNoteSection(section)
    default:
      return null
  }
}