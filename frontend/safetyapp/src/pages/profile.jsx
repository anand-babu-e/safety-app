// import React, { useContext, useState } from 'react';
// import { AlertContext } from './alertcontext';
// import '../styles/Profile.css';

// const Profile = () => {
//   const [name, setName] = useState('John Doe');
//   const [email, setEmail] = useState('john@example.com');
//   const [password, setPassword] = useState('');
//   const [emergencyContacts, setEmergencyContacts] = useState([
//     { name: 'Jane Doe', phone: '1234567890', email: 'jane@example.com', relationship:'' }
//   ]);

//   const { alertMessage, setAlertMessage } = useContext(AlertContext);
//   const [message, setMessage] = useState(alertMessage);

//   const [alertHistory, setAlertHistory] = useState([]);
//   const [safeMessage, setSafeMessage] = useState('I am safe now.');
//   const [location, setLocation] = useState(null);

//   const [editing, setEditing] = useState({
//     name: false,
//     email: false,
//     password: false,
//     emergencyContacts: false,
//     alertMessage: false,
//   });

//   const toggleEdit = (field) => {
//     setEditing({ ...editing, [field]: !editing[field] });
//   };

//   const handleAddContact = () => {
//     if (emergencyContacts.length < 3) {
//       setEmergencyContacts([...emergencyContacts, { name: '', phone: '', email: '', relationship:'' }]);
//     } else {
//       alert('You can only add up to 3 emergency contacts.');
//     }
//   };

//   const updateContact = (index, key, value) => {
//     setEmergencyContacts(
//       emergencyContacts.map((contact, i) => (i === index ? { ...contact, [key]: value } : contact))
//     );
//   };

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//           sendAlertWithLocation(position.coords.latitude, position.coords.longitude);
//         },
//         (error) => {
//           alert('Unable to retrieve location. Please enable location permissions.');
//         }
//       );
//     } else {
//       alert('Geolocation is not supported by this browser.');
//     }
//   };

//   const sendAlertWithLocation = (latitude, longitude) => {
//     const fullAlertMessage = `${alertMessage}\nLocation: https://www.google.com/maps?q=${latitude},${longitude}`;
//     setAlertHistory([...alertHistory, { id: Date.now(), message: fullAlertMessage }]);
//     alert('Alert sent with location: ' + fullAlertMessage);
//   };

//   const revokeAlert = (alertId) => {
//     alert('Revoke alert: ' + safeMessage);
//     setAlertHistory(alertHistory.filter((alert) => alert.id !== alertId));
//   };

//   const handleSaveAlertMessage = () => {
//     setAlertMessage(message);
//     toggleEdit('alertMessage');
//     alert("Alert message updated!");
//   };

//   return (
//     <div className="profile-page">
//       <section>
//         <h3>Profile Information</h3>
//         <div>
//           <label>Name: </label>
//           {editing.name ? (
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//           ) : (
//             <span>{name}</span>
//           )}
//           <button onClick={() => toggleEdit('name')}>{editing.name ? 'Save' : 'Edit'}</button>
//         </div>

