// 与微信相关api均在此导出，需要在其他地方二次封装使用

// 导入请求处理
import {
  wxRequest
} from './request'
// 导入路由处理
import {
  wxNavigateTo,
  wxRedirectTo,
  wxReLaunch,
  wxNavigateBack
} from './router'
// 导入缓存处理
import {
  wxGetStorage,
  wxSetStorage,
  wxRemoveStorage,
  wxClearStorage
} from './storage'
// 导入用户登录和获取用户信息处理
import {
  wxLogin,
  wxGetUserInfo
} from './users'
// 导入用户交互处理
import {
  wxShowToast,
  wxShowLoading,
  wxHideLoading,
  wxShowModal
} from './interaction'
// 导入文件上传处理
import {
  wxUploadFile,
  wxChooseImage,
  wxPreviewImage
} from './uploader'
// 导入其他 设置顶部导航标题api 获取元素宽高信息
import {
  wxSetNavigationBarTitle,
  wxCreateSelectorQuery,
  wxOnWindowResize
} from './other'
// 统一导出
export {
  wxRequest,
  wxNavigateTo,
  wxRedirectTo,
  wxReLaunch,
  wxNavigateBack,
  wxGetStorage,
  wxSetStorage,
  wxRemoveStorage,
  wxClearStorage,
  wxLogin,
  wxGetUserInfo,
  wxShowToast,
  wxShowLoading,
  wxHideLoading,
  wxShowModal,
  wxUploadFile,
  wxChooseImage,
  wxPreviewImage,
  wxSetNavigationBarTitle,
  wxCreateSelectorQuery,
  wxOnWindowResize
}
