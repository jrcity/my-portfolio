import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: './prisma/schema.prisma',
  // The CLI (db push / migrate) uses the direct connection string —
  // not the pooled one — so it bypasses PgBouncer for DDL commands.
  datasource: {
    url: env('DIRECT_URL'),
  },
})
