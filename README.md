# hook_ionic_copy_android_notification_icons
Cordova / ionic before build hook - Copy push notification icons to platform/android/res

## Needed npm packages
- Lodash : `npm install lodash` <a href="https://www.npmjs.com/package/lodash" target="_blank">(https://www.npmjs.com/package/lodash)</a>
- mkdirp : `npm isntall mkdirp` <a href="https://www.npmjs.com/package/mkdirp" target="_blank">(https://www.npmjs.com/package/mkdirp)</a>

## Installation
Create a `before_build` folder in `/hooks` directory

Download and paste `010_copy_android_notification_icons.js` file in `before_build` directory.

## Generate icon
Generate your notification icons with this <a href="http://romannurik.github.io/AndroidAssetStudio/icons-notification.html" target="_blank">web app</a> <a href="https://github.com/romannurik/AndroidAssetStudio" target="_blank">(view on github)</a>

This tool generates this tree folders
```
res
----| drawable-hdpi
--------| ic_stat_notify.png
----| drawable-mdpi
--------| ic_stat_notify.png
----| drawable-xhdpi
--------| ic_stat_notify.png
----| drawable-xxhdpi
--------| ic_stat_notify.png
----| drawable-xxxhdpi
--------| ic_stat_notify.png
```
## Set project variables
Replace this placeholder with your own path.
```
let androidPlatformResDir = "PATH_TO_YOUR_ANDROID_PLATFORM"; // default: platforms/android/res/
let srcIconDir = "PATH_TO_YOUr_ICONS"; // res/
let iconName = "YOUR_NOTIFICATION_ICON_NAME.EXT"; // ic_stat_notify.png
```

## build
run `ionic build android`
