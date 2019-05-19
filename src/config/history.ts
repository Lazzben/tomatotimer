import { createBrowserHistory } from 'history';

const ENV = process.env.NODE_ENV
let publicUrl = ''

if(ENV === 'development'){
  publicUrl = '/'
}else if(ENV === 'production'){
  publicUrl = '/tomatotimer'
}

const history = createBrowserHistory({
  basename: publicUrl
});

export default history;