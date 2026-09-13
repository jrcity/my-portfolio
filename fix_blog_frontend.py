import re

filepath = 'src/app/blog/[slug]/page.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# The content is probably rendered in a div with dangerouslySetInnerHTML
old_div = "dangerouslySetInnerHTML={{ __html: post.contentHtml }}"
if old_div in content:
    # Let's find the class of that div
    # It might be <div dangerouslySetInnerHTML... /> or <article className="..."> <div dangerouslySetInnerHTML />
    # Let's just find the exact line and ensure it has prose class
    lines = content.split('\\n')
    for i, line in enumerate(lines):
        if old_div in line:
            if 'className="' in line:
                lines[i] = re.sub(r'className="([^"]+)"', r'className="\1 prose dark:prose-invert max-w-none"', line)
            else:
                lines[i] = line.replace("<div", '<div className="prose dark:prose-invert max-w-none"')
            break
    
    with open(filepath, 'w') as f:
        f.write('\\n'.join(lines))
    print("Added prose class to blog post rendering")
else:
    print("Could not find dangerouslySetInnerHTML")
