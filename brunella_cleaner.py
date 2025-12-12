import os
import shutil

# BRUNELLA CLEANER v1.0
# Cél: A projekt megtisztítása a "szeméttől" és a Next.js szabványosítása.

def clean_project():
    root_dir = os.getcwd()
    print(f"🧹 Takarítás indítása itt: {root_dir}")

    # 1. Fájlok, amiket AZONNAL törlünk (Telepítők, szemetek)
    trash_files = [
        'gh_2.83.1_windows_amd64.msi',
        'GoogleCloudSDKInstaller.exe',
        'google-chrome-stable_current_amd64.deb',
        'desktop.ini',
        'package-lock.json', # Újrageneráljuk tisztán
        'yarn.lock'
    ]

    for file in trash_files:
        if os.path.exists(file):
            try:
                os.remove(file)
                print(f"✅ Törölve: {file}")
            except Exception as e:
                print(f"⚠️ Nem sikerült törölni: {file} ({e})")

    # 2. Médiafájlok mozgatása a 'public' mappába (hogy működjön a weboldal)
    public_dir = os.path.join(root_dir, 'public')
    if not os.path.exists(public_dir):
        os.makedirs(public_dir)
        print("✅ 'public' mappa létrehozva.")

    media_files = ['1.mp4', '2.mp4', '1.jpg', '2.jpg', '3.jpg']
    for media in media_files:
        if os.path.exists(media):
            try:
                shutil.move(media, os.path.join(public_dir, media))
                print(f"📦 Átmozgatva a public-ba: {media}")
            except Exception as e:
                print(f"⚠️ Hiba a mozgatásnál: {media} ({e})")

    # 3. A TÖKÉLETES .gitignore létrehozása
    gitignore_content = """
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build
/dist

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local Env Files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Large Media (ha nem kell a repoba, de most hagyjuk, mert a publicban vannak)
# *.mp4

# System Files
Thumbs.db
desktop.ini
"""
    with open('.gitignore', 'w', encoding='utf-8') as f:
        f.write(gitignore_content)
    print("🛡️ Új, golyóálló .gitignore létrehozva.")

    print("\n🎉 KÉSZ! A projekt tiszta. Most futtasd a Git parancsokat!")

if __name__ == "__main__":
    clean_project()