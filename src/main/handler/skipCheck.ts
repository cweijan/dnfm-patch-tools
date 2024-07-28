import { shell } from 'electron';
import fs from 'fs';
import path from 'path';

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
        }, 300);
        return { success: true, text: '跳检测处理完成!' }
    } catch (err) {
        return { success: false, text: err }
    }
}

export function blockNpk(npkPath: string) {
    const stats = fs.statSync(npkPath);
    const fileSize = stats.size;
    const buffer = Buffer.alloc(fileSize, 0);
    const outputDir = path.join(path.dirname(npkPath), '语音屏蔽');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    const outputPath = path.join(outputDir, path.basename(npkPath));
    fs.writeFileSync(outputPath, buffer);
    setTimeout(() => {
        shell.showItemInFolder(outputPath);
    }, 300);
    return { success: true, text: '屏蔽补丁生成完成!' };
}