/**
 * NUI Message handler for QBCore
 */

import { NUICallback, NUIMessage } from '../types';

// Listen for NUI Messages from the game client
export const listenForNuiMessages = () => {
  window.addEventListener('message', (event) => {
    const { data } = event;
    
    if (!data.action) return;
    
    // Handle different NUI message types
    handleNuiMessage(data);
  });
};

// Handle play, create, delete
// sendNuiMessage('selectCharacter', { cid: 1 });
// sendNuiMessage('deleteCharacter', { cid: 1 });


// Send NUI messages to the game client
export const sendNuiMessage = (action: string, data: any = {}) => {
  fetch(`https://${GetParentResourceName()}/${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  }).then(resp => resp.json())
    .catch(error => console.error('Error sending NUI message:', error));
};

// Register NUI callback
export const registerNuiCallback = (action: string, callback: NUICallback) => {
  RegisterNuiCallbackType(action);
  on(`__cfx_nui:${action}`, (data: any, cb: (data: any) => void) => {
    callback(data);
    cb({ ok: true });
  });
};

// Mock global functions for development environment
if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  window.GetParentResourceName = () => 'qb-multicharacter';
  // @ts-ignore
  window.RegisterNuiCallbackType = () => {};
  // @ts-ignore
  window.on = () => {};
}

// Handle incoming NUI messages
const handleNuiMessage = (message: NUIMessage) => {
  const { action, data } = message;
  
  switch (action) {
    case 'setupCharacters':
      window.dispatchEvent(new CustomEvent('qb:setupCharacters', { detail: data }));
      break;
    case 'refreshCharacters':
      window.dispatchEvent(new CustomEvent('qb:refreshCharacters', { detail: data }));
      break;
    case 'openUI':
      document.body.style.display = 'block';
      window.dispatchEvent(new CustomEvent('qb:openUI', { detail: data }));
      break;
    case 'closeUI':
      document.body.style.display = 'none';
      window.dispatchEvent(new CustomEvent('qb:closeUI'));
      break;
    default:
      console.log(`Unknown NUI action: ${action}`);
  }
};