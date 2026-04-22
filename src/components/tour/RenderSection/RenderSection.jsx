import TourPageCover from "@/components/tour/TourPageCover/TourPageCover";
import TourPageAbout from "@/components/tour/TourPageAbout/TourPageAbout";
import TourPageProgram from "@/components/tour/TourPageProgram/TourPageProgram";
// import TourPageGallery from "@/components/tour/TourPageGallery/TourPageGallery";
// import TourPageAccordionGroup from "@/components/tour/TourPageAccordionGroup/TourPageAccordionGroup";
// import TourPageCtaForm from "@/components/tour/TourPageCtaForm/TourPageCtaForm";
// import TourPageNote from "@/components/tour/TourPageNote/TourPageNote";

const sectionComponentMap = {
  hero: TourPageCover,
  about: TourPageAbout,
  program: TourPageProgram,
//   gallery: TourPageGallery,
//   accordionGroup: TourPageAccordionGroup,
//   ctaForm: TourPageCtaForm,
//   note: TourPageNote
};

export default function RenderSection({ page, section }) {
  const Component = sectionComponentMap[section?.type];

  if (!Component) return null;

  return <Component page={page} section={section} />;
}