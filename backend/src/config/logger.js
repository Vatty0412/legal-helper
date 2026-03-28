import winston from 'winston';

const { combine, timestamp, errors, json, colorize, printf } = winston.format;

const consoleFormat = printf(
	({ level, message, timestamp: ts, stack, ...meta }) => {
		const metaText =
			Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
		return `${ts} [${level}] ${stack || message}${metaText}`;
	},
);

export const logger = winston.createLogger({
	level: process.env.LOG_LEVEL || 'info',
	format: combine(timestamp(), errors({ stack: true }), json()),
	transports: [new winston.transports.File({ filename: 'logs/app.log' })],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: combine(
				colorize(),
				timestamp(),
				errors({ stack: true }),
				consoleFormat,
			),
		}),
	);
}
