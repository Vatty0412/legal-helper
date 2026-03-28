import { app } from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';

async function bootstrap() {
	await connectDb();
	app.listen(env.port, () => {
		logger.info(`Backend listening on port ${env.port}`);
	});
}

bootstrap().catch(error => {
	logger.error('Startup failure', { error });
	process.exit(1);
});
