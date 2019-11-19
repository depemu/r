import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      loader: true,
      now: '',
      dateApiFormat: 'YYYY-MM-DD h:mm a',
      imsakDuration: 10
    }
  },
  computed: {
    ...mapGetters([
      'times',
      'date'
    ]),
    magrib() {
      return '4:30 am'
      return this.times.magrib.replace(' ', '')
    },
    imsakMoment() {
      return moment(this.subuh, 'h:mm a').add(-1 * this.imsakDuration, 'minutes')
    },
    imsak() {
      return moment(this.imsakMoment).format('h:mm a')
    },
    subuh() {
      return '4:21 am'
      return this.times.subuh
    },
    magribMoment() {
      return moment(`${this.date} ${this.magrib}`, this.dateApiFormat)
    },
    subuhMoment() {
      return moment(`${this.date} ${this.subuh}`, this.dateApiFormat)
    },
    magribDiff() {
      return this.magribMoment.diff(this.now)
    },
    subuhDiff() {
      return this.subuhMoment.diff(this.now)
    },
    isMagribPast() {
      return this.magribDiff < 0
    },
    isSubuhPast() {
      return this.subuhDiff < 0
    },
    isImsak() {
      // @todo
      return true
    },
    canEat() {
      if (this.isMagribPast) {
        return true
      }

      if (this.isSubuhPast) {
        return false
      }

      return true
    }
  },
  filters: {
    duration (value) {
      return moment.duration(value).humanize()
    }
  },
  methods: {
    ...mapActions([
      'getPrayTimes'
    ])
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
