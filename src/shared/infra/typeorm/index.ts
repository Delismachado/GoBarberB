import db from '@config/db';
import { createConnections } from 'typeorm';

async function connect(): Promise<void> {
    const connections = await createConnections(db);
    connections.forEach(c => c.runMigrations());
}

export default connect;