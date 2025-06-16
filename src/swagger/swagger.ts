import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "authentication API",
      version: "1.0.0",
      description: "Documentation for the authentication API",
    },
    paths: {
      "/auth/signup": {
        post: {
          summary: "Create a user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    USEC_MAIL: {
                      type: "string",
                      description: "The user's email address",
                    },
                    USEC_PASSWORD: {
                      type: "string",
                      description: "The user's password",
                    },
                    USEC_FNAME: {
                      type: "string",
                      description: "The user's first name",
                    },
                    USEC_LNAME: {
                      type: "string",
                      description: "The user's last name",
                    },
                    USED_BIRTH: {
                      type: "string",
                      format: "date",
                      description: "The user's birthdate",
                    },
                    USEC_TYPE: {
                      type: "string",
                      description: "The user's type (e.g., admin, user)",
                    },
                  },
                  required: [
                    "USEC_MAIL",
                    "USEC_PASSWORD",
                    "USEC_FNAME",
                    "USEC_LNAME",
                    "USED_BIRTH",
                    "USEC_TYPE",
                  ],
                },
              },
            },
          },
          responses: {
            "201": {
              description: "User successfully created",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        description: "Confirmation message",
                      },
                      user: {
                        type: "object",
                        properties: {
                          USEC_MAIL: {
                            type: "string",
                          },
                          USEC_FNAME: {
                            type: "string",
                          },
                          USEC_LNAME: {
                            type: "string",
                          },
                          USED_BIRTH: {
                            type: "string",
                            format: "date",
                          },
                          USEC_TYPE: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Error during registration",
            },
          },
        },
      },
      "/auth/signin": {
        post: {
          summary: "Connect a user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    USEC_MAIL: {
                      type: "string",
                      description: "The user's email address",
                    },
                    USEC_PASSWORD: {
                      type: "string",
                      description: "The user's password",
                    },
                  },
                  required: ["USEC_MAIL", "USEC_PASSWORD"],
                },
              },
            },
          },
          responses: {
            "201": {
              description: "User successfully connected",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        description: "Confirmation message",
                      },
                      user: {
                        type: "object",
                        properties: {
                          USEC_MAIL: {
                            type: "string",
                          },
                          USEC_FNAME: {
                            type: "string",
                          },
                          USEC_LNAME: {
                            type: "string",
                          },
                          USED_BIRTH: {
                            type: "string",
                            format: "date",
                          },
                          USEC_TYPE: {
                            type: "string",
                          },
                        },
                      },
                      token: {
                        type: "string",
                        description: "the JWT token for authentication",
                      },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Error during connection",
            },
          },
        },
      },
      "/auth/invitetenant": {
        post: {
          summary: "Invite a tenant",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    OWNER_NAME: {
                      type: "string",
                      description: "The owner's name",
                    },
                    USEC_MAIL: {
                      type: "string",
                      description: "The tenant's email address",
                    },
                    ADDRESS: {
                      type: "string",
                      description: "address of the futur tenant",
                    },
                  },
                  required: ["OWNER_NAME", "USEC_MAIL", "ADDRESS"],
                },
              },
            },
          },
          responses: {
            "201": {
              description: "User successfully created",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        description: "Confirmation message",
                      },
                      user: {
                        type: "object",
                        properties: {
                          USEC_MAIL: {
                            type: "string",
                          },
                          USEC_TYPE: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Error during registration",
            },
          },
        },
      },
      "/access/check": {
        post: {
          summary: "Check access rights",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      description: "the JWT token for authentication",
                    },
                    rightName: {
                      type: "string",
                      description: "The name of the right",
                    },
                  },
                  required: ["token", "rightName"],
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Access granted",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        description: "Confirmation message",
                      },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Error during access check",
            },
            "403": {
              description: "Access denied",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        description: "refused access message",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.ts"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export default swaggerSpec;
