from pathlib import Path

path = Path(r"src/pages/WorkPage.tsx")
text = path.read_text()
text = text.replace("import { useState, useRef } from 'react'\n", "import { useRef } from 'react'\n", 1)
project_interface = "interface Project {\n  id: number\n  title: string\n  company: string\n  role: string\n  period: string\n  category: string\n  impact: string[]\n  technologies: string[]\n  description: string\n  metrics?: {\n    label: string\n    value: string\n    color: string\n  }[]\n}\n\n"
text = text.replace(project_interface, '', 1)
start = text.find("const projects: Project[] = [")
if start != -1:
    end = text.find("const getCategoryStyles", start)
    if end != -1:
        text = text[:start] + text[end:]
    else:
        raise SystemExit('Could not find getCategoryStyles after projects array')
else:
    raise SystemExit('Could not find projects array')
get_category_block = "const getCategoryStyles = (category: string) => {\n    if (category.includes('Government')) return 'bg-renaissance-gold/10 text-renaissance-gold'\n    if (category.includes('Technology')) return 'bg-renaissance-blue/10 text-renaissance-blue'\n    if (category.includes('Education')) return 'bg-renaissance-green/10 text-renaissance-green'\n    return 'bg-renaissance-brown/10 text-renaissance-brown'\n  }\n\n"
text = text.replace(get_category_block, '', 1)
start = text.find("      {/* Projects Grid */}")
if start != -1:
    end = text.find("      {/* Call to Action */}", start)
    if end != -1:
        text = text[:start] + text[end:]
    else:
        raise SystemExit('Could not find Call to Action comment after Projects Grid')
else:
    raise SystemExit('Could not find Projects Grid comment')
path.write_text(text)
