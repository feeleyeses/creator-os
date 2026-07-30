(function (global) {
  const key = "creator-os-library-v2";
  const schemaVersion = 2;
  function read() {
    try { return JSON.parse(global.localStorage.getItem(key)) || []; }
    catch { return []; }
  }
  function write(records) { global.localStorage.setItem(key, JSON.stringify(records)); }
  function valid(record) { return Boolean(record && record.id && (record.title || record.expression || record.summary)); }
  const api = {
    key,
    schemaVersion,
    getAll() { return read().filter(valid); },
    save(snapshot) {
      if (!valid(snapshot)) return this.getAll();
      const records = [{ ...snapshot, schemaVersion, savedAt: snapshot.savedAt || new Date().toISOString() }, ...this.getAll().filter(item => item.id !== snapshot.id)];
      write(records);
      return records;
    },
    remove(id) {
      const records = this.getAll().filter(item => item.id !== id);
      write(records);
      return records;
    },
    updateNote(id, note) {
      const records = this.getAll().map(item => item.id === id ? { ...item, note } : item);
      write(records);
      return records;
    },
    updatePreference(id, preference) {
      const records = this.getAll().map(item => item.id === id ? { ...item, preference } : item);
      write(records);
      return records;
    },
    clearInvalid() {
      const original = read();
      const records = original.filter(valid);
      write(records);
      return { records, removed: original.length - records.length };
    }
  };
  global.CreatorOSLocalLibrary = api;
})(window);
