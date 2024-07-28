import { shell } from 'electron';
import fs from 'fs';
import path from 'path';
import lzma from 'lzma';

interface SkipCheckInfo {
    compress: true;
    sourceNpk: string;
    targetNpk: string;
    successText: string;
}

function compressNpk(data: Buffer): Promise<Buffer> {
    return new Promise((resolve, _reject) => {
        lzma.compress(data, 1, (result) => {
            resolve(result);
        }, (_percent) => {
            console.log('Compressing:', _percent);
        });
    })
}

export async function skipCheck(data: SkipCheckInfo) {
    const { compress, sourceNpk, targetNpk, successText } = data;
    try {
        let targetBuffer = fs.readFileSync(targetNpk);
        if (compress) {
            targetBuffer = await compressNpk(targetBuffer);
        }
        const sourceStats = fs.statSync(sourceNpk);
        const targetSize = targetBuffer.length;
        if (sourceStats.size < targetSize) {
            const text = compress ? '生成失败, NPK文件过大!' : '国服NPK文件必须大于修改后的NPK!';
            return { success: false, text }
        } else if (sourceStats.size > targetSize) {
            const difference = sourceStats.size - targetSize;
            const paddedBuffer = Buffer.concat([targetBuffer, Buffer.alloc(difference, 0)]);
            const outputDir = path.join(path.dirname(targetNpk), '已处理');
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }
            const outputPath = path.join(outputDir, path.basename(targetNpk));
            fs.writeFileSync(outputPath, paddedBuffer);
            setTimeout(() => {
                shell.showItemInFolder(outputPath);
            }, 300);
        }
        return { success: true, text: successText || '跳检测处理完成!' }
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