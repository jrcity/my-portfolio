import re

filepath = 'src/lib/blog.ts'
with open(filepath, 'r') as f:
    content = f.read()

old_remark = "const processed = await remark().use(html).process(post.content)"
new_remark = """
    let contentHtml = post.content
    // If it doesn't look like HTML from TipTap, it might be old markdown
    if (!post.content.trim().startsWith('<')) {
      const processed = await remark().use(html).process(post.content)
      contentHtml = processed.toString()
    }
"""

content = content.replace(old_remark, new_remark)
content = content.replace("contentHtml: processed.toString(),", "contentHtml,")

with open(filepath, 'w') as f:
    f.write(content)

print("Updated blog.ts to support both HTML and Markdown")
