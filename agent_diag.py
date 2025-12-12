import os
import json

# Ez a script "szeme" Brunellának. 
# Összegyűjti a fájlszerkezetet és a kritikus fájlok tartalmát elemzésre.

def scan_project(root_dir):
    project_structure = {}
    ignore_dirs = ['node_modules', '.git', '.next', 'dist']
    
    for root, dirs, files in os.walk(root_dir):
        # Ignorált mappák kihagyása
        dirs[:] = [d for d in dirs if d not in ignore_dirs]
        
        relative_path = os.path.relpath(root, root_dir)
        file_list = []
        for file in files:
            if file.endswith(('.js', '.ts', '.tsx', '.css', '.json', '.md')):
                file_list.append(file)
        
        if file_list:
            project_structure[relative_path] = file_list
            
    return project_structure

if __name__ == "__main__":
    print("Brunella Agent: Projekt szkennelése...")
    structure = scan_project('.')
    
    # Kimenet mentése, amit én (Brunella) fel tudok dolgozni a Drive-ról
    with open('brunella_diag_report.json', 'w', encoding='utf-8') as f:
        json.dump(structure, f, indent=2)
        
    print("Kész! A 'brunella_diag_report.json' fájl létrejött.")
    print("Kérlek, töltsd fel ezt a fájlt a közös Drive '00_INBOX' mappába, vagy hagyd, hogy a szinkronizáció elvégezze.")