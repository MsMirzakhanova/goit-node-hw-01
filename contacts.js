const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const removedContact = contacts.find(item => item.id === contactId); 
    const NewContactList = contacts.filter(item => item.id ==! contactId); 
    fs.writeFile(contactsPath, JSON.stringify(NewContactList));
    return removedContact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContacts = { name, email, phone, id: v4() };
    contacts.push(newContacts);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContacts;
}

module.exports = {
listContacts,
getContactById,
removeContact,
addContact
};