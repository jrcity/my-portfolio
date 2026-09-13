import re

filepath = 'src/app/admin/blog/page.tsx'
with open(filepath, 'r') as f:
    content = f.read()

old_textarea = """              <Field label="Content" hint="markdown">
                <textarea
                  value={editor.content}
                  onChange={(e) => setEditor({ ...editor, content: e.target.value })}
                  rows={16}
                  placeholder={'## A section heading\\n\\nWrite your markdown content here...'}
                  className={inputClass}
                />
              </Field>"""

new_editor = """              <Field label="Content">
                <TiptapEditor
                  content={editor.content}
                  onChange={(content) => setEditor({ ...editor, content })}
                />
              </Field>"""

content = content.replace(old_textarea, new_editor)

with open(filepath, 'w') as f:
    f.write(content)

print("Replaced textarea successfully")
