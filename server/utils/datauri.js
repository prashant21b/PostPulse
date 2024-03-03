

const path = require('path');
const fs = require('fs');

const getDataUri = (file) => {
  if (!file || !file.originalname || !file.path) {
    return null; 
  }

  const extName = path.extname(file.originalname).toString();
  const fileData = fs.readFileSync(file.path);
  const dataUri = `data:${extName};base64,${fileData.toString('base64')}`;
  return dataUri;
};

module.exports = {
  getDataUri,
};

