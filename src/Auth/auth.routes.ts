import { Request, Response } from 'express';
import { Post } from '../routes';
import { signupController } from './auth.controller';
import { SignupBodyModel } from './schema/signup.schema';

export class AuthRoutes {

    constructor() {
        this.signup.bind(this);
    }

    /** 
     * @swagger
     * /auth/signup:
     *  post:
     *      tags: 
     *      - Auth
     *      description: Authenticatio routes are here,
     *      requestBody:
     *          description: Signup portal for *fan* and *talent*
     *          required: true
     *          content:
     *              application/json:
     *                  schema: 
     *                      $ref: '#/components/schemas/SignupBodyUser'
     *      responses:
     *          201:
     *              description: created
     *              content:
     *                  application/json:
     *                      schema: 
     *                          $ref: '#/components/schemas/SignupResponseSchema'
     *          400:
     *              description: Bad Request Exception
     *              content:
     *                  application/json:
     *                      schema:
     *                         $ref: '#/components/schemas/BadRequestResponseSchema'
     *          409:
     *              description: Conflict
     *              content:
     *                  application/json:
     *                      schema:
     *                         $ref: '#/components/schemas/ConflictResponseSchema'
     */
    @Post("/auth/signup")
    async signup(req: Request, res: Response) {
        const userInfo = <SignupBodyModel>req.body;

        const user = await signupController(userInfo);
        res.status(201).json(user);
    };


}