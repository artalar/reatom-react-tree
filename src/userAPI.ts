const API_URL = 'https://reqres.in/api'

const userAPI = {
  async fetchAll() {
    const result = await fetch(`${API_URL}/users`, { method: 'GET' })
    return result.json()
  },
}

export default userAPI
