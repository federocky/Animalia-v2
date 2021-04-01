import { Request, Response, NextFunction } from 'express';


export const addressValidation = (req: Request, res: Response, next: NextFunction) => {

    //TODO: meter alguna validación 


    let errors = new Array();

    const {street_name, street_number, province, locality, town, postcode} = req.body;

    if( !street_name ) errors.push('street_name is required');
    else if(street_name.length < 3) errors.push('street_name must be at least 3 chars long');

    if( !street_number ) errors.push('street_number is required');

    if( !province ) errors.push('province is required');

    if( !locality ) errors.push('locality is required');

    if( !town ) errors.push('town is required');

    if( !postcode ) errors.push('postcode is required');
    else if(typeof postcode != 'number') errors.push('postcode must be a number');
    else if( !/[0-9]{5}/.test(postcode.toString()) ) errors.push('postcode must be five numbers');


    if(errors.length > 0) return res.status(400).json({ok: false, errors});

    next();

}