import re

filepath = 'src/lib/prisma.ts'
with open(filepath, 'r') as f:
    content = f.read()

# Replace the hardcoded URL with just process.env.DATABASE_URL
content = content.replace(
    'const url = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_x8ZoHyptQIi1@ep-royal-voice-ampgvera-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require"',
    'const url = process.env.DATABASE_URL'
)

# And if there's any type narrowing issue with 'url' being undefined string, we can add a fallback or throw error
new_creation = """  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL is not set')
  }"""
content = content.replace('const url = process.env.DATABASE_URL', new_creation)

with open(filepath, 'w') as f:
    f.write(content)

print("Stripped hardcoded DB URL")
