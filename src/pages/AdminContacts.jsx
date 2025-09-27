import React, { useEffect, useState } from "react";
import { api_base_url } from "../helper";
import Navbar from "../components/Navbar";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch(api_base_url + "/api/contacts/getContacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setContacts(data.contacts);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-6 md:px-8 lg:px-[100px] mt-4 md:mt-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4">📩 User Messages</h2>
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact._id} className="bg-gray-800 p-4 rounded-lg">
              <p>
                <b>Name:</b> {contact.name}
              </p>
              <p>
                <b>Email:</b> {contact.email}
              </p>
              <p>
                <b>Message:</b> {contact.message}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(contact.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminContacts;
