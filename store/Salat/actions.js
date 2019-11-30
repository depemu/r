export default {
  getPrayTimes ({ commit }) {
    return new Promise ((resolve, reject) => {
      this.$axios.$get('https://api.muhar.us/salat/').then((response) => {
        if (!response.error) {
          const items = response.items[0]
          const r = items.times
          const times = {
            subuh: r.Fajr,
            zuhur: r.Dhuhr,
            asar: r.Asr,
            magrib: r.Maghrib,
            isya: r.Isha
          }

          commit('SET_TIMES', times)
          commit('SET_DATE', items.date.gregorian)

          resolve(response)
        }
        else {
          reject(response)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
