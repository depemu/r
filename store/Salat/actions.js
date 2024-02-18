export default {
  getPrayTimes ({ commit }) {
    return new Promise ((resolve, reject) => {
      this.$axios.$get('//api.muhar.cloud/v1/salat/').then((response) => {
        if (!response.error) {
          const items = response.items
          const r = items.times
          const times = {
            subuh: r.Fajr,
            zuhur: r.Dhuhr,
            asar: r.Asr,
            magrib: r.Maghrib,
            isya: r.Isha
          }

          commit('SET_TIMES', times)
          commit('SET_DATE', items.date)

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
