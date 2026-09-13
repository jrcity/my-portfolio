import re

filepath = 'src/app/admin/blog/page.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Replace the textarea with TiptapEditor
new_editor = """                  <TiptapEditor
                    content={editor.content}
                    onChange={(content) => setEditor({ ...editor, content })}
                  />"""

content = re.sub(
    r'<textarea[^>]+value=\{editor\.content\}[^>]+/>',
    new_editor,
    content,
    flags=re.DOTALL
)

with open(filepath, 'w') as f:
    f.write(content)

print("Replaced textarea with TiptapEditor")
