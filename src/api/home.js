import $http from './index'

export function getRoutes(data) {
  return $http({
    url: '/route',
    method: 'get',
    params: data
  })
}
