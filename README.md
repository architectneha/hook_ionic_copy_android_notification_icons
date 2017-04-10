# hook_ionic_copy_android_notification_icons
Cordova / ionic before build hook - Copy push notification icons to platform/android/res

## Needed npm packages
- Lodash : `npm isntall lodash` (https://www.npmjs.com/package/lodash)
- mkdirp : `npm isntall mkdirp` (https://www.npmjs.com/package/mkdirp)

## Installation
Create a `before_build` folder in `/hooks` directory

Download and paste `010_copy_android_notification_icons.js` file in `before_build` directory.

## Generate icon
Generate your notifications icons with this web app : http://romannurik.github.io/AndroidAssetStudio/icons-notification.htm (https://github.com/romannurik/AndroidAssetStudio)

Or generate them with your own way.

## Set project variable
Replace this placeholder.
```
let androidPlatformResDir = "PATH_TO_YOUR_ANDROID_PLATFORM"; // default: platforms/android/res/
let srcIconDir = "PATH_TO_YOU_ICONS"; // src/androidNotificationIcons/
let iconName = "YOUR_NOTIFICATION_ICON_NAME.EXT"; // ic_stat_notify.png
```

## build
run `ionic build android`
