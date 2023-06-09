import { defineStore } from 'pinia'
import { fetchStore } from './fetch'

export const routesStore = defineStore('routes', {
  state: () => ({
    routes: []
  }),
  actions: {
    fetchRoutes() {
      const method = 'GET'
      const url = '/routes/getAll'
      return fetchStore()
        .doRequest({ url, method })
        .then((res) => {
          this.routes = res
          return res
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    },
    getinfoDropdown() {
      const method = 'GET'
      const url = '/routes/getAll'
      return fetchStore()
        .doRequest({ url, method })
        .then((res) => {
          this.routes = res
          //conjunto set --> no elementos duplicados a partir de ese mapeo route.grade sobre routes
          let grades = [...new Set(this.routes.map((route) => route.grade))]
          let crags = [...new Set(this.routes.map((route) => route.crag))]
          //console.log(this.grades + ' grados')
          return [grades, crags]
        })
        .catch((error) => {
          console.log(error)
          return false
        })

      //return [... new Set(routes.map(route =>route.grade))]
    },
    getRoutesByGrade(grade, crag) {
      const method = 'GET'
      const url = '/routes/getAll'
      return fetchStore()
        .doRequest({ url, method })
        .then((res) => {
          this.routes = res
          let routesByGradeAndCrag = this.routes.filter(
            (route) => route.grade === grade && route.crag === crag
          )
          //let routesByCrag = this.routes.filter((route) => route.grade === grade)
          console.log(routesByGradeAndCrag)
          return routesByGradeAndCrag
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    },
    addRoute(route) {
      const method = 'POST'
      const url = '/routes/new'
      return fetchStore()
        .doRequest({ url, method, payload: route })
        .then((res) => {
          this.routes = res
          return res
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    },
    countRoutesByGrade() {
      const method = 'GET'
      const url = '/routes/getAll'
      return fetchStore()
        .doRequest({ url, method })
        .then((res) => {
          this.routes = res
          const totalRoutesByGrade = []
          this.routes.forEach((route) => {
            if (route.grade in totalRoutesByGrade) {
              totalRoutesByGrade[route.grade]++
            } else {
              totalRoutesByGrade[route.grade] = 1
            }
          })

          console.log(totalRoutesByGrade)
          return totalRoutesByGrade
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    }
  }
})
