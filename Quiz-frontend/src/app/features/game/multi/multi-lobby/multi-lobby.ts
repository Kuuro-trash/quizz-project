import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService, WsMessage } from '../../../../core/services/websocket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multi-lobby',
  imports: [CommonModule],
  templateUrl: './multi-lobby.html',
  styleUrl: './multi-lobby.css',
})
export class MultiLobby implements OnInit, OnDestroy {
  messages: string[] = []; // Nơi chứa các thông báo trạng thái
  myUserId: string = 'User_' + Math.floor(Math.random() * 1000); // Lấy tạm, sau này thay bằng authService.currentUser.id
  roomId: string = 'ROOM_QUICK_PLAY'; // Tạo cứng 1 phòng để test, sau này lấy trên url params.

  constructor(private wsService: WebsocketService) {}

  ngOnInit() {
    this.connectRoom();
  }

  ngOnDestroy() {
    this.wsService.disconnect();
  }

  // Kết nối tới WebSocket của Game Room Server
  connectRoom() {
    this.wsService.connect(this.roomId, this.myUserId);

    // Lắng nghe dữ liệu rải rác từ hub về Lobby của người dùng
    this.wsService.getMessages().subscribe((msg: WsMessage) => {
      // Bắt theo hành động (Action)
      if (msg.action === 'player_joined') {
        const text = `✅ Người chơi [${msg.data}] vừa vào phòng!`;
        this.messages.push(text);
        console.log(text);
      } else if (msg.action === 'chat') {
        const chatText = `💬 [${msg.userId}]: ${msg.data}`;
        this.messages.push(chatText);
      }
    });
  }

  // Nút Test gửi tin nhắn vào phòng Chat Room
  sendChat() {
    const textMsg: WsMessage = {
      action: 'chat',
      roomId: this.roomId,
      userId: this.myUserId,
      data: 'Hello mọi người, tui đã join!',
    };
    this.wsService.sendMessage(textMsg);
  }
}
