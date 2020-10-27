import "reflect-metadata";

import { createConnection } from "typeorm"
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { __prod__ } from "./constants";
//import { COOKIE_NAME, __prod__ } from "./constants";


const main = async () => {
    await createConnection();

    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();
    app.use(
        session({
            name: "qid",
            store: new RedisStore({ client: redisClient, disableTouch: true, }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax",
                secure: __prod__, // cookie only works in https
            },
            saveUninitialized: false,
            secret: "asdfashfirhornvoiranvio",
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis }),
    });

    apolloServer.applyMiddleware({app});

    // app.get('/', (_, res) => {
    //     res.send("hello");
    // });
    app.listen(4000, () =>  {
        console.log('server started on localhost:4000');
    });
}

// createConnection().then(_connection => {
//     console.log("hello there");
// }).catch(error => console.log(error));
main().catch(error => console.log(error));
//console.log("hello there")