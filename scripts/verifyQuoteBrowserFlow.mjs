const [target] = await (await fetch("http://127.0.0.1:9222/json")).json();

if (!target?.webSocketDebuggerUrl) {
  throw new Error("Nenhuma página de teste com DevTools remoto foi encontrada.");
}

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let nextId = 1;
const pending = new Map();
socket.addEventListener("message", event => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
});

function evaluate(expression, awaitPromise = true) {
  const id = nextId++;
  socket.send(JSON.stringify({ id, method: "Runtime.evaluate", params: { expression, awaitPromise, returnByValue: true, userGesture: true } }));
  return new Promise((resolve, reject) => {
    pending.set(id, message => {
      if (message.error || message.result.exceptionDetails) {
        reject(new Error(message.error?.message || message.result.exceptionDetails.text));
        return;
      }
      resolve(message.result.result.value);
    });
  });
}

const smallPng = [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137, 0, 0, 0, 13, 73, 68, 65, 84, 8, 215, 99, 248, 207, 192, 240, 31, 0, 5, 0, 1, 255, 137, 153, 61, 29, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130];

await evaluate(`(() => {
  const setValue = (name, value) => {
    const input = document.querySelector('[name="' + name + '"]');
    const prototype = input instanceof HTMLSelectElement
      ? HTMLSelectElement.prototype
      : input instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, 'value').set.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  };
  setValue('nome', 'Teste de Orçamento');
  setValue('telefone', '(42) 99999-0000');
  setValue('servico', 'Películas automotivas');
  setValue('aplicacao', 'SUV de teste');
  setValue('cidade', 'Telêmaco Borba');
  setValue('prazo', 'Neste mês');
  setValue('necessidade', 'Verificação automatizada do fluxo de orçamento.');
  const png = new Uint8Array(${JSON.stringify(smallPng)});
  const input = document.querySelector('#quote-attachments');
  const data = new DataTransfer();
  data.items.add(new File([png], 'referencia.png', { type: 'image/png' }));
  Object.defineProperty(input, 'files', { configurable: true, value: data.files });
  input.dispatchEvent(new Event('change', { bubbles: true }));
})()`);

await new Promise(resolve => setTimeout(resolve, 250));
const previewCount = await evaluate(`document.querySelectorAll('.quote-attachments__preview').length`);

await evaluate(`(() => {
  const input = document.querySelector('#quote-attachments');
  const data = new DataTransfer();
  data.items.add(new File(['texto'], 'invalido.txt', { type: 'text/plain' }));
  Object.defineProperty(input, 'files', { configurable: true, value: data.files });
  input.dispatchEvent(new Event('change', { bubbles: true }));
})()`);
await new Promise(resolve => setTimeout(resolve, 100));
const invalidTypeMessage = await evaluate(`document.querySelector('.quote-attachments__error')?.textContent || ''`);

await evaluate(`(() => {
  window.__quoteCapture = '';
  window.open = () => ({ opener: null, location: { set href(value) { window.__quoteCapture = value; } } });
  document.querySelector('.quote-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
})()`);
await new Promise(resolve => setTimeout(resolve, 1600));
const whatsappUrl = await evaluate(`window.__quoteCapture`);

const result = { previewCount, invalidTypeMessage, whatsappHasMessage: whatsappUrl.includes('wa.me/5542991489798?text='), whatsappHasAttachment: whatsappUrl.includes('Fotos%20para%20refer%C3%AAncia') };
if (result.previewCount !== 1 || !result.invalidTypeMessage.includes('JPG, PNG ou WebP') || !result.whatsappHasMessage || !result.whatsappHasAttachment) {
  throw new Error(`Validação interativa incompleta: ${JSON.stringify(result)}`);
}

console.log(JSON.stringify(result, null, 2));
socket.close();
