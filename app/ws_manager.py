from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections:dict[int,list[WebSocket]]={}

    async def connect(self,user_id:int,websocket:WebSocket):
        await websocket.accept()
        self.active_connections.setdefault(user_id,[]).append(websocket)

    def disconnect(self,user_id:int,websocket:WebSocket):
        conn=self.active_connections.get(user_id,[])
        if websocket in conn:
            conn.remove(websocket)
        if not conn:
            self.active_connections.pop(user_id,None)

    async def broadcast_all(self,message:str):
        for userid,connections in self.active_connections.items():
            for connection in connections:
                await connection.send_text(message)


    async def broadcast(self,user_id:int,message:str):
        conn_list=list(self.active_connections.get(user_id,[]))
        for connection in conn_list:
            try:
                await connection.send_text(message)
            except Exception:
                self.disconnect(user_id,connection)


manager=ConnectionManager()