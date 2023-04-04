if [[ `git status --porcelain` ]]; then
  git config user.name "github-actions[bot]"
  git config user.email "github-actions[bot]@users.noreply.github.com"
  git add comandos.txt
  git commit -m "🤖 extracted messages"
  git push
  exit 0
fi