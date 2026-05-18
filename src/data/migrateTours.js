// ========================================
// MIGRATE tours -> tourPages
// UPDATED VERSION
// ========================================

const DRY_RUN = false;

const sourceCollection = db.tours;
const targetCollection = db.tourPages;

// ========================================
// HELPERS
// ========================================

function normalizeText(value) {
  if (Array.isArray(value)) {
    return value
      .filter(Boolean)
      .map((v) => String(v))
      .join(" ");
  }

  return String(value || "");
}

function createImage(src = "", alt = "") {
  return {
    src: String(src || ""),
    alt: String(alt || "")
  };
}

function createParagraphBlock(text = "") {
  return {
    id: new ObjectId().toString(),

    type: "paragraph",

    content: [
      {
        type: "text",
        text: normalizeText(text)
      }
    ]
  };
}

function createListBlock(items = []) {
  return {
    id: new ObjectId().toString(),

    type: "list",

    style: "unordered",

    items: (items || []).map((item) => ({
      id: new ObjectId().toString(),

      children: [
        {
          type: "text",
          text: normalizeText(item)
        }
      ]
    }))
  };
}

function createRichTextDocumentFromParagraphs(
  paragraphs = []
) {
  return {
    version: 1,

    blocks: (paragraphs || [])
      .filter(Boolean)
      .map((text) =>
        createParagraphBlock(text)
      )
  };
}

function createSection({
  type,
  order,
  backgroundTone = "light",
  data = {}
}) {
  return {
    id: `${type}-${new ObjectId().toString()}`,

    type,

    enabled: true,

    order,

    backgroundTone,

    data
  };
}

// ========================================
// MAIN
// ========================================

const tours = sourceCollection
  .find({})
  .toArray();

print(`Found tours: ${tours.length}`);

