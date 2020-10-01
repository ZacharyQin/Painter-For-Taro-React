import Taro from "@tarojs/taro";

export const isValidUrl = (url) => {
  return /(ht|f)tp(s?):\/\/([^ \\/]*\.)+[^ \\/]*(:[0-9]+)?\/?/.test(url);
}

/**
 * 深度对比两个对象是否一致
 * from: https://github.com/epoberezkin/fast-deep-equal
 * @param  {Object} a 对象a
 * @param  {Object} b 对象b
 * @return {Boolean}   是否相同
 */
/* eslint-disable */
export const equal = (a, b) => {
  if (a === b) return true;

  if (a && b && typeof a == "object" && typeof b == "object") {
    var arrA = Array.isArray(a),
      arrB = Array.isArray(b),
      i,
      length,
      key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; ) if (!equal(a[i], b[i])) return false;
      return true;
    }

    if (arrA != arrB) return false;

    var dateA = a instanceof Date,
      dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();

    var regexpA = a instanceof RegExp,
      regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();

    var keys = Object.keys(a);
    length = keys.length;

    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0; ) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return a !== a && b !== b;
}
/**
 * @description: 获取设备权限
 * @param {string} scope 需要获取权限的 scope
 * @return: Promise<boolean>
 */
export const getAuthSetting = (scope: string): Promise<boolean> => {
  return new Promise(resolve => {
    return Taro.authorize({
      scope
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
};

/**
 * @description: 保存图片到系统相册
 * @param {string} imgUrl 图片url
 * @return: Promise<boolean>
 */
export const saveImageToPhotosAlbum = (imgUrl: string): Promise<boolean> => {
  return new Promise((resolve, rejecet) => {
    return Taro.saveImageToPhotosAlbum({ filePath: imgUrl })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        rejecet(false);
      });
  });
};

const saveImageToPhotos= (posterImagePath)=>{
  saveImageToPhotosAlbum(posterImagePath)
    .then(() => {
      // 成功保存图片到本地相册
      // 保存失败
      Taro.showToast({
        title: "保存成功",
        icon: "none"
      });
    })
    .catch(() => {
      // 保存失败
      Taro.showToast({
        title: "保存失败",
        icon: "none"
      });
    });
};

// 保存图片到本地相册
export const saveImage= (imgPath) => {
  const scope = "scope.writePhotosAlbum";
  getAuthSetting(scope).then((res: boolean) => {
    if (res) {
      // 授权过 直接保存
      saveImageToPhotos(imgPath);
      return false;
    }
    // 未授权过 先获取权限
    getAuthSetting(scope).then((status: boolean) => {
      if (status) {
        // 获取保存图片到相册权限成功
        saveImageToPhotos(imgPath);
        return false;
      }
      // 用户拒绝授权后的回调 获取权限失败
      Taro.showModal({
        title: "提示",
        content: "若不打开授权，则无法将图片保存在相册中！",
        showCancel: true,
        cancelText: "暂不授权",
        cancelColor: "#000000",
        confirmText: "去授权",
        confirmColor: "#3CC51F",
        success: function(e) {
          if (e.confirm) {
            // 用户点击去授权
            Taro.openSetting({
              //调起客户端小程序设置界面，返回用户设置的操作结果。
            });
          } else {
            //
          }
        }
      });
    });
  });
}

export const ossGif2Png= (filePath)=>{
  const tail = '?x-oss-process=image/format,png';
    if(filePath.indexOf('.gif') != -1 || filePath.indexOf('.GIF') != -1){
      return filePath+tail;
    }
  return filePath;
}