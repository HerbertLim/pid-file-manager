# pid-file-manager
데몬 프로세스의 PID를 .pid 파일에 기록하고 .pid 파일에서 PID를 읽어오는 간단한 기능을 가진 라이브러리

## 사용 방법
node.js 프로젝트의 src/lib/ 에 lib/PidFileManager.js 를 복사한 후 사용한다
```
const PidFileManager = require('./lib/pidFileManager')
const pm = new PidFileManager('api')
```
서비스 이름이 api 인 경우 PidFileManager 생성자에게 서비스 이름을 인자로 전달하면
~/pids/api.pid 파일에 PID가 기록된다

## pman