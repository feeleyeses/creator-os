(function () {
  function closest(event, selector) {
    return event.target && event.target.closest ? event.target.closest(selector) : null;
  }

  function handled(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  document.addEventListener("click", function guardCreatorOSInteractions(event) {
    const save = closest(event, "[data-save]");
    if (save) {
      handled(event);
      toggleSave(save.dataset.save);
      return;
    }

    const preference = closest(event, "[data-preference]");
    if (preference) {
      handled(event);
      setPreference(preference.dataset.preference, preference.dataset.value);
      return;
    }

    const remove = closest(event, "[data-remove]");
    if (remove) {
      handled(event);
      removeFromLibrary(remove.dataset.remove);
      return;
    }

    const note = closest(event, "[data-save-note]");
    if (note) {
      handled(event);
      saveNote(note.dataset.saveNote);
      return;
    }

    const language = closest(event, "[data-language]");
    if (language) {
      handled(event);
      setLanguage(language.dataset.language);
      return;
    }

    const filter = closest(event, "[data-filter]");
    if (filter) {
      handled(event);
      setObserveFilter(filter.dataset.filter);
      return;
    }

    const languageFilter = closest(event, "[data-language-filter]");
    if (languageFilter) {
      handled(event);
      state.languageFilter = languageFilter.dataset.languageFilter;
      renderLanguage();
      bindActions();
      return;
    }

    const lessonToggle = closest(event, "[data-lesson-toggle]");
    if (lessonToggle) {
      handled(event);
      const id = lessonToggle.dataset.lessonToggle;
      state.expandedLessons[id] = !state.expandedLessons[id];
      renderLanguage();
      bindActions();
      return;
    }

    const brief = closest(event, "[data-brief-observe]");
    if (brief) {
      handled(event);
      openBriefItem(brief.dataset.briefObserve, brief.dataset.briefCategory);
      return;
    }

    const librarySource = closest(event, "[data-library-source]");
    if (librarySource) {
      handled(event);
      state.libraryFilter.source = librarySource.dataset.librarySource;
      renderLibrary();
      bindActions();
      return;
    }

    const libraryPage = closest(event, "[data-library-page]");
    if (libraryPage) {
      handled(event);
      state.libraryFilter.page = libraryPage.dataset.libraryPage;
      renderLibrary();
      bindActions();
      return;
    }

    const libraryLanguage = closest(event, "[data-library-language]");
    if (libraryLanguage) {
      handled(event);
      state.libraryFilter.language = libraryLanguage.dataset.libraryLanguage;
      renderLibrary();
      bindActions();
      return;
    }

    const libraryTag = closest(event, "[data-library-tag]");
    if (libraryTag) {
      handled(event);
      state.libraryFilter.tag = libraryTag.dataset.libraryTag;
      renderLibrary();
      bindActions();
      return;
    }

    const clearInvalid = closest(event, "[data-clear-invalid]");
    if (clearInvalid) {
      handled(event);
      clearInvalidLibraryRecords();
    }
  }, true);
})();