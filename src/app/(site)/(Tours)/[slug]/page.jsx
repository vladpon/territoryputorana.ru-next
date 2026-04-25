export const dynamic = "force-dynamic";

import { cache } from "react";
import { notFound } from "next/navigation";

import TourPageCover from "@/components/tour/TourPageCover/TourPageCover";
import TourPageAbout from "@/components/tour/TourPageAbout/TourPageAbout";
import TourPageProgram from "@/components/tour/TourPageProgram/TourPageProgram";
import AccordionGroupBlock from "@/components/blocks/AccordionGroupBlock/AccordionGroupBlock";
// import TourPageGallery from "@/components/tour/TourPageGallery/TourPageGallery";
import PhotoBlock from "@/components/blocks/PhotoBlock/PhotoBlock";
import NoteBlock from "@/components/blocks/NoteBlock/NoteBlock";
import CtaFormBlock from "@/components/blocks/CtaFormBlock/CtaFormBlock";

import { buildTourPageMetadata } from "@/lib/metadata/tourPageMetadata";
import { getTourPageByPath, getPublishedTourOptions } from "@/lib/mongo/tourPages";



const tourOptions = await getPublishedTourOptions();

const getPageData = cache(async (slug) => {
  const decodedSlug = decodeURIComponent(slug);
  const path = `/${decodedSlug}`;

  return await getTourPageByPath(path);
});

function renderSection(page, section, tourOptions) {
  switch (section.type) {
    case "hero":
      return <TourPageCover page={page} section={section} />;

    case "about":
      return <TourPageAbout page={page} section={section} />;

    case "program":
      return <TourPageProgram page={page} section={section} />;


    case "accordionGroup":
        return (
            <AccordionGroupBlock
            title={section.data?.title || ""}
            items={section.data?.items || []}
            backgroundTone={section.backgroundTone}
            />
        );

    case "gallery":
      return <PhotoBlock photos={section.data?.photos || []} />;


    case "ctaForm":
      return <CtaFormBlock
          backgroundTone={section.backgroundTone}
          image={section.data.image}
          title={section.data.title}
          subtitle={section.data.subtitle}
          buttonText={section.data.buttonText}
          successMessage={section.data.successMessage}
          tourOptions={tourOptions}
          defaultTourValue={page.tourId}
              />

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

  const [page, tourOptions] = await Promise.all([
    getPageData(slug),
    getPublishedTourOptions()
  ]);


  if (!page) notFound();

  const sections = (page.sections || [])
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <main>
      {await Promise.all(
        sections.map(async (section) => (
          <div key={section.id}>
            {await renderSection(page, section, tourOptions)}
          </div>
        ))
      )}
    </main>
  );
}