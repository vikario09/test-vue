import ApiService from './ApiService'

export default class UsersService {
    static getUsers(page) {
        return ApiService.get(`users?page=${page}&count=6`)
    }
    
    static getPositions() {
        return ApiService.get(`positions`)
    }

    static getToken() {
        return ApiService.get('token')
    }

    static createUser(formData) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return ApiService.post('users', formData, config)
    }
}