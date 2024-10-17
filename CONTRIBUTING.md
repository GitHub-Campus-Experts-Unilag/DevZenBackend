# CONTRIBUTION GUIDELINES

### Requesting for issues

---

- Read the `README.md` and the `CONTRIBUTING.md` file to understand what is expected of you.
- Read and understand the scope of the `issue` and ask questions if you don't understand anything.
- You can only be assigned one `issue` at a time, in case of multiple request, only one will be granted and the other request be deleted or ignored.
- Once you're sure you want to attempt an `issue`, request for it by commenting your interest under the it.
- Only request to be assigned an `issue` if no one has been assigned to it.

<br />

### Working on an issue

---

- Fork the repo.
- Create a branch for an `issue` assigned to you following this pattern:
  - fixing a bug: `fix/<name-of-fix>`
  - building a feature: `feat/<name-of-feature>`
  - refactoring a component: `refactor/<name-of-component>`
  - maintenance task: `chore/<name-of-task>`
  - updating docs: `docs/<context>`
  - Do not commit directly into the `main` branch.
- Check if there is any problem in your environment, if there is communicate it to us.
- if you come across an issue from somewhere other than your scope, comment it on the `issue`.
- Start working on the `issue` taking the scope very serious.

NB: **Confirm that the packages you need are not already registered in the package.json file before installing them, and take care to know when they are dev dependencies or not!**

<br />

### Project's file system

---

- You most likely won't be touching the `core` or the `app` folder.
- Understanding the folder structure in the `features` folder:
  - `models` folder: all models owned by the feature should be stored here.
  - `services` folder: all business logic functions (controllers) for the feature is stored here.
  - `routes` folder: all routes for the feature is stored here.
  - `listeners` folder: all event listeners for the feature are stored here.
  - `utils` folder: all utility functions, input schemas for the feature are stored here.
  - `tests` folder: all unit test files for the feature are stored here.

Note:

- Only `models`, `routes` and `listeners` should be exported from a feature folder. If there is need to export any other utility or function or data and it can't be stored in the `common` folder, it should be exported via a `{feature}.module.ts` file.
- Store general folders or files in the `common` folder using the same structure above.

<br />

### Starting a review process

---

- Create a PR moving changes from `your-branch` on your `forked_repo_name` repo to the `main` branch on the `DevZenBackend` repo.
- Add the issue, your changes relates with, to the PR, i.e `Fixes #34` (where `#34` is the issue being addressed)
- request a review from `@coded1guy`
- a response will be sent to your PR:
  - if it is not approved, problems and/or fixes will be communicated
  - if it is approved, your branch will be merged
  - at the end of the review process the branch will be deleted.
- Please and please again, do not work beyond the scope of the issue assigned
