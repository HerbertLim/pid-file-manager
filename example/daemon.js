// Sample program using PidFileManager
const PidFileManager = require('../lib/pidFileManager')
const pm = new PidFileManager('api')

console.log(`daemon's pid: `, process.pid)
pm.printPathFileInfo()
pm.writePidSync()
console.log(`Read PID: `, pm.readPidSync())

// Just to make this process alive
setInterval ( () => {
    console.log('Hi')
},10000)