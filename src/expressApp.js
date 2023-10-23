import express from 'express';

export default () =>{
    const app = express();
    app.get('/', (_, res)=>{
        res.send("Hello World");
    })
    return app;
}