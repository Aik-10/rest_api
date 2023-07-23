import { Logger } from 'tslog';

export const LoggerLevel = {
    Debug: 'debug',
    Info: 'info',
    Warn: 'warn',
    Error: 'error',
} as const;

export type LoggerLevels = typeof LoggerLevel[keyof typeof LoggerLevel];

const LoggerLevelMap: Record<LoggerLevels, number> = {
    debug: 2,
    info: 3,
    warn: 4,
    error: 5,
};

export const logger = new Logger({
    prettyLogTemplate: '[{{dateIsoStr}}] [{{logLevelName}}] - ',
});

export const setLoggerMinLevel = (level: LoggerLevels): void => {
    logger.settings.minLevel = LoggerLevelMap[level];
}
