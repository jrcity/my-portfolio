import re

filepath = 'src/(components)/hero.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add useScroll and useTransform to framer-motion import
content = content.replace("import { motion } from 'framer-motion'", "import { motion, useScroll, useTransform } from 'framer-motion'")

# Add useScroll hook inside Hero component
scroll_hook = """  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
"""
content = content.replace("  const [isCVPickerOpen, setIsCVPickerOpen] = useState(false)", "  const [isCVPickerOpen, setIsCVPickerOpen] = useState(false)\n" + scroll_hook)

# Apply parallax to the main content container
content = content.replace(
    '          <motion.div\n            initial={{ opacity: 0, y: 50 }}\n            animate={{ opacity: 1, y: 0 }}\n            transition={{ duration: 0.8 }}\n            className="space-y-8"\n          >',
    '          <motion.div\n            initial={{ opacity: 0, y: 50 }}\n            animate={{ opacity: 1, y: 0 }}\n            transition={{ duration: 0.8 }}\n            style={{ y: y1, opacity }}\n            className="space-y-8"\n          >'
)

with open(filepath, 'w') as f:
    f.write(content)

print("Added parallax to Hero")
