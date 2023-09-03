function doPost(e) { 
  try{
    var update = JSON.parse(e.postData.contents);
    debug(update)

    if (update.hasOwnProperty('message')) var key = 'message';
    else if (update.hasOwnProperty('edited_message')) var key = 'edited_message';
    else if (update.hasOwnProperty('callback_query')) return callbackHandler(update)
    else if (update.hasOwnProperty('my_chat_member')) {
      const
        signal = update.my_chat_member,
        id = signal.chat?.id,
        chatType = signal.chat?.type

      if (signal.chat?.type === 'private' && signal.new_chat_member?.status === 'kicked'){
        return new User(id).loadData().setProgram('blocked').save()
      }
    }
    else return;

    return messageHandler(update[key]);
  } catch(err) {
    sendMessage(843444736, err.toString())
    
    BetterLog.useSpreadsheet().log(err)
    BetterLog.useSpreadsheet().log(err.stack)
    BetterLog.useSpreadsheet().log(update)
  }
}


function getUserdata(){
  let userdata = $.getUSER(MESSAGE.id)

  if (userdata) return USER = JSON.parse(userdata)
  else {
    const
      values = $.USER_TABLE.getDataRange().getValues(),
      mapping = {}

    values.shift().map((e, el) => mapping[e] = el)
    $.saveMapping(mapping)

    for (let i = values.length - 1; i > -1; i--){
      if (values[i][mapping.id] === MESSAGE.id){
        for (let key in mapping){
          USER[key] = values[i][ mapping[key] ]
        }
        return USER['row'] = i + 2;
      }
    }
  }
}
