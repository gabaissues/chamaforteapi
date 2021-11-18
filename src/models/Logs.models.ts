import { ILog } from '../interfaces/Logs.interfaces';
import LogsSchemas from '../schemas/Logs.schemas';

import LogsService from "../services/Logs.services";

export default class LogsModal extends LogsService {
    public async getAll() {

        const logs = await LogsSchemas.find()
        return logs

    }
    public async create(options: ILog) {

        const log = await new LogsSchemas(options).save()
        return log

    }

    public async deleteOne(id: string) {

        await LogsSchemas.deleteOne({ id })

    }
}