from fastapi import APIRouter, WebSocket, WebSocketDisconnect, status
from app.security import ALGORITHM, SECRET_KEY
from app.ws_manager import manager
import jwt

router = APIRouter(tags=["WebSocket"])

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, token: str = ''):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload['sub'])
    
    except (jwt.PyJWTError, KeyError, ValueError): 
        await websocket.accept()
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION) 
        return

    await manager.connect(user_id, websocket)
    
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(user_id, websocket)