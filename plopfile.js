// eslint-disable-next-line @typescript-eslint/no-var-requires
const toCamelCase = require('lodash/camelCase');

module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Add component',
    prompts: [
      {
        type: 'list',
        name: 'directory',
        message: 'Please choose a directory',
        choices: ['commons', 'create a new one'],
      },
      {
        type: 'input',
        name: 'newDirectory',
        message: 'Please enter a directory name',
        when: (answers) => answers.directory === 'create a new one',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Please enter component name',
      },
    ],
    actions: (data) => {
      const directoryName = toCamelCase(
        data?.newDirectory ? data.newDirectory : data?.directory
      );

      const actionsList = [
        {
          type: 'add',
          path: `src/components/${directoryName}/{{pascalCase name}}/{{pascalCase name}}.tsx`,
          templateFile: 'plop/components/component.hbs',
        },
        {
          type: 'add',
          path: `src/components/${directoryName}/{{pascalCase name}}/index.ts`,
          templateFile: 'plop/components/index.hbs',
        },
      ];

      return actionsList;
    },
  });
};
