import { boot } from 'quasar/wrappers'
import axios from "axios"


export const api = axios.create({ baseURL: 'http://94.158.54.194:9092/api/' })
