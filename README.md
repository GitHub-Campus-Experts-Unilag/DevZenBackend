# GCE Hacktoberfest 1.0 DevZen.

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

### CONTRIBUTION GUIDELINES
****
* You can only be assigned one issue at a time, in case of multiple request, only one will be granted and the other be deleted
* before you start, check if there is any issue in your environment.
* if you come across an issue from somewhere other than your scope, comment it on the issue
* Make a **new branch** for the contribution assigned to you
* When creating a **new branch** follow this pattern:
  * fixing a bug: *`fix/<name-of-fix>`*
  * building a feature: *`feat/<name-of-feature>`*
  * refactoring a component: *`refactor/<name-of-component>`*
  * maintenance task: *`chore/<name-of-task>`*
  * updating docs: *`docs/<context>`*
* Never commit directly into the *`main`* branch, start a review process.
* To start a review process, follow these steps:
  * create a PR moving changes from *`your-branch`* to the *`main`* branch
  * add the issue your changes relate with to the PR, i.e *`Fixes #34`* (where *`#34`* is the issue being addressed)
  * request a review from *`@coded1guy`*
  * a response will be sent to your PR:
      * if it is not approved, problems and/or fixes will be communicated
      * if it is approved, your branch will be merged
  * at the end of the review process the branch will be deleted.
* Do not work beyond the scope of the issue assigned

NB: **Confirm that the packages you are need are not already registered in the package.json file before installing them, and take care to know when they are dev dependencies or not!**
