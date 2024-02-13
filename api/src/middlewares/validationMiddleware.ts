import { ObjectSchema, ValidationError } from "yup";

export const validateMiddleware = (schema: ObjectSchema<any>) => (req: any, res: any, next: any) => {
    try {
        req.body = schema.validateSync(req.body, { abortEarly: false, stripUnknown: true });
        next();
    } catch (e) {
        const error = e as ValidationError;
        return res.status(422).json({ errors: error.errors });
    }
}