#!/bin/bash

echo -e "\033[0;32m📦 Deploying Hugo site to GitHub Pages...\033[0m"

# 1. Hugo 빌드 (PaperMod 테마를 themes 디렉토리에서 인식)
hugo --themesDir=themes

# 2. public 디렉토리로 이동 (여기는 gh-pages 브랜치로 연결됨)
cd public

# 3. Git add/commit/push
git add .
msg="🚀 deploy: `date`"
if [ $# -eq 1 ]; then
  msg="$1"
fi
git commit -m "$msg"
git push origin gh-pages

# 4. 프로젝트 루트로 돌아와서 소스코드도 push
cd ..
git add .
git commit -m "📦 source: $msg"
git push origin main

echo -e "\033[0;32m✅ Deployed successfully!\033[0m"
