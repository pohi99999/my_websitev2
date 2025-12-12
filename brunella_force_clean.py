import os
import shutil
import stat

# BRUNELLA FORCE CLEAN v2.0 (Windows Path Fixer)

def remove_readonly(func, path, excinfo):
    os.chmod(path, stat.S_IWRITE)
    func(path)

def force_clean():
    root_dir = os.getcwd()
    print(f"🚨 BRUTE FORCE CLEANING: {root_dir}")

    # Ezeket a mappákat TELJESEN törölni kell, mert blokkolják a Gitet
    folders_to_kill = [
        '.netlify',
        '.tmp.driveupload',
        '.vs',
        'test-results',
        'node_modules', # Ha véletlenül itt maradt
        '.next'
    ]

    for folder in folders_to_kill:
        path = os.path.join(root_dir, folder)
        if os.path.exists(path):
            print(f"🔥 Megsemmisítés: {path} ...")
            try:
                # Speciális Windows törlés hosszú útvonalakhoz
                shutil.rmtree(path, onerror=remove_readonly)
                print("   ✅ Sikerült.")
            except Exception as e:
                print(f"   ⚠️ Hiba (Próbáld manuálisan törölni!): {e}")

    # Ellenőrizzük, hogy a .gitignore tartalmazza-e ezeket
    gitignore_path = os.path.join(root_dir, '.gitignore')
    required_ignores = ['.netlify', '.vs', 'test-results', '.tmp.driveupload']
    
    current_content = ""
    if os.path.exists(gitignore_path):
        with open(gitignore_path, 'r', encoding='utf-8') as f:
            current_content = f.read()
    
    with open(gitignore_path, 'a', encoding='utf-8') as f:
        for item in required_ignores:
            if item not in current_content:
                f.write(f"\n{item}")
                print(f"🛡️ Hozzáadva a .gitignore-hoz: {item}")

    print("\n🏁 Kész! Most próbáld újra a Git parancsokat!")

if __name__ == "__main__":
    force_clean()