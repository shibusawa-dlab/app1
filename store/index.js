export const state = () => ({
  style: {},
  xml: null,
  result: null,
  canvas: null,
  facs: null,
  id: null,
})

export const mutations = {
  setStyle(state, value) {
    state.style = value
  },
  setXml(state, value) {
    state.xml = value
  },
  setResult(state, value) {
    state.result = value
  },
  setCanvas(state, value) {
    state.canvas = value
  },
  setFacs(state, value) {
    state.facs = value
  },
  setId(state, value) {
    state.id = value
  },
}

export const getters = {
  getStyle(state) {
    return state.style
  },
  getXml(state) {
    return state.xml
  },
  getResult(state) {
    return state.result
  },
  getCanvas(state) {
    return state.canvas
  },
  getFacs(state) {
    return state.facs
  },
  getId(state) {
    return state.id
  },
}
