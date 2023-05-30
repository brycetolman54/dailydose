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
