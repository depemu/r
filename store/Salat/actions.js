export default {
  getPrayTimes ({ commit }) {
    return new Promise ((resolve, reject) => {
      this.$axios.$get('https://api.lab.muhar.us/salat/').then((response) => {
        const r = response[0]
        const times = {
          subuh: r.fajr,
          zuhur: r.dhuhr,
          asar: r.asr,
          magrib: r.maghrib,
          isya: r.isha
        }

        commit('SET_TIMES', times)
        commit('SET_DATE', r.date_for)

        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
