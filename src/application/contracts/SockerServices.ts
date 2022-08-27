/* eslint-disable @typescript-eslint/no-var-requires */
import { Application } from 'express';
import http, { Server } from 'http';
import { Socket } from 'socket.io';

export class SocketServices{

    io!: Socket;
    server!: Server;
    options = {
        cors: {
            origin: '*',
        },
    };

    initSocket(app: Application): Server{
        this.server = http.createServer(app);

        this.io = require('socket.io')(this.server, this.options);
        this.io.on('connection', (socket) => {
            this.io.emit('welcome', 'Welcome new user to the App Chats');
        });

        return this.server;
    }

    notififyMessage(idUsuario: string, nameUser: string){
        this.io.emit(idUsuario, `You have a new Message from ${nameUser}`);
    }

    notififyConversation(idConversation: string, nameUser: string){
        this.io.emit(`${idConversation}`, `You have a new message from ${nameUser}`);
    }

}