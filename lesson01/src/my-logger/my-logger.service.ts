import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
    async logToFile(entry: string) {
        const formattedEntry = `${Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Asia/Kolkata',
        }).format(new Date())}\t${entry}\n`;

        try {
            if(!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
                await fs.promises.mkdir(path.join(__dirname, '..', '..', 'logs'));
            }
            await fs.promises.appendFile(path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'), formattedEntry);
        } catch (err) {
            console.error('Failed to write log entry to file:', err.message);
        }
    }

    log(message: any, context?: string) {
        const entry = `${context}\t${message}`;
        this.logToFile(entry);
        super.log(message, context);
    }

    error(message: any, stackOrContext?: string) {
        const entry = `${stackOrContext}\t${message}`;
        this.logToFile(entry);
        super.error(message, stackOrContext);
    }
}
