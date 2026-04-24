export const dynamic = "force-dynamic";

import { cache } from "react";
import { notFound } from "next/navigation";

import TourPageCover from "@/components/tour/TourPageCover/TourPageCover";
import TourPageAbout from "@/components/tour/TourPageAbout/TourPageAbout";
import TourPageProgram from "@/components/tour/TourPageProgram/TourPageProgram";
// import TourPageGallery from "@/components/tour/TourPageGallery/TourPageGallery";
// import TourPageAccordionGroup from "@/components/tour/TourPageAccordionGroup/TourPageAccordionGroup";
// import TourPageCtaForm from "@/components/tour/TourPageCtaForm/TourPageCtaForm";
import NoteBlock from "@/components/blocks/NoteBlock/NoteBlock";

import { getTourPageByPath } from "@/lib/mongo/tourPages";
import { buildTourPageMetadata } from "@/lib/metadata/tourPageMetadata";

const getPageData = cache(async (slug) => {
  const decodedSlug = decodeURIComponent(slug);
  const path = `/${decodedSlug}`;

  return await getTourPageByPath(path);
});

function renderSection(page, section) {
  switch (section.type) {
    case "hero":
      return <TourPageCover page={page} section={section} />;

    case "about":
      return <TourPageAbout page={page} section={section} />;

    case "program":
      return <TourPageProgram page={page} section={section} />;

    // case "gallery":
    //   return <TourPageGallery page={page} section={section} />;

    // case "accordionGroup":
    //   return <TourPageAccordionGroup page={page} section={section} />;

    // case "ctaForm":
    //   return <TourPageCtaForm page={page} section={section} />;

    case "note":
      return (
        <NoteBlock
          title={section.data?.title || ""}
          content={section.data?.content}
          backgroundTone={section.backgroundTone}
          colorScheme={section.data?.appearance?.colorScheme}
          titleAlign={section.data?.appearance?.titleAlign}
          contentAlign={section.data?.appearance?.contentAlign}
          width={section.data?.appearance?.width}
        />
      );

    default:
      return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  return buildTourPageMetadata(() => getPageData(slug));
}

export default async function TourPage({ params }) {
  const { slug } = await params;
  const page = await getPageData(slug);

  if (!page) notFound();

  const sections = (page.sections || [])
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <main>
      {sections.map((section) => (
        <div key={section.id}>
          {renderSection(page, section)}
        </div>
      ))}
    </main>
  );
}