const log = Logger.log



const
  getCurrentDate_ = ({currentDate = new Date(), user}) => new Date(Utilities.formatDate(currentDate ? new Date(currentDate) : new Date(), user.timezone, 'yyyy-MM-dd')),
  getDayDifference_ = (timeDifference) => Math.round(timeDifference / 86400000),
  getDatestring_ = (date, user) => new Date(date).toLocaleDateString(user.language, $.DATE_OPTIONS),
  keyboardToInline_ = (keyboard) => keyboard.map(row => {row.forEach(e => e.callback_data = e.text); return row}),
  debug = (contents) => {
    let range = $.getSheet("JSON")
      .getRange(1, 1)
      .insertCells(SpreadsheetApp.Dimension.ROWS)

    if (typeof contents === 'object') return range.setValue(JSON.stringify(contents, null, 7));
    range.setValue(contents);
  }



class Freeze {
  static activate({user, botCommand}){
    $.cache.put('FREEZE_' + user.id, botCommand, 4)
  }
  static check({user, botCommand}){
    return $.cache.get('FREEZE_' + user.id) === botCommand
  }
}


class Message{
  constructor(text){
    this.text = text
  }
  setText(data){
    this.text = data
    return this
  }
  setReplyMarkup(data){
    if (! data) return  this

    if (typeof data !== 'object') throw 'setKeyboard: Unsupported type'
    
    if (data[0]?.[0] === undefined) throw 'Cannot get buttons from undefined!'
    if (data[0][0].hasOwnProperty('callback_data')) data = Telegram.getInlineKeyboard(data)
    else data = Telegram.getKeyboard(data)

    this.reply_markup = data
    return this
  }
  muteExceptions (){
    this.muteHttpExceptions = true
    return this
  }
}



class $ {
  static get DATE_OPTIONS(){
    return{
      weekday: "long",
      month: "short",
      day: "numeric",
      year: 'numeric'
    }
  }
  static get EMOJI_REGEX(){
    return /[^\p{Emoji}]/gu
  }
  static get SS() {
    return $["_SS"] ?? ($["_SS"] = SpreadsheetApp.getActive())
  }
  static getSheet(sheetName){
    return $.SS.getSheetByName(sheetName)
  }
  static get TELEGRAM_URL() {
    return $["_TELEGRAM_URL"] ?? ($["_TELEGRAM_URL"] = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/`)
  }
  static get USER_TABLE(){
    return $["_USER_TABLE"] ?? ($["_USER_TABLE"] = $.getSheet(USER_TABLE))
  }
  static get CACHE(){
    return $['_CACHE'] ?? ( $['_CACHE'] = CacheService.getScriptCache() )
  }
  static get cache(){
    return this._cache ?? (this._cache = CacheService.getScriptCache())
  }
  static get properties(){
    return $['_properties'] ?? ( $['_properties'] = PropertiesService.getScriptProperties() )
  }
  static getUSER(userId){
    return $.CACHE.get(String(userId))
  }
  static saveUSER(){
    $.CACHE.put(String(MESSAGE.id), JSON.stringify(USER))
  }
  static saveMapping(mapping){
    $.properties.setProperty('mapping', JSON.stringify( $['_MAPPING'] = mapping ))
  }
  static get mapping(){
    return $['_mapping'] ?? ( $['_mapping'] = new Map(JSON.parse($.properties.getProperty('mapping'))))
  }
}






