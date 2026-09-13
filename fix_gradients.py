import os
import glob

# Walk through all tsx/ts/css files
files = glob.glob('src/**/*.tsx', recursive=True) + \
        glob.glob('src/**/*.ts', recursive=True) + \
        glob.glob('src/**/*.css', recursive=True)

# Replacements to make them more professional (sleek dark mode)

# 1. Primary Button in globals.css
btn_primary_old = "bg-gradient-to-br from-purple-600 via-fuchsia-600 to-blue-600 hover:from-purple-500 hover:via-fuchsia-500 hover:to-blue-500 text-white shadow-[0_0_20px] shadow-purple-500/40 hover:shadow-[0_0_30px] hover:shadow-purple-500/60 border border-white/10"
btn_primary_new = "bg-white text-black hover:bg-gray-200 shadow-lg hover:shadow-xl border border-transparent"

# 2. Icon backgrounds and secondary elements
icon_old_1 = "bg-gradient-to-br from-purple-600 to-blue-600"
icon_new_1 = "bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20"

icon_old_2 = "bg-gradient-to-r from-purple-500 to-blue-500"
icon_new_2 = "bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20"

icon_old_3 = "bg-gradient-to-r from-purple-600 to-indigo-600"
icon_new_3 = "bg-white text-black hover:bg-gray-200"

icon_old_4 = "bg-gradient-to-r from-purple-600 to-blue-600"
icon_new_4 = "bg-white/10 border border-white/20 backdrop-blur-sm text-white"

# 3. Cards
card_old_1 = "bg-gradient-to-br from-gray-800/50 to-gray-900/50"
card_new_1 = "bg-black/40 backdrop-blur-md"

# 4. Contact form submit button
contact_btn_old = "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/25"
contact_btn_new = "bg-white text-black hover:bg-gray-200 shadow-lg transition-colors"

replacements = [
    (btn_primary_old, btn_primary_new),
    (icon_old_1, icon_new_1),
    (icon_old_2, icon_new_2),
    (icon_old_3, icon_new_3),
    (icon_old_4, icon_new_4),
    (card_old_1, card_new_1),
    (contact_btn_old, contact_btn_new),
]

for filepath in files:
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            
        original_content = content
        
        for old, new in replacements:
            content = content.replace(old, new)
            
        if content != original_content:
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"Updated {filepath}")
    except Exception as e:
        print(f"Failed {filepath}: {e}")

print("Done updating backgrounds.")
