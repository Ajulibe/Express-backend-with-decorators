// import { ICommentDocument } from '@comment/interfaces/comment.interface';
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
      socket.on('reaction', (reaction: IReactionDocument) => {
        this.io.emit('update like', reaction);
      });

      // socket.on('comment', (data: ICommentDocument) => {
      //   this.io.emit('update comment', data);
      // });
    });
  }
}
