#!/usr/bin/env node

"use strict";

let _ = require("lodash");
let fs = require("fs");
let path = require("path");
let mkdirp = require("mkdirp");

let rootdir = process.argv[2];

let androidPlatformResDir = "PATH_TO_YOUR_ANDROID_PLATFORM"; // default: platforms/android/res/
let srcIconDir = "PATH_TO_YOU_ICONS"; // src/androidNotificationIcons/
let iconName = "YOUR_NOTIFICATION_ICON_NAME.EXT"; // ic_stat_notify.png

let resolutionFolder = [
  "drawable-hdpi",
  "drawable-mdpi",
  "drawable-xhdpi",
  "drawable-xxhdpi",
  "drawable-xxxhdpi"
];

/**
 * Create e directory from a string path
 * @param  {String} dirPath Path of directory who will be checked
 * @return {Promise}  Return a resolved promise if directory is successfully created (reject if not)
 */
function createDir(dirPath){
  return new Promise((resolve, reject) => {
    mkdirp(dirPath, (err) => {
      if (err){
        reject(err);
      }
      else{
        resolve(dirPath);
      }
    });
  });
}

/**
 * Check if path exist
 * @param  {String} path Path who will be checked
 * @return {Promise}  Return a resolved promise with path if exist. Rejected if not.
 */
function pathExists(path){
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if(err && !stats){
        reject(err);
      }
      else if(err && stats){
        reject(err);
      }
      else{
        resolve(path);
      }
    });
  });
}

/**
 * Check if folder exist. If not, create it.
 * @param  {String} dir Path of direcotry who will be tested.
 * @return {Promise}  return a resolved promise with dir path.
 */
function findOrCreateDir(dir){
  // check if destination folder exist.
  return pathExists(dir)
  .catch(
    () => {
      // If directory not exit, we create it
      return createDir(dir);
    }
  );
}

/**
 * Copy file to destination. If destination folder not exist, this method will be create it.
 * @param  {String} srcFilePath  [Path of element who will be copied]
 * @param  {String} destFilePath [Destination files]
 * @return {Promise}  [Return a resolved promise if copy is successfully done.]
 */
function copyFileTo(srcFilePath, destFilePath){
  let destdir = path.dirname(destFilePath);
  // check if source file exist
  return pathExists(srcFilePath)
  .then(
    () => {
      return findOrCreateDir(destdir);
    }
  )
  .then(
    () => {
      // return a promise who execute stream copy.
      return new Promise((resolve, reject) => {
        var writeStream = fs.createWriteStream(destFilePath);
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
        fs.createReadStream(srcFilePath).pipe(writeStream);
      });
    }
  );
}


process.stdout.write("----------------------------------------------------");
process.stdout.write("| Hook 010_copy_android_notification_icons : START |");
process.stdout.write("---------------------------------------------------- \r\n");

// Check if "platforms/android/res/" exist
pathExists(androidPlatformResDir)
.then(
  () => {
    let promises = [];
    _.forEach(resolutionFolder, (resolution) => {
      let srcFile = path.join(rootdir, srcIconDir + resolution + "/" + iconName);
      let destFile = path.join(rootdir, androidPlatformResDir + resolution + "/" + iconName);
      promises.push(copyFileTo(srcFile, destFile));
    });

    return Promise.all(promises);
  }
)
.then(
  () => {
    process.stdout.write("------------------------------------------------------");
    process.stdout.write("| Hook 010_copy_android_notification_icons : SUCCESS | \r\n");
    process.stdout.write("------------------------------------------------------ \r\n");
  }
)
.catch(
  (err) => {
    process.stdout.write("---------------------------------------------------- \r\n");
    process.stdout.write("| Hook 010_copy_android_notification_icons : ERROR | \r\n");
    process.stdout.write(err);
    process.stdout.write("---------------------------------------------------- \r\n");
    process.exit(1);
  }
);
