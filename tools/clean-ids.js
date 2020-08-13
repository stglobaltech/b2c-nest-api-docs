const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const cleanField = async ({
  field = '"id": "',
  fileName = "NO_NAME",
  type = "COLLECTION",
}) => {
  const _collectionSuffix = "postman_collection";
  const _environmentSuffix = "postman_environment";

  let _fileSuffix, _filePath;
  switch (type) {
    case "COLLECTION":
      _fileSuffix = _collectionSuffix;
      _filePath = "collections";
      break;

    case "ENVIRONMENT":
      _fileSuffix = _environmentSuffix;
      _filePath = "environments";
      break;

    default:
      break;
  }

  const fileUrl = `./${_filePath}/${fileName}.${_fileSuffix}.json`;

  const data = await readFileAsync(fileUrl, { encoding: "utf-8" }).catch(
    (err) => {
      console.log("❌ readFileAsync", fileUrl, err);

      return Promise.reject(`${fileUrl} - File Read failed`);
    }
  );

  // convert file data in an array
  let dataArray = data.split("\n");

  // we are looking for a line, contains, key word 'searchKeyword' in the file
  const searchKeyword = field;

  for (let index = 0; index < dataArray.length; index++) {
    // check if a line contains the 'searchKeyword' keyword
    if (dataArray[index].includes(searchKeyword)) {
      dataArray.splice(index, 1);
    }

    if (
      type === "COLLECTION" &&
      dataArray[index].includes('"_postman_id": "')
    ) {
      dataArray.splice(index, 1);
    }
  }

  // UPDATE FILE WITH NEW DATA
  const updatedData = dataArray.join("\n");

  const writeStatus = await writeFileAsync(fileUrl, updatedData)
    .then(() => true)
    .catch((err) => {
      console.log("❌ writeFileAsync", fileUrl, err);

      return Promise.reject(`${fileUrl} File Write failed`);
    });

  // console.log('✅ File WriteStatus', fileUrl, writeStatus);

  return `${fileUrl} ${writeStatus}`;
};

module.exports = {
  cleanField,
};
