db.createCollection("tourPages", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "tourId",
        "slug",
        "path",
        "title",
        "status",
        "card",
        "homePage",
        "seo",
        "sections",
        "createdAt",
        "updatedAt"
      ],
      additionalProperties: false,
      properties: {
        _id: {
          bsonType: "objectId"
        },

        tourId: {
          bsonType: "string",
          description: "Internal stable id of the tour page"
        },

        slug: {
          bsonType: "string",
          description: "URL slug without leading slash"
        },

        path: {
          bsonType: "string",
          pattern: "^/",
          description: "Full route path starting with /"
        },

        title: {
          bsonType: "string"
        },

        status: {
          enum: ["draft", "published", "archived"]
        },

        card: {
          bsonType: "object",
          required: ["price", "duration", "season", "img"],
          additionalProperties: false,
          properties: {
            price: { bsonType: "string" },
            duration: { bsonType: "string" },
            season: { bsonType: "string" },
            img: {
              bsonType: "object",
              required: ["src", "alt"],
              additionalProperties: false,
              properties: {
                src: { bsonType: "string" },
                alt: { bsonType: "string" }
              }
            }
          }
        },

        homePage: {
          bsonType: "object",
          required: ["show", "order"],
          additionalProperties: false,
          properties: {
            show: { bsonType: "bool" },
            order: { bsonType: ["int", "long", "double", "decimal"] }
          }
        },

        seo: {
          bsonType: "object",
          required: [
            "metaTitle",
            "metaDescription",
            "keywords",
            "canonicalUrl",
            "ogTitle",
            "ogDescription",
            "ogImage",
            "robots"
          ],
          additionalProperties: false,
          properties: {
            metaTitle: { bsonType: "string" },
            metaDescription: { bsonType: "string" },
            keywords: {
              bsonType: "array",
              items: { bsonType: "string" }
            },
            canonicalUrl: { bsonType: "string" },
            ogTitle: { bsonType: "string" },
            ogDescription: { bsonType: "string" },
            ogImage: { bsonType: "string" },
            robots: {
              bsonType: "object",
              required: ["index", "follow"],
              additionalProperties: false,
              properties: {
                index: { bsonType: "bool" },
                follow: { bsonType: "bool" }
              }
            }
          }
        },

        sections: {
          bsonType: "array",
          items: {
            oneOf: [
              { $ref: "#/$defs/heroSection" },
              { $ref: "#/$defs/aboutSection" },
              { $ref: "#/$defs/programSection" },
              { $ref: "#/$defs/gallerySection" },
              { $ref: "#/$defs/accordionGroupSection" },
              { $ref: "#/$defs/ctaFormSection" },
              { $ref: "#/$defs/noteSection" }
            ]
          }
        },

        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" },
        publishedAt: { bsonType: ["date", "null"] }
      },

      $defs: {
        image: {
          bsonType: "object",
          required: ["src", "alt"],
          additionalProperties: false,
          properties: {
            src: { bsonType: "string" },
            alt: { bsonType: "string" }
          }
        },

        inlineText: {
          bsonType: "object",
          required: ["type", "text"],
          additionalProperties: false,
          properties: {
            type: { enum: ["text"] },
            text: { bsonType: "string" },
            bold: { bsonType: "bool" },
            italic: { bsonType: "bool" },
            underline: { bsonType: "bool" }
          }
        },

        inlineLink: {
          bsonType: "object",
          required: ["type", "href", "target", "content"],
          additionalProperties: false,
          properties: {
            type: { enum: ["link"] },
            href: { bsonType: "string" },
            target: { enum: ["_self", "_blank"] },
            content: {
              bsonType: "array",
              items: { $ref: "#/$defs/inlineText" }
            }
          }
        },

        inlineNode: {
          oneOf: [
            { $ref: "#/$defs/inlineText" },
            { $ref: "#/$defs/inlineLink" }
          ]
        },

        paragraphBlock: {
          bsonType: "object",
          required: ["id", "type", "content"],
          additionalProperties: false,
          properties: {
            id: { bsonType: "string" },
            type: { enum: ["paragraph"] },
            content: {
              bsonType: "array",
              items: { $ref: "#/$defs/inlineNode" }
            }
          }
        },

        listItem: {
          bsonType: "object",
          required: ["id", "children"],
          additionalProperties: false,
          properties: {
            id: { bsonType: "string" },
            children: {
              bsonType: "array",
              items: { $ref: "#/$defs/inlineNode" }
            }
          }
        },

        listBlock: {
          bsonType: "object",
          required: ["id", "type", "style", "items"],
          additionalProperties: false,
          properties: {
            id: { bsonType: "string" },
            type: { enum: ["list"] },
            style: { enum: ["unordered", "ordered"] },
            items: {
              bsonType: "array",
              items: { $ref: "#/$defs/listItem" }
            }
          }
        },

        richTextDocument: {
          bsonType: "object",
          required: ["version", "blocks"],
          additionalProperties: false,
          properties: {
            version: {
              bsonType: ["int", "long", "double", "decimal"]
            },
            blocks: {
              bsonType: "array",
              items: {
                oneOf: [
                  { $ref: "#/$defs/paragraphBlock" },
                  { $ref: "#/$defs/listBlock" }
                ]
              }
            }
          }
        },

        sectionBase: {
          bsonType: "object",
          required: ["id", "type", "enabled", "order", "backgroundTone", "data"],
          properties: {
            id: { bsonType: "string" },
            type: { bsonType: "string" },
            enabled: { bsonType: "bool" },
            order: { bsonType: ["int", "long", "double", "decimal"] },
            backgroundTone: { enum: ["light", "dark"] },
            data: { bsonType: "object" }
          }
        },

        fact: {
          bsonType: "object",
          required: ["id", "label", "value"],
          additionalProperties: false,
          properties: {
            id: { bsonType: "string" },
            label: { bsonType: "string" },
            value: {
              bsonType: "array",
              items: { $ref: "#/$defs/inlineNode" }
            }
          }
        },

        heroSection: {
          bsonType: "object",
          required: ["id", "type", "enabled", "order", "backgroundTone", "data"],
          additionalProperties: false,
          properties: {
            id: { enum: ["hero"] },
            type: { enum: ["hero"] },
            enabled: { bsonType: "bool" },
            order: { bsonType: ["int", "long", "double", "decimal"] },
            backgroundTone: { enum: ["light", "dark"] },
            data: {
              bsonType: "object",
              required: ["title", "image"],
              additionalProperties: false,
              properties: {
                title: { bsonType: "string" },
                image: { $ref: "#/$defs/image" }
              }
            }
          }
        },

        aboutSection: {
          bsonType: "object",
          required: ["id", "type", "enabled", "order", "backgroundTone", "data"],
          additionalProperties: false,
          properties: {
            id: { enum: ["about"] },
            type: { enum: ["about"] },
            enabled: { bsonType: "bool" },
            order: { bsonType: ["int", "long", "double", "decimal"] },
            backgroundTone: { enum: ["light", "dark"] },
            data: {
              bsonType: "object",
              required: ["aboutTour", "tourInfo"],
              additionalProperties: false,
              properties: {
                aboutTour: {
                  bsonType: "object",
                  required: ["title", "text"],
                  additionalProperties: false,
                  properties: {
                    title: { bsonType: "string" },
                    text: {
                      bsonType: "object",
                      required: ["paragraphs"],
                      additionalProperties: false,
                      properties: {
                        paragraphs: {
                          bsonType: "array",
                          items: { bsonType: "string" }
                        }
                      }
                    }
                  }
                },
                tourInfo: {
                  bsonType: "object",
                  required: ["title", "facts", "details"],
                  additionalProperties: false,
                  properties: {
                    title: { bsonType: "string" },
                    facts: {
                      bsonType: "array",
                      items: { $ref: "#/$defs/fact" }
                    },
                    details: {
                      bsonType: "object",
                      required: ["summary", "content"],
                      additionalProperties: false,
                      properties: {
                        summary: { bsonType: "string" },
                        content: {
                          bsonType: "array",
                          items: {
                            oneOf: [
                              { $ref: "#/$defs/paragraphBlock" },
                              { $ref: "#/$defs/listBlock" }
                            ]
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },

        programDay: {
          bsonType: "object",
          required: ["id", "title", "photos", "description"],
          additionalProperties: false,
          properties: {
            id: { bsonType: "string" },
            title: { bsonType: "string" },
            photos: {
              bsonType: "array",
              items: { $ref: "#/$defs/image" }
            },
            description: { $ref: "#/$defs/richTextDocument" }
          }
        },

        programSection: {
          bsonType: "object",
          required: ["id", "type", "enabled", "order", "backgroundTone", "data"],
          additionalProperties: false,
          properties: {
            id: { enum: ["program"] },
            type: { enum: ["program"] },
            enabled: { bsonType: "bool" },
            order: { bsonType: ["int", "long", "double", "decimal"] },
            backgroundTone: { enum: ["light", "dark"] },
            data: {
              bsonType: "object",
              required: ["title", "subtitle", "preface", "days"],
              additionalProperties: false,
              properties: {
                title: { bsonType: "string" },
                subtitle: { bsonType: "string" },
                preface: {
                  bsonType: "object",
                  required: ["paragraphs"],
                  additionalProperties: false,
                  properties: {
                    paragraphs: {
                      bsonType: "array",
                      items: { bsonType: "string" }
                    }
                  }
                },
                days: {
                  bsonType: "array",
                  items: { $ref: "#/$defs/programDay" }
                }
              }
            }
          }
        },

        gallerySection: {
          bsonType: "object",
          required: ["id", "type", "enabled", "order", "backgroundTone", "data"],
          additionalProperties: false,
          properties: {
            id: { enum: ["gallery"] },
            type: { enum: ["gallery"] },
            enabled: { bsonType: "bool" },
            order: { bsonType: ["int", "long", "double", "decimal"] },
            backgroundTone: { enum: ["light", "dark"] },
            data: {
              bsonType: "object",
              required: ["title", "photos"],
              additionalProperties: false,
              properties: {
                title: { bsonType: "string" },
                photos: {
                  bsonType: "array",
                  items: { $ref: "#/$defs/image" }
                }
              }
            }
          }
        },

        accordionItem: {
          bsonType: "object",
          required: ["id", "summary", "content"],
          additionalProperties: false,
          properties: {
            id: { bsonType: "string" },
            summary: { bsonType: "string" },
            content: { $ref: "#/$defs/richTextDocument" }
          }
        },

        accordionGroupSection: {
          bsonType: "object",
          required: ["id", "type", "enabled", "order", "backgroundTone", "data"],
          additionalProperties: false,
          properties: {
            id: { enum: ["accordionGroup"] },
            type: { enum: ["accordionGroup"] },
            enabled: { bsonType: "bool" },
            order: { bsonType: ["int", "long", "double", "decimal"] },
            backgroundTone: { enum: ["light", "dark"] },
            data: {
              bsonType: "object",
              required: ["title", "items"],
              additionalProperties: false,
              properties: {
                title: { bsonType: "string" },
                items: {
                  bsonType: "array",
                  items: { $ref: "#/$defs/accordionItem" }
                }
              }
            }
          }
        },

        ctaFormSection: {
          bsonType: "object",
          required: ["id", "type", "enabled", "order", "backgroundTone", "data"],
          additionalProperties: false,
          properties: {
            id: { enum: ["cta"] },
            type: { enum: ["ctaForm"] },
            enabled: { bsonType: "bool" },
            order: { bsonType: ["int", "long", "double", "decimal"] },
            backgroundTone: { enum: ["light", "dark"] },
            data: {
              bsonType: "object",
              required: ["title", "subtitle", "buttonText", "successMessage", "image"],
              additionalProperties: false,
              properties: {
                title: { bsonType: "string" },
                subtitle: { bsonType: "string" },
                buttonText: { bsonType: "string" },
                successMessage: { bsonType: "string" },
                image: { $ref: "#/$defs/image" }
              }
            }
          }
        },

        noteSection: {
          bsonType: "object",
          required: ["id", "type", "enabled", "order", "backgroundTone", "data"],
          additionalProperties: false,
          properties: {
            id: { enum: ["note"] },
            type: { enum: ["note"] },
            enabled: { bsonType: "bool" },
            order: { bsonType: ["int", "long", "double", "decimal"] },
            backgroundTone: { enum: ["light", "dark"] },
            data: {
              bsonType: "object",
              required: ["title", "content", "appearance"],
              additionalProperties: false,
              properties: {
                title: { bsonType: "string" },
                content: { $ref: "#/$defs/richTextDocument" },
                appearance: {
                  bsonType: "object",
                  required: ["colorScheme", "titleAlign", "contentAlign", "width"],
                  additionalProperties: false,
                  properties: {
                    colorScheme: {
                      enum: ["default", "inverted", "accent", "muted"]
                    },
                    titleAlign: {
                      enum: ["left", "center", "right"]
                    },
                    contentAlign: {
                      enum: ["left", "center", "right"]
                    },
                    width: {
                      enum: ["narrow", "normal", "wide"]
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
})