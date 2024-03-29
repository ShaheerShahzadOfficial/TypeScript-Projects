import chalk from 'chalk';
import inquirer from 'inquirer';

const countCharactersAndWords = (paragraph: string) => {
  const noWhitespaceParagraph = paragraph.replace(/\s/g, "")
  const characterCount = noWhitespaceParagraph.length;
  const wordCount = paragraph.split(/\s/g).length;
  return { characterCount, wordCount };
};

async function main() {
  const answer = await inquirer.prompt({
    type: 'input',
    name: 'paragraph',
    message: 'Enter a paragraph:',
  });
  const { paragraph } = answer;
  const { characterCount, wordCount } = countCharactersAndWords(paragraph);

  console.log(chalk.gray(`Character count without whitespaces: `), chalk.greenBright(characterCount));
  console.log(chalk.gray(`Word count without whitespaces: `), chalk.greenBright(wordCount));
}

main();
