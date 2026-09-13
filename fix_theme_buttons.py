import re

# 1. Fix globals.css
filepath = 'src/app/globals.css'
with open(filepath, 'r') as f:
    css = f.read()

css = css.replace(
    "@apply bg-white text-black hover:bg-gray-200 shadow-lg hover:shadow-xl border border-transparent transition-all duration-500 ease-out;",
    "@apply bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 shadow-lg hover:shadow-xl border border-transparent transition-all duration-500 ease-out;"
)

css = css.replace(
    "@apply border border-white/20 hover:bg-white/10 hover:border-white/40 text-white transition-all duration-300 backdrop-blur-sm shadow-sm;",
    "@apply border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/40 dark:hover:border-white/40 text-black dark:text-white transition-all duration-300 backdrop-blur-sm shadow-sm;"
)

with open(filepath, 'w') as f:
    f.write(css)

# 2. Fix project-card.tsx sloppy replacement
filepath = 'src/(components)/project-card.tsx'
with open(filepath, 'r') as f:
    ts = f.read()

ts = ts.replace(
    "bg-white text-black hover:bg-gray-200 text-white rounded-lg",
    "btn-primary rounded-lg"
)

# Also fix the default background for images
ts = ts.replace(
    "bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20",
    "bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 backdrop-blur-sm hover:bg-black/10 dark:hover:bg-white/20"
)

with open(filepath, 'w') as f:
    f.write(ts)

# 3. Check for any other hardcoded bg-white text-black in components and fix them to be theme aware
import glob
files = glob.glob('src/**/*.tsx', recursive=True)
for fpath in files:
    with open(fpath, 'r') as f:
        content = f.read()
    
    # Fix contact form button which got 'bg-white text-black'
    if 'bg-white text-black hover:bg-gray-200' in content:
        content = content.replace(
            "bg-white text-black hover:bg-gray-200", 
            "bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
        )
        with open(fpath, 'w') as f:
            f.write(content)
            
    # Fix social links which got 'bg-white/10 border border-white/20'
    with open(fpath, 'r') as f:
        content = f.read()
        
    if 'bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20' in content and 'bg-black/5' not in content:
        content = content.replace(
            "bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20",
            "bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 backdrop-blur-sm hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white"
        )
        with open(fpath, 'w') as f:
            f.write(content)

print("Fixed theme buttons!")
