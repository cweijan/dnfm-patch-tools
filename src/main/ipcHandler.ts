import { BrowserWindow, dialog, ipcMain, shell } from 'electron'

function send(event: string, data?: any) {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
        win.webContents.send('event', { event, data });
    }
}

export function initIPCHandler() {
    ipcMain.on('event', (_event, { event, data }) => {
        switch (event) {
            case 'open':
                shell.openExternal(data)
                break;
            case 'chooseFile':
                dialog.showOpenDialog({ properties: ['openFile'] }).then(function (response) {
                    if (response.canceled) return;
                    const filePath = response.filePaths[0]
                    send('file', { ...data, path: filePath });
                });
                break;
        }
    })
}