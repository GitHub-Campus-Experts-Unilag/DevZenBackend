# GCE Hacktoberfest 1.0 DevZen.

---

## What are we building?

DevZen your go to application/tool for most of your Development work. The main aim of this is to create a tool that can help you automate some of your tasks. Thank you for deciding to contribute to this 🎉
Here is the [figma link](https://www.figma.com/design/KEtyU67tfnDrIgxVuj9Hyw/DevZen?node-id=55-437&t=kg7kZEbCaRpb0lWN-1)

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

---

## Project Structure

```markdown
src\
 |--feature\ # Folder for working on particular feature eg (payments, auth, posts, comments,)
|-- services\ # Business logic (service layer)
|-- routes\ # Routes
|-- listeners\ # Event listeners for this feature.
|-- models\ # Models owned by that feature.
|-- utils\ # utility functions, schemas, enums only used by the feature
|-- Common\ # modules used by all services
|-- Core\ # libraries of modules.
|-- App\ # Application layer logic
|--main.ts # App entry point
```
