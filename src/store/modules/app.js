const app = {
  namespaced: true,
  state () {
    return {
      sidebarOpened: true
    }
  },
  mutations: {
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  }
}

export default app
