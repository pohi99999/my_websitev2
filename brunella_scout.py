import os
import json

def scan_project_for_rescue(root_dir):
    report = {
        "structure": [],
        "gitignore_content": None,
        "package_json": None,
        "suspicious_large_dirs": []
    }
    
    # 1. Keressük a bűnöst (.gitignore)
    if os.path.exists(os.path.join(root_dir, '.gitignore')):
        with open(os.path.join(root_dir, '.gitignore'), 'r') as f:
            report['gitignore_content'] = f.read()
            
    # 2. Függőségek ellenőrzése
    if os.path.exists(os.path.join(root_dir, 'package.json')):
         with open(os.path.join(root_dir, 'package.json'), 'r') as f:
            try:
                report['package_json'] = json.load(f)
            except:
                report['package_json'] = "Error reading json"

    # 3. Mappa szkennelés (csak a méret és struktúra miatt)
    for root, dirs, files in os.walk(root_dir):
        # Ha találunk node_modules-t vagy .next-et, feljegyezzük, de nem megyünk bele mélyen
        if 'node_modules' in dirs:
            report['suspicious_large_dirs'].append(os.path.join(root, 'node_modules'))
            dirs.remove('node_modules') 
        if '.next' in dirs:
            report['suspicious_large_dirs'].append(os.path.join(root, '.next'))
            dirs.remove('.next')
        if '.git' in dirs:
            dirs.remove('.git')
            
        relative_path = os.path.relpath(root, root_dir)
        report['structure'].append({
            "path": relative_path,
            "files": files
        })

    return report

if __name__ == "__main__":
    print("Brunella Rescue: Weboldal állapotfelmérése...")
    data = scan_project_for_rescue('.')
    
    with open('brunella_web_rescue.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
        
    print("KÉSZ. Töltsd fel a 'brunella_web_rescue.json' fájlt a chatbe!")