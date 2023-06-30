# System Biletowy Mera

## Table of Contents

- [Technologies Used](#technologies-used)
- [Naming Convention](#naming-convention)
- [Directory Structure](#directory-structure)
- [Install project](#install-project)
- [How to use plop to generate components](#how-to-use-plop-to-generate-components)

## Technologies Used

- Next.js
- React Query
- Zustand
- TailwindCSS

## Naming Convention

We will use a **PascalCase**. Names in pascal case start with a capital letter. In case of the names with multiple words, all words will start with capital letters.

Here are some examples of pascal case: `FirstName` and `LastName`.

## Directory Structure

- `src/components` - folder with the all components
- `src/constants` - folder with additional settings
- `src/pages` - folder with the all pages
- `src/styles` - folder with the global styles
- `locales` - folder with the namespaces files
- `.env.example` - configuration file

## Prerequisites

- [Install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Install yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

## Install project

1. Clone repository
2. Run `yarn` to install project dependencies.
3. Make copy of `.env.example` file with name `.env.local` (e.g. by executing command `cp .env.example .env.local`)
4. Open .env file and edit api url (prefix `API_BASE_URL`)
5. Run `yarn dev` to run dev server or `yarn build` for production purposes.

## How to use plop to generate components

1. Run `yarn plop` to run plop cli.
2. Choose `commons` or `create a new one`.
3. If `create a new one` was selected type name of new folder for components.
4. Type name of new component.
