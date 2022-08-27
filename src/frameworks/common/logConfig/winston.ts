import appRootPath  from 'app-root-path';

import  { createLogger, format, transports } from 'winston';

export const Winston = createLogger({

    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(error => `[${error.timestamp}] - ${error.level} - ${error.message}`)
    ),

    transports: [
    
        new transports.File(({
            level: 'error',
            handleExceptions: true,
            maxsize: 5120000,
            maxFiles: 5,
            filename: `${appRootPath}/log/app.log`,
        })),
    ]
});
