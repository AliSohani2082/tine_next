// pages/example.tsx

import fs from 'fs';
import path from 'path';
import { GetStaticProps } from 'next';
var __html = require("@/docs/hierarchical.html")
var template = { __html: __html }

interface ExampleProps {
  htmlContent: string;
}

const Example: React.FC<ExampleProps> = ({ htmlContent }) => {
  // Function to render HTML content safely
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <div dangerouslySetInnerHTML={createMarkup(htmlContent)} />
  );
}

export const getStaticProps: GetStaticProps<ExampleProps> = async () => {
  const filePath = path.join(process.cwd(), 'public', 'example.html');
  const htmlContent = fs.readFileSync(filePath, 'utf-8');

  return {
    props: {
      htmlContent,
    },
  };
}

export default Example;
