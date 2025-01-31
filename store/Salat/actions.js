export default {
  getPrayTimes ({ commit }) {
    return new Promise ((resolve, reject) => {
      this.$axios.$get('https://papi.muhar.us/?app=salat').then((response) => {
        if (response.success) {
          const items = response.result
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
