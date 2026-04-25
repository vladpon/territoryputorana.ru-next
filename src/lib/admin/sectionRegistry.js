function createId(type) {
  return `${type}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function createHeroSection(order) {
  return {
    id: createId("hero"),
    type: "hero",
    enabled: true,
    order,
    backgroundTone: "dark",
    data: {
      title: "",
      image: {
        src: "",
        alt: ""
      }
    }
  };
}

function createAboutSection(order) {
  return {
    id: createId("about"),
    type: "about",
    enabled: true,
    order,
    backgroundTone: "light",
    data: {
      aboutTour: {
        title: "",
        text: {
          paragraphs: []
        }
      },
      tourInfo: {
        title: "",
        facts: [],
        details: {
          summary: "",
          content: []
        }
      }
    }
  };
}

function createProgramSection(order) {
  return {
    id: createId("program"),
    type: "program",
    enabled: true,
    order,
    backgroundTone: "dark",
    data: {
      title: "",
      subtitle: "",
      preface: {
        paragraphs: []
      },
      days: []
    }
  };
}

function createGallerySection(order) {
  return {
    id: createId("gallery"),
    type: "gallery",
    enabled: true,
    order,
    backgroundTone: "light",
    data: {
      title: "",
      photos: []
    }
  };
}

function createAccordionGroupSection(order) {
  return {
    id: createId("accordionGroup"),
    type: "accordionGroup",
    enabled: true,
    order,
    backgroundTone: "dark",
    data: {
      title: "",
      items: []
    }
  };
}

function createCtaFormSection(order) {
  return {
    id: createId("ctaForm"),
    type: "ctaForm",
    enabled: true,
    order,
    backgroundTone: "light",
    data: {
      title: "",
      subtitle: "",
      buttonText: "Отправить",
      successMessage: "Спасибо! Мы скоро свяжемся с вами.",
      image: {
        src: "",
        alt: ""
      }
    }
  };
}

function createNoteSection(order) {
  return {
    id: createId("note"),
    type: "note",
    enabled: true,
    order,
    backgroundTone: "light",
    data: {
      title: "",
      content: {
        version: 1,
        blocks: []
      },
      appearance: {
        colorScheme: "default",
        titleAlign: "left",
        contentAlign: "left",
        width: "normal"
      }
    }
  };
}

export const sectionRegistry = {
  hero: {
    label: "Hero",
    create: createHeroSection
  },
  about: {
    label: "About",
    create: createAboutSection
  },
  program: {
    label: "Program",
    create: createProgramSection
  },
  gallery: {
    label: "Gallery",
    create: createGallerySection
  },
  accordionGroup: {
    label: "Accordion group",
    create: createAccordionGroupSection
  },
  ctaForm: {
    label: "CTA form",
    create: createCtaFormSection
  },
  note: {
    label: "Note",
    create: createNoteSection
  }
};

export const sectionTypeOptions = Object.entries(sectionRegistry).map(
  ([value, config]) => ({
    value,
    label: config.label
  })
);