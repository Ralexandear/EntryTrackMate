function setWebhook() {
  let url = $.TELEGRAM_URL + 'setWebhook?url=' + WEBAPP_URL;
  let resp = UrlFetchApp.fetch(url);
  Logger.log(resp)
}
 
function deleteWebhook() {
  let url = $.TELEGRAM_URL + 'deleteWebhook?url=' + WEBAPP_URL;
  let resp = UrlFetchApp.fetch(url);
  Logger.log(resp)
}


class Telegram {
  static get token (){
    return TELEGRAM_TOKEN
  }
  static get url (){
    return `https://api.telegram.org/bot${this.token}/`
  }
  static getKeyboard (buttons){
    return JSON.stringify({
      "keyboard": buttons,
      "resize_keyboard": true,
      "is_persistent": true,
    })
  }
  static getInlineKeyboard (buttons) {
    return JSON.stringify({
      "inline_keyboard": buttons,
    })
  }
  sendMessage(message) {
    const {text, reply_markup, entities, disable_web_page_preview, muteHttpExceptions, disable_notification} = message;
    
    let payload = {
      method: "sendMessage",
      chat_id: String(this.id),
      text: text,
      reply_markup,
      entities,
      disable_web_page_preview,
      disable_notification
    };

    let response = this.sendPostTelegram({payload, muteHttpExceptions});

    if (muteHttpExceptions){
      const responseCode = response.getResponseCode();

      if (responseCode !== 200){
        log(response)
        return
      }
    } 
    return JSON.parse(response).result
  }
  editMessageText(message){
    let {reply_markup,text, message_id, entities, disable_web_page_preview, muteHttpExceptions = false, disable_notification} = message;
    if (! message_id) message_id = this.messageId

    let payload = {
      method: "editMessageText",
      chat_id: String(this.id),
      message_id,
      text: text,
      reply_markup,
      entities,
      disable_web_page_preview,
      disable_notification
    };

    return JSON.parse(this.sendPostTelegram({payload, muteHttpExceptions})).result;
  }
  editMessageReplyMarkup(message_id = this.messageId, reply_markup = null){
    let payload = {
      method: "editMessageReplyMarkup",
      chat_id: String(this.id),
      message_id,
      reply_markup
    };

    return this.sendPostTelegram({payload, muteHttpExceptions: ! reply_markup}) //
  }
  static deleteMessage (message_id){
    let payload = {
      method: "deleteMessage",
      chat_id: String(id),
      message_id,
    };

    return this.sendPostTelegram({payload});
  }
  sendPostTelegram({payload, url = $.TELEGRAM_URL, muteHttpExceptions = false}){
    const data = {
      method: "POST",
      muteHttpExceptions,
      payload: payload
    };

    return UrlFetchApp.fetch(url, data);
  }
}

function sendMessage(id, text, {reply_markup, entities, disable_web_page_preview, muteHttpExceptions, disable_notification} = {}) {    
  let payload = {
    method: "sendMessage",
    chat_id: String(id),
    text: text,
    reply_markup,
    entities,
    disable_web_page_preview,
    disable_notification
  };

  let response = sendPostTelegram({payload, muteHttpExceptions});

  if (muteHttpExceptions){
    const responseCode = response.getResponseCode();

    if (responseCode !== 200){
      log(response)
      return
    }
  } 
  return JSON.parse(response).result
}

function sendPostTelegram({payload, url = $.TELEGRAM_URL, muteHttpExceptions = false}){
  const data = {
    method: "POST",
    muteHttpExceptions,
    payload: payload
  };

  return UrlFetchApp.fetch(url, data);
}
