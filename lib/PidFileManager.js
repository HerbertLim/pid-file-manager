const fs = require('fs')

const pidDir = 'pids';
const fileExt = '.pid'

const OK = 0;
const ERROR = -1;
const DIR_CREATED = 1;
const ECANNOT_MAKE_DIR = -2;

class PidFileManager {
    constructor (serviceName) {
        this.serviceName = serviceName;
        this.homeDir = process.env.HOME;
        this.dirPath = this.homeDir + '/' + pidDir;
        this.fileName = this.serviceName + fileExt;
        this.fullPath = this.dirPath + '/' + this.fileName;
    }
    
    writePidSync() {
        const ret = this.checkMakePidDirSync()
        if (ret >= OK) {
            fs.writeFileSync(this.fullPath, process.pid, 'utf8')
            return OK;
        } else {
            return ret; // return err code
        }
    }
    
    readPidSync() {
        try {
            const pid = fs.readFileSync(this.fullPath, 'utf8')
            return pid;
        } catch (err) {
            console.err(`Cannot read pid from ${this.fullPath}.`)
            return ERROR;
        }
    }
    
    checkMakePidDirSync() {
        try {
            const stats = fs.statSync(this.dirPath)   
            return OK;         
        } catch (err) {
            try {
                fs.mkdirSync(this.dirPath)
                return DIR_CREATED;
            } catch (err2) {
                return ECANNOT_MAKE_DIR;
            }
        }
    }
    
    printPathFileInfo() {
        console.log(`PID is written to ${this.fullPath}`)        
    }
}

module.exports = PidFileManager;

