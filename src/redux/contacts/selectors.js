import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter, selectNumberFilter } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter, selectNumberFilter],
  (contacts, findNameFilter, findNumberFilter) => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(findNameFilter.toLowerCase()) &&
        contact.number.includes(findNumberFilter)
    );
  }
);
