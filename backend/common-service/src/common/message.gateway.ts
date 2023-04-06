import { MessageRecord } from "@dongjiang-recruitment/nest-common/dist/http";
import {
  Redis,
  RedisService,
} from "@dongjiang-recruitment/nest-common/dist/redis";
import { OnModuleInit } from "@nestjs/common";
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
  path: "/common/socket.io",
  cors: "*",
})
export class MessageGateWay implements OnModuleInit {
  private readonly redis: Redis;

  @WebSocketServer()
  server: Server;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  onModuleInit() {
    this.server.on("connection", (socket) => {
      socket.on("register", (message: { id: string }) => {
        this.redis.set(message.id, socket.id);
        socket.on("disconnect", () => {
          this.redis.del(message.id);
        });
      });
    });
  }

  @SubscribeMessage("message")
  async handleMessage(@MessageBody() body: MessageRecord) {
    const socketId = [await this.redis.get(body.serviceId)].flat()[0];
    this.server.to(socketId).emit("message", body);
  }
}
