import {
  normalizeArray,
  normalizeBoolean,
  normalizeImage,
  normalizeNumber,
  normalizeString
} from "./common";
import { normalizeSection } from "./section";

function normalizeStatus(value) {
  return ["draft", "published", "archived"].includes(value)
    ? value
    : "draft";
}

export function normalizeTourPage(page) {
  const safe = page && typeof page === "object" ? page : {};

  return {
    _id: safe._id,
    tourId: normalizeString(safe.tourId),
    path: normalizeString(safe.path),
    title: normalizeString(safe.title),
    status: normalizeStatus(safe.status),

    card: {
      price: normalizeString(safe?.card?.price),
      duration: normalizeString(safe?.card?.duration),
      season: normalizeString(safe?.card?.season),
      img: normalizeImage(safe?.card?.img)
    },

    homePage: {
      show: normalizeBoolean(safe?.homePage?.show, false),
      order: normalizeNumber(safe?.homePage?.order, 0)
    },

    navigation: {
      showInMainMenu: normalizeBoolean(
        safe?.navigation?.showInMainMenu,
        false
      ),
      mainMenuOrder: normalizeNumber(
        safe?.navigation?.mainMenuOrder,
        0
      ),
      menuTitle: normalizeString(safe?.navigation?.menuTitle)
    },

    seo: {
      metaTitle: normalizeString(safe?.seo?.metaTitle),
      metaDescription: normalizeString(safe?.seo?.metaDescription),
      keywords: normalizeArray(safe?.seo?.keywords)
        .map((item) => normalizeString(item))
        .filter(Boolean),
      canonicalUrl: normalizeString(safe?.seo?.canonicalUrl),
      ogTitle: normalizeString(safe?.seo?.ogTitle),
      ogDescription: normalizeString(safe?.seo?.ogDescription),
      ogImage: normalizeString(safe?.seo?.ogImage),
      robots: {
        index: safe?.seo?.robots?.index === true,
        follow: safe?.seo?.robots?.follow === true
      }
    },

    sections: normalizeArray(safe.sections)
      .map(normalizeSection)
      .filter(Boolean)
      .sort((a, b) => a.order - b.order),

    createdAt: safe.createdAt instanceof Date ? safe.createdAt : new Date(),
    updatedAt: safe.updatedAt instanceof Date ? safe.updatedAt : new Date(),
    publishedAt: safe.publishedAt instanceof Date ? safe.publishedAt : null
  };
}