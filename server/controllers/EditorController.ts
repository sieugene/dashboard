const fs = require("fs");
const path = require("path");

class Editor {
  save(editors) {
    const filePath = path.join("public", "data", "editor.json");
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
    const filePath = path.join("public", "data", "editor.json");
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, function (err, data) {
        if (err) {
          reject(err);
        }
        setTimeout(() => {
          resolve(JSON.parse(data));
        }, 3000);
      });
    });
  }
}
export const EditorController = new Editor();
