# GCE Backend Template

GCE Backend cohort template to used in every project except
in wierd cases.

****

## SETUP

### 1. Clone project

```git
  git clone git@github.com:GitHub-Campus-Experts-Unilag/backend_template.git
```

### 2. Install dependencies

```markdown
  🍕. npm install  
  🦄. bun install 
  
  install bun here https://bun.sh/
```

### 3. Create environment files and file them correctly

```bash
  cp .env.example .env
```

### 4. Start project [dev mode]

```bash
  npm run start:dev
```

### Start project [prod]

```bash
  npm run start:prod
```

****

## Project Structure

```markdown
src\
 |--feature\         # Folder for working on particular feature eg (payments, auth, posts, comments,)
    |-- services\    # Business logic (service layer)
    |-- routes\      # Routes
    |-- listener\    # Event listeners for this feature.
 |-- Common\         # modules used by all services 
 |-- Core\           # libraries of modules.
 |-- App\            # Application layer logic
 |--main.ts        # App entry point
```

### GUIDELINES

****

* When creating *new branch* if you're fixing a bug or implementing a feature follow this pattern
  * fixing: *`fix/<name-of-fix>`*
  * feature: *`feat/<name-of-feature>`*
* Never commit directly into the *`main`* branch.
