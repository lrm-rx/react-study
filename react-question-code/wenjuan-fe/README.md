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


npm husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
git commit -m "chore: Keep calm and commit"

// 这里除了chore之外, 还有;
[
	'build',
	'chore',
	'ci',
	'docs',
	'feat',
	'fix',
	'perf',
	'refactor',
	'revert',
	'style',
	'test',
]

```