# pid-file-manager 라이브러리
데몬 프로세스의 PID를 .pid 파일에 기록하고 .pid 파일에서 PID를 읽어오는 간단한 기능을 가진 라이브러리

## 사용 방법
node.js 프로젝트의 src/lib/ 에 lib/PidFileManager.js 를 복사한 후 사용한다
```
const PidFileManager = require('./lib/pidFileManager')
const pm = new PidFileManager('api')
```
서비스 이름이 api 인 경우 PidFileManager 생성자에게 서비스 이름을 인자로 전달하면
~/pids/api.pid 파일에 PID가 기록된다

# pman 
Simple process manager: 
*serviceName*을 start, stop, restart 시킨다

```
pman <serviceName> [start|stop|restart]

예) $ node pman misebig-api restart
```


`pman`에 등록된 서비스들의 나열한다.
```
$ pman -l
misebig-api : /home/ec2-user/misebig-api/src/index.api.js
test-api: /home/ec2-user/test-api/src/index.api.js
```

`pman.conf`에 서비스들에 대한 정보를 등록해둔다
```
{
    "services": [
        {
            "name": "misebig-api",
            "path": "/home/ec2-user/misebig-api/src/index.api.js",
            "pidFile": "api.pid"
        },
        {
            "name": "test-api",
            "path": "/home/ec2-user/test-api/src/index.api.js",
            "pidFile": "api.pid"
        },
        {
            "name": "collectAirKorea",
            "path": "/home/ec2-user/misebig-collector/src/collector.js",
            "pidFile": "airKorea.pid"
        },
    ]
}
```
- `name`: 서비스 이름으로 `pman` 명령어 실행시 지정하는 이름
- `path`: `pman`이 실행할 js 파일 이름
- `pidFile`: `pman`이 PID를 기록하고 읽을 pid 파일의 이름. 위치는 홈 디렉토리 밑의 pids/ 로 고정되어 있다. 


pman의 핵심 알고리즘
---
- pman.conf 를 읽는다
- `name`의 유효성을 확인한 후 , 
- `pidFile`에서 pid 를 읽어서 해당 프로세스를 죽이고 (kill -9, SIGKILL)
- `path`에 해당하는 js 를 실행시킨다