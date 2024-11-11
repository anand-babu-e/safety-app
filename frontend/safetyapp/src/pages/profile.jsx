import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import { ACCESS_TOKEN } from '../constants.jsx';

const Profile = ({ setIsLoggedIn }) => {
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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const authHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, contactsResponse, sosResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/user-details/', authHeader),
          axios.get('http://127.0.0.1:8000/api/emergency-contacts/', authHeader),
          axios.get('http://127.0.0.1:8000/api/sos-requests/', authHeader),
        ]);

        setUserData(userResponse.data);
        setEmergencyContacts(Array.isArray(contactsResponse.data) ? contactsResponse.data : []);
        setSosRequests(Array.isArray(sosResponse.data) ? sosResponse.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendSafeMessage = async (requestId) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/sos-requests/${requestId}/cancel/`, null, authHeader);

      if (response.status === 200) {
        setSosRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId ? { ...request, is_active: false } : request
          )
        );
        alert('Safe message sent successfully. SOS request is now inactive.');
      } else {
        console.error('Failed to cancel SOS request:', response);
      }
    } catch (error) {
      console.error('Error sending safe message:', error);
    }
  };

  const handleChange = (e, isEditing) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingContact({ ...editingContact, [name]: value });
    } else {
      setNewContact({ ...newContact, [name]: value });
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/emergency-contacts/${editingContact.id}/`,
        editingContact,
        authHeader
      );
      setEmergencyContacts((prevContacts) =>
        prevContacts.map((contact) => (contact.id === editingContact.id ? response.data : contact))
      );
      setEditingContact(null);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDeleteContact = async (contactId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/emergency-contacts/${contactId}/`, authHeader);
        setEmergencyContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== contactId));
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.phone || !newContact.email || !newContact.relationship) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/emergency-contacts/', newContact, authHeader);
      setEmergencyContacts((prevContacts) => [...prevContacts, response.data]);
      setNewContact({ name: '', phone: '', email: '', relationship: '' });
      setEditingContact(null);
    } catch (error) {
      console.error('Error adding contact:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.detail || 'Something went wrong'}`);
      }
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete('http://127.0.0.1:8000/api/delete-account/', authHeader);

      if (response.status === 200) {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/login');
      } else {
        alert("There was an issue deleting your account. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="profile-page">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="profile-info">
            <h2>Profile Information</h2>
            {userData && (
              <div>
                <p><strong>Name:</strong> {userData.username}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <button onClick={handleDeleteAccount} style={{ color: 'red' }}>Delete Account</button>
              </div>
            )}
          </div>

          <div className="emergency-contact">
            <h2>Emergency Contacts</h2>
            <button onClick={() => setEditingContact({})}>Add New Contact</button>
            {editingContact && editingContact.id === undefined ? (
              <div>
                <h3>Add New Contact</h3>
                {['name', 'phone', 'email', 'relationship'].map((field) => (
                  <input
                    key={field}
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={newContact[field]}
                    onChange={(e) => handleChange(e, false)}
                  />
                ))}
                <button onClick={handleAddContact}>Add</button>
                <button onClick={() => setEditingContact(null)}>Cancel</button>
              </div>
            ) : (
              emergencyContacts.map((contact) => (
                <div key={contact.id} className="details">
                  {editingContact && editingContact.id === contact.id ? (
                    <div>
                      {['name', 'phone', 'email', 'relationship'].map((field) => (
                        <input
                          key={field}
                          type={field === 'email' ? 'email' : 'text'}
                          name={field}
                          value={editingContact[field]}
                          onChange={(e) => handleChange(e, true)}
                        />
                      ))}
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={() => setEditingContact(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <p><strong>Name:</strong> {contact.name}</p>
                      <p><strong>Phone:</strong> {contact.phone}</p>
                      <p><strong>Email:</strong> {contact.email}</p>
                      <p><strong>Relationship:</strong> {contact.relationship}</p>
                      <button onClick={() => setEditingContact(contact)}>Edit</button>
                      <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="sos-req">
            <h2>SOS Requests</h2>
            {sosRequests.slice().reverse().map((request) => (
              <div key={request.id}>
                <p><strong>Request ID:</strong> {request.id}</p>
                <p><strong>Details:</strong> {request.emergency_type}, {request.message}</p>
                <p><strong>Request Status:</strong> {request.is_active ? 'Active' : 'Not Active'}</p>
                {request.is_active && (
                  <button onClick={() => handleSendSafeMessage(request.id)}>Send Safe Message</button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