for (const tour of tours) {
  try {
    // ========================================
    // SKIP EXISTING
    // ========================================

    const existing =
      targetCollection.findOne({
        tourId: tour.tourId
      });

    if (existing) {
      print(`SKIP: ${tour.tourId}`);
      continue;
    }

    // ========================================
    // SECTIONS
    // ========================================

    const sections = [];

    // ========================================
    // HERO
    // ========================================

    sections.push(
      createSection({
        type: "hero",

        order: 1,

        backgroundTone: "dark",

        data: {
          title: normalizeText(
            tour.title
          ),

          image: createImage(
            tour.bigImg ||
              tour.smallImg ||
              "",

            tour.title || ""
          )
        }
      })
    );

    // ========================================
    // ABOUT
    // ========================================

    if (
      Array.isArray(tour.about) &&
      tour.about.length > 0
    ) {
      sections.push(
        createSection({
          type: "about",

          order: 2,

          data: {
            aboutTour: {
              title: "О туре",

              text: {
                paragraphs: tour.about
                  .filter(Boolean)
                  .map((p) =>
                    normalizeText(p)
                  )
              }
            },

            tourInfo: {
              title: "Информация",

              facts: Array.isArray(
                tour.info?.blocks
              )
                ? tour.info.blocks.map(
                    (item) => ({
                      id:
                        new ObjectId().toString(),

                      label:
                        normalizeText(
                          item.title
                        ),

                      value: [
                        {
                          type: "text",

                          text:
                            normalizeText(
                              item.description
                            )
                        }
                      ]
                    })
                  )
                : [],

              details: {
                summary:
                  "Дополнительная информация",

                content: [
                  createParagraphBlock(
                    tour.details
                  )
                ]
              }
            }
          }
        })
      );
    }

    // ========================================
    // GALLERY
    // ========================================

    if (
      Array.isArray(tour.tourPhoto) &&
      tour.tourPhoto.length > 0
    ) {
      sections.push(
        createSection({
          type: "gallery",

          order: 3,

          data: {
            title: "Фотографии",

            photos:
              tour.tourPhoto.map(
                (photo) =>
                  createImage(
                    typeof photo ===
                      "string"
                      ? photo
                      : photo?.src || "",

                    photo?.alt ||
                      tour.title ||
                      ""
                  )
              )
          }
        })
      );
    }

    // ========================================
    // PROGRAM
    // ========================================

    if (
      tour.tourProgram &&
      Array.isArray(
        tour.tourProgram.days
      )
    ) {
      sections.push(
        createSection({
          type: "program",

          order: 4,

          data: {
            title:
              normalizeText(
                tour.tourProgram.title
              ) || "Программа",

            subtitle: "",

            preface: {
              paragraphs: []
            },

            days:
              tour.tourProgram.days.map(
                (day) => ({
                  id:
                    new ObjectId().toString(),

                  title:
                    normalizeText(
                      day.title
                    ),

                  photos: Array.isArray(
                    day.photos
                  )
                    ? day.photos.map(
                        (photo) =>
                          createImage(
                            typeof photo ===
                              "string"
                              ? photo
                              : photo?.src ||
                                  "",

                            photo?.alt ||
                              day.title ||
                              ""
                          )
                      )
                    : [],

                  description:
                    createRichTextDocumentFromParagraphs(
                      Array.isArray(
                        day.description
                      )
                        ? day.description
                        : [
                            day.description ||
                              ""
                          ]
                    )
                })
              )
          }
        })
      );
    }

    // ========================================
    // ACCORDION GROUP
    // ========================================

    const accordionItems = [];

    if (
      tour.includedInfo &&
      Array.isArray(
        tour.includedInfo.sections
      )
    ) {
      tour.includedInfo.sections.forEach(
        (section) => {
          accordionItems.push({
            id:
              new ObjectId().toString(),

            summary:
              normalizeText(
                section.title
              ),

            content: {
              version: 1,

              blocks: Array.isArray(
                section.items
              )
                ? [
                    createListBlock(
                      section.items.map(
                        (i) =>
                          normalizeText(
                            i
                          )
                      )
                    )
                  ]
                : []
            }
          });
        }
      );
    }

    if (tour.clothes) {
      accordionItems.push({
        id:
          new ObjectId().toString(),

        summary:
          "Что взять с собой",

        content: {
          version: 1,

          blocks: [
            createParagraphBlock(
              tour.clothes
            )
          ]
        }
      });
    }

    if (tour.details) {
      accordionItems.push({
        id:
          new ObjectId().toString(),

        summary:
          "Дополнительная информация",

        content: {
          version: 1,

          blocks: [
            createParagraphBlock(
              tour.details
            )
          ]
        }
      });
    }

    if (accordionItems.length > 0) {
      sections.push(
        createSection({
          type: "accordionGroup",

          order: 5,

          data: {
            title:
              "Полезная информация",

            items:
              accordionItems
          }
        })
      );
    }

    // ========================================
    // CTA
    // ========================================

    sections.push(
      createSection({
        type: "ctaForm",

        order: 999,

        backgroundTone: "dark",

        data: {
          title:
            "Оставить заявку",

          subtitle:
            "Свяжемся с вами и расскажем подробности",

          buttonText:
            "Отправить заявку",

          successMessage:
            "Спасибо! Мы скоро свяжемся с вами.",

          image: createImage(
            tour.smallImg ||
              tour.bigImg ||
              "",

            tour.title || ""
          )
        }
      })
    );

    // ========================================
    // FINAL DOCUMENT
    // ========================================

    const brief = normalizeText(
      tour.description
    );

    const newDoc = {
      tourId:
        normalizeText(
          tour.tourId
        ) ||
        new ObjectId().toString(),

      path:
        normalizeText(
          tour.href
        ) ||
        `/tours/${tour.tourId}`,

      title: normalizeText(
        tour.title
      ),

      brief,

      status: "published",

      // ========================================
      // CARD
      // ========================================

      card: {
        price: normalizeText(
          tour.price
        ),

        duration:
          normalizeText(
            tour.time
          ),

        season: normalizeText(
          tour.season
        ),

        img: createImage(
          tour.smallImg || "",

          tour.title || ""
        )
      },

      // ========================================
      // HOMEPAGE
      // ========================================

      homePage: {
        show: false,

        order: 0
      },

      // ========================================
      // NAVIGATION
      // ========================================

      navigation: {
        showInMainMenu: true,

        mainMenuOrder: 0,

        menuTitle:
          normalizeText(
            tour.title
          )
      },

      // ========================================
      // SEO
      // ========================================

      seo: {
        metaTitle:
          normalizeText(
            tour.seoTitle ||
              tour.title
          ),

        metaDescription:
          normalizeText(
            tour.seoDescription ||
              brief
          ),

        keywords: [],

        canonicalUrl:
          normalizeText(
            tour.href
          ) ||
          `/tours/${tour.tourId}`,

        ogTitle:
          normalizeText(
            tour.seoTitle ||
              tour.title
          ),

        ogDescription:
          normalizeText(
            tour.seoDescription ||
              brief
          ),

        ogImage:
          normalizeText(
            tour.bigImg ||
              tour.smallImg
          ),

        robots: {
          index: true,

          follow: true
        }
      },

      // ========================================
      // SECTIONS
      // ========================================

      sections,

      // ========================================
      // DATES
      // ========================================

      createdAt:
        tour.createdAt ||
        new Date(),

      updatedAt:
        tour.updatedAt ||
        new Date(),

      publishedAt:
        tour.publishedAt ||
        new Date()
    };

    // ========================================
    // SAVE
    // ========================================

    if (DRY_RUN) {
      print(
        `\n======= DRY RUN: ${tour.tourId} =======`
      );

      printjson(newDoc);
    } else {
      try {
        targetCollection.insertOne(
          newDoc
        );

        print(
          `MIGRATED: ${tour.tourId}`
        );
      } catch (e) {
        print(
          `\n===== VALIDATION ERROR =====`
        );

        print(
          `TOUR: ${tour.tourId}`
        );

        printjson(e.errInfo);

        print(
          `\n===== DOCUMENT =====`
        );

        printjson(newDoc);

        break;
      }
    }
  } catch (error) {
    print(
      `ERROR: ${
        tour.tourId || "unknown"
      }`
    );

    printjson(error);
  }
}

print("\nDONE");