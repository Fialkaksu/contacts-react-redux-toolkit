import { createSlice, nanoid } from '@reduxjs/toolkit';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import initialContacts from '../initialContacts.json';

const contactsInitialState = initialContacts || [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: contactsInitialState,
  },
  reducers: {
    addContact: {
      reducer(state, action) {
        const { name, number } = action.payload;
        if (
          state.items.find(
            contact => contact.name === name || contact.number === number
          )
        ) {
          iziToast.warning({
            position: 'topRight',
            message: 'This name or number is already exists',
          });
          return;
        }
        state.items.push(action.payload);
      },
      prepare({ name, number }) {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.items.findIndex(
        contact => contact.id === action.payload
      );
      state.items.splice(index, 1);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
export const selectContacts = state => state.contacts.items;
