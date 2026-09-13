import re

filepath = 'src/constants/projects.ts'
with open(filepath, 'r') as f:
    content = f.read()

# Replace image paths for each project
content = re.sub(r"(id:\s*'pp-001'.*?image:\s*)'[^']+'", r"\1'/images/support24.jpg'", content, flags=re.DOTALL)
content = re.sub(r"(id:\s*'pp-002'.*?image:\s*)'[^']+'", r"\1'/images/cashworx.jpg'", content, flags=re.DOTALL)
content = re.sub(r"(id:\s*'pp-003'.*?image:\s*)'[^']+'", r"\1'/images/jollivry.jpg'", content, flags=re.DOTALL)
content = re.sub(r"(id:\s*'pp-004'.*?image:\s*)'[^']+'", r"\1'/images/snapshop.jpg'", content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)

print("Updated project images")
