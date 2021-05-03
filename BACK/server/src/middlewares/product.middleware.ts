import { Request, Response, NextFunction } from 'express';


export const productValidation = (req: Request, res: Response, next: NextFunction) => {


    let errors = new Array();

    const {name, description, price, brand, stock, category_id, provider_id, img, active} = req.body;

    if( !name ) errors.push('name is required');
    else if(name.length < 3) errors.push('name must be at least 3 chars long');

    if( !description ) errors.push('description is required');

    if( !price ) errors.push('price is required');
    else if(typeof price != 'number') errors.push('price must be a number'); 
    else if(price <= 0 ) errors.push('price must higher than cero'); 

    if( !brand ) errors.push('brand is required');

    if( !stock ) errors.push('stock is required');
    else if(typeof stock != 'number') errors.push('stock must be a number'); 
    else if(stock <= 0 ) errors.push('stock must higher than cero'); 

    if( !category_id ) errors.push('category_id is required');
    else if(typeof category_id != 'number') errors.push('category_id must be a number'); 
    else if(category_id <= 0 ) errors.push('category_id must higher than cero'); 

    if( !provider_id ) errors.push('provider_id is required');
    else if(typeof provider_id != 'number') errors.push('provider_id must be a number'); 
    else if(provider_id <= 0 ) errors.push('provider_id must higher than cero'); 

    if(!img) errors.push('img is required');

    if(errors.length > 0) return res.status(400).json({ok: false, errors});

    next();

}