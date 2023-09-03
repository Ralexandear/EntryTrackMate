function getDatabase() {
  if (this['_database']) return this['_database'];

  const range = $.USER_TABLE.getDataRange()
  const values = range.getValues();
  const notes = range.getNotes()
  const objectEntries = values.shift().map((e, el) => [e, el])
  const mapping = new Map (objectEntries)
  
  notes.shift()

  $.saveMapping(objectEntries)
  return this['_database'] = {mapping, values, notes}
}

