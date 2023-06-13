# Security
- Same origin policy says you cannot use anything that is not on your domain
- So, they made CORS (cross origin resource sharing):
  - The `Access-Control-Allow-Origin` header allows you to declare what site the server allows fetches from
  - This is restricitve... how do you allow anyone to fetch?
    - You can use the `*` wildcard

# Web Services
- You can't just start coding, plan it out to see what your server needs to do
- You can then make a list of endpoints (functions that the users can access on the server)
- Make sure you use the mathods that you knwo the web uses

## Endpoint Design
Keep in mind that you want it to be 
1. Grammatical: that it is noun/resource based, make ut so that your service operates on things
2. Readable: /store/provo/order/28502
3. Simple: single responsibility principle, make one thing do one thing
4. Documented: tell what your stuff actually does\

You can use Swagger (an Open AI) to document what your endpoints do

## Remote Procedure Call (RPC)
This is just a function that you call to run somewhere else
```
POST /updateOrder HHTP/2
{"id": 2197, "date": "20220505"};

POST /rpc HTTP/2
{
"cmd":"updateOrder",
"param":{"id": 2197, "date": "20220505"}
}
```

## Represantational state transfer (REST)
```
PUT /order/2197 HTTP/2
{"date": "202220505"}
```

## Making End services
We use Node.js!!

There are three important parts to Node.js
1. NVM: Node version manager (keeps up with latest version), changes code to new version
2. Node: JavaScript Runtime
3. NPM- Node package manager (allows you to run other peoples' code to yours)

You need to create a `.gitignore` file and put `node_modules` in it so you never put that in your git, it is just all of the functions in the node package module

You have to use `require()` in your file to get the node package that you have imported

# Express
5 objects in library:
1. express: constructor and default middleware
2. app: the express application
3. req: the request object
4. res: the response object
5. router: adding child routing

## Middleware
- HTTP request comes in, hits express app, hits req that has middleware objects in it, goes next or to responsem sends back to server
- This is what it looks like: `app.use([path], callback(req, res, next))`
- The order in which you put your `use` functions in the file tells what the order of `next` is
- `app.use(express.static('public'))` is used to staticly express the files you have written for your website

## Routing
- You can use smoething like `app.get('/store/:id/:data', (req,res) => {})` and yo can get the id and data with param.id or param.data

# Daemons - PM2
- Keeps your node service running
```
pm2 ls
cd +/services/appname
pm2 start index.js -n appname -- 5501
pm2 save
```
