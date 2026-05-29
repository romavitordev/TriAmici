import { config } from '../src/config/index.js';
import { connectDB, disconnectDB } from '../src/database/sqlserver.js';
import { ensureAdmin } from '../src/repositories/adminRepository.js';
async function main() {
    await connectDB();
    await ensureAdmin(config.admin.email, config.admin.senhaInicial);
    console.log(`Admin pronto: ${config.admin.email}`);
    await disconnectDB();
}
main().catch(async (error) => {
    console.error(error);
    await disconnectDB();
    process.exit(1);
});
