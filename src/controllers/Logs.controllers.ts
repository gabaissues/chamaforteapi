import { Request, Response } from 'express'

import LogsModal from "../models/Logs.models";
const modal = new LogsModal()

export default class LogsController {
    public async listen(req: Request, res: Response) {

        const logs = await modal.getAll()
        res.status(200).json(logs)

    }

    public async create(req: Request, res: Response) {

        const log = await modal.create(req.body)
        res.status(200).send({ message: 'LOG criado com sucesso.', log: log })

    }

    public delete(req: Request, res: Response) {

        modal.deleteOne(req.params.id)
        res.status(200).send({ message: 'LOG deletado com sucesso.' })

    }
}