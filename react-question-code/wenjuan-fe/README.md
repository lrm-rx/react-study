# husky 代码提交
Edit package.json > prepare script and run it once:
``` javascript
npm pkg set scripts.prepare="husky install"
npm run prepare
```

Add a hook:
``` javascript
npx husky add .husky/pre-commit "npm run lint"
npx husky add .husky/pre-commit "npm run format"
npx husky add .husky/pre-commit "git add ."
git add .husky/pre-commit
```

Make a commit:
``` javascript
git commit -m "Keep calm and commit"
# `npm test` will run every time you commit

git push origin master
```