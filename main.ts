export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  Deno.serve(async request => {
    if (request.headers.get('upgrade') === 'websocket') {
      const { socket, response } = Deno.upgradeWebSocket(request)

      socket.onopen = ev => {
        console.log('CONNECTED')
      }

      socket.onmessage = ev => {
        console.log(`RESCEIVED: ${ev.data}`)
        socket.send(`ECHO: ${ev.data}`)
      }

      socket.onclose = ev => console.log('DISCONNECTED')
      socket.onerror = e => console.error('ERROR: ', e)

      return response
    } else {
      const file = Deno.open('./index.html', { read: true })
      return new Response((await file).readable)
    }
  })
}
