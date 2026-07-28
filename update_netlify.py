with open("netlify.toml", "r") as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if "publish = \".next\"" in line:
        continue
    if "NODE_VERSION = \"18\"" in line:
        new_lines.append(line.replace("18", "20"))
    else:
        new_lines.append(line)

with open("netlify.toml", "w") as f:
    f.writelines(new_lines)
