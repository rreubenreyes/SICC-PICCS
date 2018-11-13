#! /bin/bash
docker run -d -p 8080:8080 \
       hasura/graphql-engine:v1.0.0-alpha28 \
       graphql-engine \
       --database-url postgres://akymflslocjrau:a4cc2d64e963283948ff33bb6faa6b480597342f17c09c176b8dbc8f7558388b@ec2-54-204-14-96.compute-1.amazonaws.com:5432/dd1300uipqhsgr \
       serve --enable-console
