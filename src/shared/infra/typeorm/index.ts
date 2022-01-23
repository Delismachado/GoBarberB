import { createConnections, createConnection } from 'typeorm';

async function connect(): Promise<void> {
    if (process.env.DATABASE_URL) {
        const connections = await createConnections([{
            name: "default",
            type: "postgres",
            url: process.env.DATABASE_URL,
            synchronize: false,
            logging: false,
            ssl: { rejectUnauthorized: false },
            entities: [
                "./dist/modules/**/infra/typeorm/entities/*.js"
            ],
            migrations: [
                "./dist/shared/infra/typeorm/migrations/*.js"
            ],
            cli: {
                migrationsDir: "./dist/shared/infra/typeorm/migrations"
            }
        }]);
        connections.forEach(c => c.runMigrations());
    } else {
        createConnections();
    }
}

export default connect;