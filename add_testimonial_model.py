import re

filepath = 'prisma/schema.prisma'
with open(filepath, 'r') as f:
    content = f.read()

testimonial_model = """
model Testimonial {
  id        String   @id @default(cuid())
  name      String
  role      String?
  company   String?
  message   String
  approved  Boolean  @default(false)
  createdAt DateTime @default(now())
}
"""

if "model Testimonial" not in content:
    with open(filepath, 'a') as f:
        f.write(testimonial_model)

print("Added Testimonial model")
