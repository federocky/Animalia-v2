import { Request, Response } from 'express';

class Ficticia {

    //GET devuelve todo /photos
    public async index(req: Request, res: Response) {
    }

    //GET devuelve todo /photos/create
    public async create(req: Request, res: Response) {
        
    }

    //POST guarda una foto en la bbdd /photos
    public async store(req: Request, res: Response) {
        
    }

    //GET devuelve una foto /photos/:id
    public async show(req: Request, res: Response) {
        
    }

    //GET lleva a una pagina para editar esa foto /photos/:id/edit
    public async edit(req: Request, res: Response) {
        
    }

    //PUT guarda el resultado de la edicion /photos/:id
    public async update(req: Request, res: Response) {
        
    }

    //DELETE elimina esa foto /photos/:id
    public async destroy(req: Request, res: Response) {
        
    }
}