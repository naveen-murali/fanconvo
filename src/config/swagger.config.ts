import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import { BASER_ENDPOINT, ModesModel } from '../common';
import { RoleTypes } from '../Models';

export let swaggerDocs: Options;

export const setupSwagger = () => {
    swaggerDocs = swaggerJSDoc({
        swaggerDefinition: {
            openapi: "3.0.2",
            info: {
                title: "Fanconvo APIs",
                version: "1.0.0"
            },
            servers: [
                {
                    url: `${process.env.HOST_URL}${BASER_ENDPOINT}`,
                }
            ],
            "tags": [
                {
                    "name": "Auth",
                    "description": "All the authentication routes are here."
                }
            ],
            components: {
                schemas: {
                    SignupBodyUser: {
                        type: "object",
                        properties: {
                            firstName: {
                                type: "string",
                                example: "naveen"
                            },
                            lastName: {
                                type: "string",
                                example: "murali"
                            },
                            username: {
                                type: "string",
                                example: "naveen-murali"
                            },
                            email: {
                                type: "string",
                                example: "naveen@gmail.com"
                            },
                            timezone: {
                                type: "string",
                                example: "Asia/Kolkata"
                            },
                            role: {
                                type: "string",
                                enum: [RoleTypes.FAN, RoleTypes.TALENT],
                                example: RoleTypes.FAN
                            },
                            password: {
                                type: "string",
                                example: "password"
                            },
                        }
                    },
                    SignupResponseSchema: {
                        allOf: [
                            {
                                type: "object",
                                properties: {
                                    _id: {
                                        type: "string",
                                        example: "627b86f46c10a206895b423f"
                                    },
                                    createAt: {
                                        type: "string",
                                        example: "2022-05-11T09:50:44.618Z"
                                    },
                                    updateAt: {
                                        type: "string",
                                        example: "2022-05-11T09:50:44.618Z"
                                    },
                                }
                            },
                            {
                                $ref: "#/components/schemas/SignupBodyUser"
                            },
                        ]
                    },
                    CommenExceptionSchema: {
                        type: "object",
                        description: "**message**: **type of the exception** <br> **error**: **containes detailed error descriptions in an array**",
                        properties: {
                            message: { type: "string" },
                            error: { type: "array" }
                        }
                    },
                    ConflictResponseSchema: {
                        allOf: [
                            {
                                $ref: "#/components/schemas/CommenExceptionSchema"
                            },
                            {
                                type: "object",
                                description: "**message**: **Conflict** <br> **error**: **[ containes detailed error descriptions in an array ]**",
                                properties: {
                                    message: { example: "Conflict" },
                                    error: { example: ["Credentials are already in use"] }
                                }
                            },
                        ]
                    },
                    BadRequestResponseSchema: {
                        allOf: [
                            {
                                $ref: "#/components/schemas/CommenExceptionSchema"
                            },
                            {
                                type: "object",
                                description: "**message**: **Bad Request Exception** <br> **error**: **containes detailed error descriptions in an array**",
                                properties: {
                                    message: { example: "Bad Request Exception" },
                                    error: {
                                        example: [
                                            "username is required",
                                            "email is required"
                                        ]
                                    }
                                }
                            },
                        ]
                    },
                }
            }
        },
        apis: process.env.NODE_ENV === ModesModel.DEV ? ["src/Auth/auth.routes.ts"] : ["build/Auth/auth.routes.js"]
    });
};