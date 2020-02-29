// js常用方法
// 常用方法
const self = {
  // 判断是否是一个字符串
  isString(str) {
    return toString.call(str) === "[object String]";
  },

  // 判断是否是一个数字（包括NaN）
  isNumber(num) {
    return toString.call(num) === "[object Number]";
  },

  // 判断是否是 NaN
  isNaN(num) {
    return toString.call(num) === "[object Number]" && isNaN(num);
  },

  // 判断是否是一个Boolean
  isBoolean(bool) {
    return bool === true || bool === false || toString.call(bool) === "[object Boolean]";
  },

  // 判断是否是null
  isNull(nul) {
    return nul === null;
  },

  // 判断是否是undefined
  isUndefined(und) {
    return und === undefined;
  },

  // 判断是否是一个空对象
  isEmptyObject(obj) {
    return typeof obj === "object" && !!obj && JSON.stringify(obj) === "{}";
  },

  // 判断是否是一个对象（包括空对象）
  isObject(obj) {
    return typeof obj === "object" && !!obj && toString.call(obj) !== "[object Array]";
  },

  // 判断是否是一个空数组
  isEmptyArray(arr) {
    return toString.call(arr) === "[object Array]" && JSON.stringify(arr) === "[]";
  },

  // 判断是否是一个数组
  isArray(arr) {
    return toString.call(arr) === "[object Array]" || Array.isArray(arr) || arr instanceof Array;
  },

  // 判断是否是函数
  isFunction(func) {
    return toString.call(func) === "[object Function]";
  },

  // 判断是否是一个日期
  isDate(date) {
    return toString.call(date) === "[object Date]";
  },

  // 判断是否是一个正则表达式
  isRegExp(reg) {
    return toString.call(reg) === "[object RegExp]";
  },

  // 对象或数组浅拷贝,只复制第一层属性或方法
  simpleCopy(obj) {
    let obj2 = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
      for (let i in obj) {
        obj2[i] = obj[i];
      }
      return obj2;
    } else {
      return obj;
    }
  },

  // 对象或数组深拷贝
  deepCopy(obj) {
    let obj2 = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
      for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
          // 如果是引用类型，递归复制
          if (obj[i] && typeof obj[i] === "object") {
            obj2[i] = self.deepCopy(obj[i]);
          } else {
            // 如果是基本数据类型，只是简单的复制
            obj2[i] = obj[i];
          }
        }
      }
      return obj2;
    } else {
      return obj;
    }
  },

  // 数组排序（非数组返回 []，对象数组不指定key返回原数组）
  // 参数一：排序数组；
  // 参数二：排序方式（升序、默认，desc降序，random随机排序）；
  // 参数三：当数组是对象数组时，传入对象要排序的key属性
  sort(array, sort = 'asce', key = null) {
    if (!self.isArray(array)) return [];
    let arr = self.deepCopy(array);
    switch (sort) {
      case "desc":
        if (key && self.isObject(array[0])) {
          return arr.sort(function (a, b) {
            let x = a[key],
              y = b[key];
            if (x < y) return 1;
            if (x > y) return -1;
            return 0;
          });
        } else {
          return arr.sort(function (a, b) {
            if (a < b) return 1;
            if (a > b) return -1;
            return 0;
          });
        }
        case "random":
          if (key && self.isObject(array[0])) {
            return arr.sort(function (a, b) {
              let x = a[key],
                y = b[key];
              return 0.5 - Math.random();
            });
          } else {
            return arr.sort(function (a, b) {
              return 0.5 - Math.random();
            });
          }

          default:
            if (key && self.isObject(array[0])) {
              return arr.sort(function (a, b) {
                let m = a[key],
                  n = b[key];
                if (m < n) return -1;
                if (m > n) return 1;
                return 0;
              });
            } else {
              return arr.sort(function (a, b) {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
              });
            }
    }
  },

  // 转化为数字（非数字返回 NaN）
  toNumber(num) {
    if (self.isNumber(num) || self.isString(num)) {
      num = parseFloat(num) * 1;
      return num;
    }
    return NaN;
  },

  formatNumber(num, digit) {
    if (!digit && digit !== 0)
      return num
    if (self.isNumber(num) || self.isString(num)) {
      num = parseFloat(num) * 1
      num = num.toFixed(digit)
      return num
    }
    return num
  },

  //  加法精度问题（可传多个，传入数值或字符串数值，否则返回 空字符串 ''）
  accAdd(...argument) {
    let max = 0,
      count = 0,
      len = argument.length;
    // 遍历寻找最大小数位以及校验是否为合法数值
    for (let i = 0; i < len; i++) {
      let item = argument[i],
        len2;
      item = self.toNumber(item);
      if (!(self.isNumber(item) && !self.isNaN(item))) return "";
      try {
        len2 = item.toString().split(".")[1].length;
      } catch (e) {
        len2 = 0;
      }
      max = max >= len2 ? max : len2;
    }
    max = Math.pow(10, max);
    for (let i = 0; i < len; i++) {
      count += argument[i] * max;
    }
    return count / max;
  },

  //  减法精度问题（可传多个，数值或字符串数值，否则返回空字符串 ''）
  accSub(...argument) {
    let max = 0,
      len = argument.length;
    if (!len) return "";
    let count = argument[0];
    // 遍历寻找最大小数位以及校验是否为合法数值
    for (let i = 0; i < len; i++) {
      let item = argument[i],
        len2;
      item = self.toNumber(item);
      if (!(self.isNumber(item) && !self.isNaN(item))) return "";
      try {
        len2 = item.toString().split(".")[1].length;
      } catch (e) {
        len2 = 0;
      }
      max = max >= len2 ? max : len2;
    }
    max = Math.pow(10, max);
    count = count * max;
    for (let i = 1; i < len; i++) {
      count -= argument[i] * max;
    }
    return count / max;
  },

  //  乘法精度问题（只传两个，数值或字符串数值，否则返回空字符串 ''）
  accMul(num1, num2) {
    let count,
      len = 0;
    num1 = self.toNumber(num1);
    num2 = self.toNumber(num2);
    if (!(self.isNumber(num1) && !self.isNaN(num1) && self.isNumber(num2) && !self.isNaN(num2)))
      return "";
    num1 = num1.toString();
    num2 = num2.toString();
    try {
      len += num1.split(".")[1].length;
    } catch (e) {
      len += 0;
    }
    try {
      len += num2.split(".")[1].length;
    } catch (e) {
      len += 0;
    }
    count = (Number(num1.replace(".", "")) * Number(num2.replace(".", ""))) / Math.pow(10, len);
    return count;
  },

  // 除法精度问题（只传两个，数值或字符串数值，否则返回空字符串 ''）
  accDiv(num1, num2) {
    let divisionCount, divisionedCount, len1, len2;
    num1 = self.toNumber(num1);
    num2 = self.toNumber(num2);
    if (!(
        self.isNumber(num1) &&
        !self.isNaN(num1) &&
        self.isNumber(num2) &&
        !self.isNaN(num2) &&
        num2 !== 0
      ))
      return "";
    num1 = num1.toString();
    num2 = num2.toString();
    try {
      len1 = num1.split(".")[1].length;
    } catch (e) {
      len1 = 0;
    }
    try {
      len2 = num2.split(".")[1].length;
    } catch (e) {
      len2 = 0;
    }
    divisionCount = Number(num1.replace(".", "")) / Number(num2.replace(".", ""));
    divisionedCount = Math.pow(10, len2 - len1);
    return self.accMul(divisionCount, divisionedCount);
  },

  // 将科学计数法展开（输入数值或字符串数值，返回展开后的数值字符串，否则返回空字符串）
  toNonExponential(num) {
    num = self.toNumber(num);
    if (self.isNumber(num) && !self.isNaN(num)) {
      let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
      return num.toFixed(Math.max(0, (m[1] || "").length - m[2]));
    }
    return "";
  },
};

export default self;
