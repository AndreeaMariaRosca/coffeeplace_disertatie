import { EventEmitter } from 'fbemitter'
import axios from 'axios'
// import jwt_decode from 'jwt-decode'

const SERVER = "http://localhost:8080/api"

class UserFunctions {
  constructor() {
    this.users = []
    this.user = null
    this.error = null
    this.emitter = new EventEmitter()
  }

  async getAll() {
    try {
      let response = await axios.get(`${SERVER}/findAllUsers`)
      let data = await response.json()
      this.users = data
      this.emitter.emit('GET_USERS_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_USERS_ERROR')
    }
  }

  async register(newUser) {
    return axios
      .post(`${SERVER}/register`, {
        email: newUser.email,
        password: newUser.password,
        username: newUser.username
      },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
  }

  async login(user) {
    return axios
      .post(`${SERVER}/login`, {
        email: user.email,
        password: user.password
      }).then(result => {
        console.log('successful login', result)
        return result.data;
      }).catch(() => {
        console.log('ups')
        return;
      })
  }

  async getUserByEmail(userEmail) {
    // let token = localStorage.getItem("usertoken");
    return axios.get(`${SERVER}/findUserByEmail/${userEmail}`,
      // { headers: { "Authorization": `${token}`, 'Content-Type': 'application/json' } }
    )
      .then((response) => {
        this.emitter.emit("GET_USER_SUCCESS");
        return response.data;
      }).catch(err => {
        console.log(err)
        this.emitter.emit("GET_USER_ERROR");
      })
  }



}

export default UserFunctions