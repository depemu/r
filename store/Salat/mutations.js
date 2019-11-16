export default {
  SET_TIMES (state, times) {
    state.times = times
  },
  RESET_TIMES (state) {
    state.times = []
  },
  SET_DATE (state, date) {
    state.date = date
  },
  RESET_DATE (state) {
    state.date = ''
  }
}
