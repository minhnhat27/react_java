import { Store } from 'react-notifications-component'

const Success = (message) => {
  return Store.addNotification({
    title: 'Thành công!',
    message: message,
    type: 'success',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 2000,
      onScreen: false,
    },
  })
}

const Danger = (message) => {
  return Store.addNotification({
    title: 'Thất bại!',
    message: message,
    type: 'danger',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 2000,
      onScreen: false,
    },
  })
}
const Info = (message) => {
  return Store.addNotification({
    title: 'Thông tin!',
    message: message,
    type: 'info',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 2000,
      onScreen: false,
    },
  })
}

const Warning = (message) => {
  return Store.addNotification({
    title: 'Cảnh báo!',
    message: message,
    type: 'warning',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 2000,
      onScreen: false,
    },
  })
}
const Default = (message) => {
  return Store.addNotification({
    title: 'Thông báo!',
    message: message,
    type: 'default',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 2000,
      onScreen: false,
    },
  })
}

const notificationService = {
  Success,
  Danger,
  Info,
  Warning,
  Default,
}
export default notificationService
