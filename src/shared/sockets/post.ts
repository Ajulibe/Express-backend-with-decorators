// import { ICommentDocument } from '@comment/interfaces/comment.interface';
import { ICommentDocument } from '@comment/interfaces/comment.interface';
import { IReactionDocument } from '@reaction/interfaces/reaction.interface';
import { Server, Socket } from 'socket.io';

/**
 *
 * Here we are optimizing ofr speed and UX
 * once a user posts, we save to redis and then send a response to the user instantly
 *
 */

export let socketIOPostObject: Server;

export class SocketIOPostHandler {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    socketIOPostObject = io;
  }

  public listen(): void {
    this.io.on('connection', (socket: Socket) => {
      //this is listening for events emitted by the REACT app.
      //it is emitted by the app when someone sends a reaction
      //when the React app emits that, we will emmit also as a response
      // with the data recieved from the client
      socket.on('reaction', (reaction: IReactionDocument) => {
        //this is being emitted to all connected sockets
        //it is sent from here to the client
        this.io.emit('update like', reaction);
      });

      //this is being emitted to all connected sockets
      //it is sent from here to the client
      socket.on('comment', (data: ICommentDocument) => {
        this.io.emit('update comment', data);
      });
    });
  }
}
