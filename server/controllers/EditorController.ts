const fs = require("fs");
// const path = require("path");

const filePath = "public/data/editor.json";
class Editor {
  save(editors) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(editors), (err, data) => {
        if (err) {
          reject(err);
        } else {
          setTimeout(() => {
            resolve(data);
          }, 1500);
        }
      });
    });
  }
  getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, function (err, data) {
        if (err) {
          reject(err);
        } else {
          setTimeout(() => {
            resolve(JSON.parse(data));
          }, 3000);
        }
      });
    });
  }
}
export const EditorController = new Editor();
