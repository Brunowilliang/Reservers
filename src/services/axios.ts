import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'

export const useAxios = makeUseAxios({
  axios: axios.create({
    baseURL: 'https://reservers.pockethost.io/api/collections',
    timeout: 10000,
  })
})