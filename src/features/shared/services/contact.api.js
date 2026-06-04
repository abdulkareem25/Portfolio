import axios from 'axios';

const CONTACT_URL = 'http://localhost:3000/api/contacts';

/**
 * Send a contact message (public)
 * @param {{ name: string, email: string, subject?: string, message: string }} payload
 */
export const sendContactMessage = (payload) =>
  axios.post(CONTACT_URL, payload);
