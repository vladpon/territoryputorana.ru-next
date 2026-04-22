export async function buildTourPageMetadata(getPageData) {
  const page = await getPageData();

  if (!page) {
    return {
      title: "Тур не найден",
      description: ""
    };
  }

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || "",
    openGraph: {
      title: page.seo?.ogTitle || page.seo?.metaTitle || page.title,
      description:
        page.seo?.ogDescription || page.seo?.metaDescription || "",
      images: page.seo?.ogImage ? [page.seo.ogImage] : []
    },
    robots: {
      index: page.seo?.robots?.index ?? true,
      follow: page.seo?.robots?.follow ?? true
    }
  };
}