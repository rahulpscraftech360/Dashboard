const { app, BrowserWindow, ipcMain } = require("electron");
const { exec } = require("child_process");

const { shell } = require("electron");
const path = require("path");
const appPath = path.join("C:/Program Files/CCleaner/CCleaner64.exe");
function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      webSecurity: false, // disable security restrictions (https://github.com/nathanbuchar/electron-react-redux-boilerplate/issues/9)
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.cjs"), // Correctly reference preload.js
    },
  });
  win.webContents.openDevTools(), win.loadURL("http://localhost:5173/");
}

function openHollowKnight() {
  shell
    .openPath(appPath)
    .then((result) => {
      if (result) {
        console.error("Error opening the path:", result);
      } else {
        console.log("Hollow Knight opened successfully");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

app.whenReady().then(createWindow);
//added for open the external app//
// Listen for an "open-app" message from the renderer process
ipcMain.on("open-app", (event, command) => {
  // const command = `"C:\\Program Files\\CCleaner\\CCleaner64.exe"`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error opening CCleaner: ${error}`);
      return;
    }
    console.log(`Standard Output: ${stdout}`);
    console.log("CCleaner opened successfully");
    console.log(`stdout: ${stdout}`);
    if (stderr) {
      console.error(`Standard Error: ${stderr}`);
    }
  });
});

//added for open the external app up to this line//
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// const { app, BrowserWindow, ipcMain } = require("electron");
// const { exec } = require("child_process");
// const log = require("electron-log");
// const { default: path } = require("path");
// preload: path.resolve('./preload.js/preload.js'),

// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1920,
//     height: 1080,
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//       contextIsolation: true,
//       webSecurity: false,
//       nodeIntegration: true,
//     },
//   });

//   win.webContents.openDevTools();
//   win.loadURL("http://localhost:5173/");
// }

// app.whenReady().then(createWindow);

// // Listen for an "open-app" message from the renderer process
// ipcMain.on("open-ccleaner", (event, arg) => {
//   const command = `"C:\\Program Files\\CCleaner\\CCleaner64.exe"`;
//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       log.error(`Error opening CCleaner: ${error}`);
//       return;
//     }
//     log.info("CCleaner opened successfully");
//     if (stdout) log.info(`stdout: ${stdout}`);
//     if (stderr) log.error(`stderr: ${stderr}`);
//   });
// });

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// app.on("activate", () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });
