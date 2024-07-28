import { shell } from 'electron';
import fs from 'fs';

interface SkipCheckInfo {
    sourceNpk: string;
    targetNpk: string;
}

export function skipCheck(data: SkipCheckInfo) {
    const { sourceNpk, targetNpk } = data;
    try {
        const sourceStats = fs.statSync(sourceNpk);
        const targetStats = fs.statSync(targetNpk);
        if (sourceStats.size < targetStats.size) {
            return { success: false, text: '原NPK文件的大小必须大于修改后的NPK!' }
        } else if (sourceStats.size > targetStats.size) {
            const difference = sourceStats.size - targetStats.size;
            const buffer = Buffer.alloc(difference, 0);
            const fd = fs.openSync(targetNpk, 'a');
            fs.writeSync(fd, buffer, 0, buffer.length, targetStats.size);
            fs.closeSync(fd);
        }
        setTimeout(() => {
            shell.showItemInFolder(targetNpk);
        }, 1000);
        return { success: true, text: '跳检测处理完成!' }
    } catch (err) {
        return { success: false, text: err }
    }
}