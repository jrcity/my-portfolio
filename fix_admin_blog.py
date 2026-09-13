import re

filepath = 'src/app/admin/blog/page.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add TiptapEditor import
if "import { TiptapEditor }" not in content:
    content = content.replace("import type { AdminPost } from '@/lib/blog'", "import type { AdminPost } from '@/lib/blog'\nimport { TiptapEditor } from '@/(components)/ui/TiptapEditor'")

# Replace the textarea for content with the TiptapEditor
old_textarea = """                  <textarea
                    value={editor.content}
                    onChange={(e) => setEditor({ ...editor, content: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 min-h-[300px] font-mono text-sm"
                    placeholder="Markdown content..."
                  />"""
                  
new_editor = """                  <TiptapEditor
                    content={editor.content}
                    onChange={(content) => setEditor({ ...editor, content })}
                  />"""

content = content.replace(old_textarea, new_editor)

with open(filepath, 'w') as f:
    f.write(content)

print("Updated admin blog to use TiptapEditor")
