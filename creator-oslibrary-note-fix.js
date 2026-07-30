function saveNote(id) {
  const input = document.querySelector(`[data-note-id="${id}"]`);
  const value = input ? input.value.trim() : "";
  state.notes[id] = value;
  const saved = state.library.find(item => item.id === id);
  if (saved) saved.note = value;
  write(storageKeys.notes, state.notes);
  write(libraryV2Key, state.library);
  renderLibrary();
  bindActions();
}
