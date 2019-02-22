const axios = {
    get: () => new Promise(
        res => res({
            data: {
                email: 'test@test.com',
                password: 'test'
            }
        })
    ),
    post: () => new Promise(
        res => res({
            data: {
                email: 'test@test.com',
                password: 'test',
                authorized: true
            }
        })
    )
}

export default axios