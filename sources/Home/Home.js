import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

moment.locale('id')

export default {
  data() {
    return {
      loader: true,
      now: '',
      dateApiFormat: 'YYYY-MM-DD',
      timeApiFormat: 'HH:mm',
      timeFormat: 'HH:mm:ss',
      imsakDuration: 10
    }
  },
  computed: {
    ...mapGetters('Salat', [
      'times',
      'date'
    ]),
    dateTimeApiFormat() {
      return `${this.dateApiFormat} ${this.timeApiFormat}`
    },
    time() {
      return this.now.format(this.timeFormat)
    },
    magrib() {
      return this.times.magrib
    },
    subuh() {
      return this.times.subuh
    },
    imsak() {
      return this.imsakMoment.format(this.timeApiFormat)
    },
    toMagrib() {
      return this.toMoment(this.magribDiff)
    },
    toSubuh() {
      return this.toMoment(this.subuhDiff)
    },
    toImsak() {
      return this.toMoment(this.imsakDiff)
    },
    magribMoment() {
      return this.createMoment(this.magrib)
    },
    subuhMoment() {
      return this.createMoment(this.subuh)
    },
    imsakMoment() {
      return this.createMoment(this.subuh).add(-1 * this.imsakDuration, 'minutes')
    },
    magribDiff() {
      return this.diffFromNow(this.magribMoment)
    },
    subuhDiff() {
      return this.diffFromNow(this.subuhMoment)
    },
    imsakDiff() {
      return this.diffFromNow(this.imsakMoment)
    },
    isMagribPast() {
      return this.magribDiff < 0
    },
    isSubuhPast() {
      return this.subuhDiff < 0
    },
    isImsak() {
      return this.imsakDiff < 0 && !this.isSubuhPast
    },
    canEat() {
      if (this.isMagribPast) {
        return true
      }

      if (this.isSubuhPast) {
        return false
      }

      return true
    },
    eatStyle() {
      if (this.isImsak) {
        return 'image--zoom-fast'
      }

      if (this.isMagribPast) {
        return 'image--rotate image--space'
      }

      return 'image--rotate'
    }
  },
  filters: {
    duration (value) {
      return moment.duration(value).humanize()
    }
  },
  methods: {
    ...mapActions({
      getPrayTimes: 'Salat/getPrayTimes'
    }),
    createMoment (time) {
      return moment(`${this.date} ${time}`, this.dateTimeApiFormat)
    },
    diffFromNow (moment) {
      return moment.diff(this.now)
    },
    toMoment (time) {
      return moment.utc(time).format(this.timeFormat)
    }
  },
  mounted() {
    this.now = moment()
    this.getPrayTimes().then(() => {
      this.loader = false
    })

    setInterval(() => {
      this.now = moment()
    }, 1000)
  }
}
