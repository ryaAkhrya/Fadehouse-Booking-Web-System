import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required.");
}

// Create a serverless stateless HTTP connection to Neon.
// We use the HTTP driver because Vercel/serverless environments benefit from it, 
// and our complex transactions (like capacity locking) are handled safely 
// inside PostgreSQL RPC functions in a single query.
export const sql = neon(process.env.DATABASE_URL);
