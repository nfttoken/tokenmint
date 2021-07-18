import fs from 'fs-extra';
import chalk from 'chalk';

fs.copy('build/contracts/', 'src/contracts/', err => {
  if (err) return console.log(chalk.red(err)); // eslint-disable-line no-console
  console.log(chalk.green("All contracts copied from build to src/contracts and ready!")); // eslint-disable-line no-console
});
