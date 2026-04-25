export function createTourPageInitialValues(page) {
  return {
    tourId: page?.tourId || "",

    title: page?.title || "",
    path: page?.path || "",
    status: page?.status || "draft",

    card: {
      price: page?.card?.price || "",
      duration: page?.card?.duration || "",
      season: page?.card?.season || "",
      img: {
        src: page?.card?.img?.src || "",
        alt: page?.card?.img?.alt || ""
      }
    },

    homePage: {
      show: page?.homePage?.show ?? false,
      order: page?.homePage?.order ?? 0
    },

    navigation: {
      showInMainMenu: page?.navigation?.showInMainMenu ?? false,
      mainMenuOrder: page?.navigation?.mainMenuOrder ?? 0,
      menuTitle: page?.navigation?.menuTitle || ""
    },

    seo: {
      metaTitle: page?.seo?.metaTitle || "",
      metaDescription: page?.seo?.metaDescription || "",
      canonicalUrl: page?.seo?.canonicalUrl || "",
      ogTitle: page?.seo?.ogTitle || "",
      ogDescription: page?.seo?.ogDescription || "",
      ogImage: page?.seo?.ogImage || "",
      keywords: Array.isArray(page?.seo?.keywords)
        ? page.seo.keywords.join(", ")
        : "",
      robots: {
        index: page?.seo?.robots?.index ?? true,
        follow: page?.seo?.robots?.follow ?? true
      }
    },

    sections: Array.isArray(page?.sections) ? page.sections : []
  };
}