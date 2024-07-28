export function sendIPC(event: string, data?: any) {
    window.electron.ipcRenderer.send('event', { event, data })
}

const postMessage = (message: any) => {
    if (window.electron) {
        window.electron.ipcRenderer.send('event', message)
    }
}

const events = {}
export const handler = {
    on(event: string, callback) {
        if (!events[event]) events[event] = []
        events[event].push(callback)
        return this;
    },
    emit(event: string, data?: any) {
        const isObj = typeof data == 'object';
        const content = isObj ? JSON.parse(JSON.stringify(data)) : data
        postMessage({ type: event, content })
        return this;
    }
}

window.electron.ipcRenderer.on('event', (_event, { event, data }) => {
    if (import.meta.env.DEV) {
        console.log('event', event, data);
    }
    const callbacks = events[event]
    if (!callbacks) return;
    for (const cb of callbacks)
        cb(data)
});