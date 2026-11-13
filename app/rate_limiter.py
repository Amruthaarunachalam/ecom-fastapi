from collections import defaultdict
import time

class SlidingWindowLimiter:
    def __init__(self,request:int,window_time:int):
        self.request=request
        self.window_time=window_time
        self.request_logs:dict=defaultdict(list)
    
    def is_allowed(self,key:str)->bool:
        now=time.time()
        window_start=now-self.window_time

        log=self.request_logs[key]

        self.request_logs[key]=[t for t in log if t > window_start]

        if len(self.request_logs[key])>=self.request:
            return False
        self.request_logs[key].append(now)
        return True

limiter = SlidingWindowLimiter(request=10, window_time=60)
