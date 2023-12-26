import $http from './index'

export function getRoutes(data) {
  return $http({
    url: '/users/getdata',
    method: 'get',
    params: data
  })
}