//         <div>
//           <label>Email: </label>
//           {editing.email ? (
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           ) : (
//             <span>{email}</span>
//           )}
//           <button onClick={() => toggleEdit('email')}>{editing.email ? 'Save' : 'Edit'}</button>
//         </div>

//         <div>
//           <label>Password: </label>
//           {editing.password ? (
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           ) : (
//             <span>••••••••</span>
//           )}
//           <button onClick={() => toggleEdit('password')}>{editing.password ? 'Save' : 'Edit'}</button>
//         </div>

//         {/* <div>
//           <label>Mobile Number: </label>
//           {editing.mobileNumber ? (
//             <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
//           ) : (
//             <span>{mobileNumber}</span>
//           )}
//           <button onClick={() => toggleEdit('mobileNumber')}>{editing.mobileNumber ? 'Save' : 'Edit'}</button>
//         </div> */}
//       </section>

//       <section>
//         <h3>Emergency Contacts</h3>
//         {emergencyContacts.map((contact, index) => (
//           <div key={index}>
//             <label>{index+1}.</label>
//             <br/>
//             <label>Contact Name: </label>
//             {editing.emergencyContacts ? (
//               <input
//                 type="text"
//                 value={contact.name}
//                 onChange={(e) => updateContact(index, 'name', e.target.value)}
//               />
//             ) : (
//               <span>{contact.name}</span>
//             )}
//             <br/>
//             <label>Phone: </label>
//             {editing.emergencyContacts ? (
//               <input
//                 type="text"
//                 value={contact.phone}
//                 onChange={(e) => updateContact(index, 'phone', e.target.value)}
//               />
//             ) : (
//               <span>{contact.phone}</span>
//             )}
//             <br/>
//             <label>Email: </label>
//             {editing.emergencyContacts ? (
//               <input
//                 type="email"
//                 value={contact.email}
//                 onChange={(e) => updateContact(index, 'email', e.target.value)}
//               />
//             ) : (
//               <span>{contact.email}</span>
//             )}
//             <br/>
//             <label>Relationship: </label>
//             {editing.emergencyContacts ? (
//               <input
//                 type="test"
//                 value={contact.relationship}
//                 onChange={(e) => updateContact(index, 'relationship', e.target.value)}
//               />
//             ) : (
//               <span>{contact.relationship}</span>
//             )}
//           </div>
//         ))}
//         <button onClick={() => toggleEdit('emergencyContacts')}>
//           {editing.emergencyContacts ? 'Save Contacts' : 'Edit Contacts'}
//         </button>
//         {emergencyContacts.length < 3 && <button onClick={handleAddContact}>Add Contact</button>}
//       </section>


//       {/* <section>
//         <h3>Alert Message Content</h3>
//         <div>
//           <label>Alert Message: </label>
//           {editing.alertMessage ? (
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//           ) : (
//             <span>{alertMessage}</span>
//           )}
//           <button onClick={() => toggleEdit('alertMessage')}>
//             {editing.alertMessage ? 'Cancel' : 'Edit'}
//           </button>
//           {editing.alertMessage && <button onClick={handleSaveAlertMessage}>Save Alert Message</button>}
//         </div>
//       </section> */}

//       <section>
//         <h3>Track Alerts Disseminated</h3>
//         <ul>
//           {alertHistory.map((alert) => (
//             <li key={alert.id}>
//               <span>{alert.message}</span>
//               <button onClick={() => revokeAlert(alert.id)}>Send Safe Message</button>
//             </li>
//           ))}
//         </ul>
//         <button onClick={getLocation}>Send Alert with Location</button>
//       </section>
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Profile.css';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants.jsx';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [sosRequests, setSosRequests] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
  });

  useEffect(() => {
    // Fetch user data
    axios.get('http://127.0.0.1:8000/api/user-details/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
      .then((response) => setUserData(response.data))
      .catch((error) => console.error(error));

    // Fetch emergency contacts
    axios.get('http://127.0.0.1:8000/api/emergency-contacts/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
      .then((response) => setEmergencyContacts(Array.isArray(response.data) ? response.data : []))
      .catch((error) => console.error(error));

    // Fetch SOS requests
    axios.get('http://127.0.0.1:8000/api/sos-requests/', {
      headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` },
    })
      .then((response) => setSosRequests(Array.isArray(response.data) ? response.data : []))
      .catch((error) => console.error(error));
  }, []);

  const handleSendSafeMessage = (requestId) => {
    axios.post(`http://127.0.0.1:8000/api/sos-requests/${requestId}/safe-message/`, null, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` },
    })
      .then(() => {
        alert('Safe message sent successfully.');
      })
      .catch((error) => console.error('Error sending safe message:', error));
  };

  const handleEditContact = (contact) => setEditingContact(contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingContact({ ...editingContact, [name]: value });
  };

  const handleSaveEdit = () => {
    axios.put(`http://127.0.0.1:8000/api/emergency-contacts/${editingContact.id}/`, editingContact, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
      .then((response) => {
        const updatedContacts = emergencyContacts.map((contact) =>
          contact.id === editingContact.id ? response.data : contact
        );
        setEmergencyContacts(updatedContacts);
        setEditingContact(null);
      })
      .catch((error) => console.error('Error updating contact:', error));
  };

  const handleCancelEdit = () => setEditingContact(null);

  const handleDeleteContact = (contactId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
    if (confirmDelete) {
      axios.delete(`http://127.0.0.1:8000/api/emergency-contacts/${contactId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
        .then(() => setEmergencyContacts(emergencyContacts.filter((contact) => contact.id !== contactId)))
        .catch((error) => console.error('Error deleting contact:', error));
    }
  };

  const handleAddContactChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleAddContact = () => {
    axios.post('http://127.0.0.1:8000/api/emergency-contacts/', newContact, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
      .then((response) => {
        setEmergencyContacts([...emergencyContacts, response.data]);
        setNewContact({
          name: '',
          phone: '',
          email: '',
          relationship: '',
        });
      })
      .catch((error) => console.error('Error adding contact:', error));
  };

  return (
    <div className='profile-page'>
      <h2>Profile Information</h2>
      {userData && (
        <div>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      )}

      <h2>Emergency Contacts</h2>
      <button onClick={() => setEditingContact({})}>Add New Contact</button>

      {editingContact && editingContact.id === undefined ? (
        <div>
          <h3>Add New Contact</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newContact.name}
            onChange={handleAddContactChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newContact.phone}
            onChange={handleAddContactChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newContact.email}
            onChange={handleAddContactChange}
          />
          <input
            type="text"
            name="relationship"
            placeholder="Relationship"
            value={newContact.relationship}
            onChange={handleAddContactChange}
          />
          <button onClick={handleAddContact}>Add</button>
          <button onClick={() => setEditingContact(null)}>Cancel</button>
        </div>
      ) : (
        emergencyContacts.map(contact => (
          <div key={contact.id}>
            {editingContact && editingContact.id === contact.id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={editingContact.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="phone"
                  value={editingContact.phone}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  value={editingContact.email}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="relationship"
                  value={editingContact.relationship}
                  onChange={handleChange}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <p><strong>Name:</strong> {contact.name}</p>
                <p><strong>Phone:</strong> {contact.phone}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Relationship:</strong> {contact.relationship}</p>
                <button onClick={() => handleEditContact(contact)}>Edit</button>
                <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      )}
<h2>SOS Requests</h2>
{sosRequests.slice().reverse().map((request) => (
  <div key={request.id}>
    <p><strong>Request ID:</strong> {request.id}</p>
    <p><strong>Details:</strong> {request.emergency_type},<br />{request.message}</p>
    <button onClick={() => handleSendSafeMessage(request.id)}>Send Safe Message</button>
  </div>
))}
</div>
  );
};

export default Profile;
