import { ToastProgrammatic as Toast } from 'buefy'

export const actions = {
  toast ({ state }, { data }) {
    let windowWidth = window.innerWidth
    let position = windowWidth > 1023 ? 'is-bottom' : 'is-top'
    Toast.open({
      position: position,
      duration: 3500,
      ...data
    })
  }
}

export default {
  actions
}
