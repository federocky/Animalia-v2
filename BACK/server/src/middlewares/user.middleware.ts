import { Request, Response, NextFunction } from 'express';

export const userValidation = (req: Request, res: Response, next: NextFunction) => {

    //TODO: meter alguna validación mas telefono

console.log('aqui qui');

    let errors = new Array();

    const {name, surname, email, active, phone} = req.body;

    if( !name ) errors.push('name is required');
    else if(name.length < 3) errors.push('name must be at least 3 chars');

    if( !surname ) errors.push('surname is required');
    else if(surname.length < 3) errors.push('surname must be at least 3 chars');

    if( !email ) errors.push('email is required');
    else if(!validateEmail(email)) errors.push('email not valid');

    if( !active ) errors.push('active is required');
    else if(typeof active != 'boolean') errors.push('active must be a boolean value')


    if( !phone ) errors.push('phone is required');


    if(errors.length > 0) return res.status(400).json({ok: false, errors});

    next();

}

function validateEmail(email: string) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) return true
    return false
}

