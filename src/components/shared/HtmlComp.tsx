import React from 'react';
import fs from 'fs';


type HtmlComponentProps = {
  dir: fs.PathOrFileDescriptor;
}

const HtmlComponent: React.FC<HtmlComponentProps> = ({ dir }) => {
  const htmlContent = fs.readFileSync(dir, 'utf-8');
  return (
    <div className='w-full h-full relative'>
      <iframe srcDoc={htmlContent} className='w-full h-full fixed left-20' />
    </div>
  );
};

export default HtmlComponent;
