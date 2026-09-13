import re

filepath = 'src/app/globals.css'
with open(filepath, 'r') as f:
    content = f.read()

old_outline = "@apply border border-purple-500/40 hover:bg-purple-500/10 hover:border-purple-500/60 shadow-[inset_0_0_10px] shadow-purple-500/10 hover:shadow-[inset_0_0_20px] hover:shadow-purple-500/20 transition-all duration-300 backdrop-blur-sm;"
new_outline = "@apply border border-white/20 hover:bg-white/10 hover:border-white/40 text-white transition-all duration-300 backdrop-blur-sm shadow-sm;"

content = content.replace(old_outline, new_outline)

with open(filepath, 'w') as f:
    f.write(content)

print("Replaced btn-outline")
