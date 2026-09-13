import re

filepath = 'tailwind.config.js'
with open(filepath, 'r') as f:
    content = f.read()

if "require('@tailwindcss/typography')" not in content:
    content = content.replace("plugins: [", "plugins: [\n    require('@tailwindcss/typography'),")
    with open(filepath, 'w') as f:
        f.write(content)
    print("Added typography plugin to tailwind.config.js")
