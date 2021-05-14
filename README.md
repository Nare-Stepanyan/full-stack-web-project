# Client List API

You can store clients data, their name, email and phone and providers they are using. There are abilities for editing client information, deleting them, there are also searching and sorting options.

## Requirements

You will need install `Node.js`, `npm` and `MongoDB` in your environement.

#### Node installation on Ubuntu

You can install nodejs and npm easily with apt install, just run the following commands.

    $ sudo apt install nodejs
    $ sudo apt install npm

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.16.1

    $ npm --version
    6.14.12

### MongoDB

Install MongoDb [Guide](https://docs.mongodb.com/manual/administration/install-community/)

## Install the project

    $ git clone https://github.com/Nare-Stepanyan/full-stack-web-project.git
    $ cd full-stack-web-project
    $ npm install

## Run the server

    $ cd clients-frontend/clients-backend
    $ npm start

## Run the project

    $ cd clients-frontend
    $ npm start

## Making requests

### `By default, the API_HOST is http://localhost:3001`

#### Create a new client

request url `API_HOST/client`

#### Get all clients or search

request url `API_HOST/client`

##### The following filters and sorting are allowed

`{search: `{searchString}`, sort: `OneOf['a-z', 'z-a']`}`

#### Update the client

request url `API_HOST/client/:clientId`

#### Delete the client

request url `API_HOST/client/:clientId`

#### Create a new provider

request url `API_HOST/provider`

#### Get all providers

request url `API_HOST/provider`

#### Update the provider

request url `API_HOST/provider/:providerId`

#### Delete the provider

request url `API_HOST/provider/:providerId`

All API-s are documented and may be tested in `http://localhost:3001/api-docs/`
