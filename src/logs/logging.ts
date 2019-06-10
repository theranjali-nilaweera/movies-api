import * as winston from 'winston';
import {Logger} from 'winston';
const { createLogger, format } = winston;

const {combine, timestamp, label, printf, splat} = format;

const logFormat = printf((info) => {
    return `${info.timestamp} : ${info.message}`;
});

export const createLog = (logLabel: string): Logger => {
    return createLogger({
        format:
            combine(
                timestamp(),
                splat(),
                logFormat,
            )
        ,
        transports: [
            new winston.transports.Console(),
        ],
    });
};
