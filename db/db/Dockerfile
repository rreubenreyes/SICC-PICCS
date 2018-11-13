FROM postgres
WORKDIR /docker-entrypoint-initdb.d
ADD psql_dump.sql /docker-entrypoint-initdb.d
EXPOSE 5432