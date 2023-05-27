const { createLogger, format, transports } = require('winston');



module.exports = createLogger({
    transports: 
        new transports.File({
            level: 'error',
            filename: 'logs/filelog-error.log',
            json: true,
            format:format.combine(
                format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                format.align(),
                format.printf(error => `${error.level}: ${[error.timestamp]}: ${error.message}`),
            )
        }),
    })