import { TOKEN } from '../../model';

const addToken = (token: string) => 
  new Promise((resolve, reject) => 
    TOKEN.create({ token })
    .then(resolve)
    .catch(reject)
  )

const getToken = () => 
  new Promise((resolve, reject) => 
    TOKEN.findOne()
    .sort({ updatedAt: -1 })
    .then(resolve)
    .catch(reject)
  )

export { addToken, getToken };