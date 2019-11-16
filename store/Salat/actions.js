export default {
  getPrayTimes ({ commit }) {
    return new Promise ((resolve, reject) => {
      this.$axios.$get('https://api.lab.muhar.us/salat/').then((response) => {
        const r = response[0]
        const times = {
          subuh: r.fajr,
          zuhur: r.dhuhr,
          asar: r.asr,
          maghrib: r.maghrib,
          isya: r.isha
        }

        commit('SET_TIMES', times)
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
