import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './AdminSetting.css'; // Import the CSS file

function AdminSetting() {
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [showRemoveAdmin, setShowRemoveAdmin] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handlers for Add Admin Modal
  const handleShowAddAdmin = () => setShowAddAdmin(true);
  const handleCloseAddAdmin = () => setShowAddAdmin(false);

  // Handlers for Remove Admin Modal
  const handleShowRemoveAdmin = () => setShowRemoveAdmin(true);
  const handleCloseRemoveAdmin = () => setShowRemoveAdmin(false);

  // Handlers for Change Password Modal
  const handleShowChangePassword = () => setShowChangePassword(true);
  const handleCloseChangePassword = () => setShowChangePassword(false);

  // Handle form submissions
  const handleAddAdmin = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/admin_add', {
        username: adminUsername,
        password: adminPassword,
      });
      console.log(adminUsername, adminPassword);
      alert('Admin added successfully');
    } catch (error) {
      console.error('There was an error adding the admin!', error);
      alert('Failed to add admin');
    }
    handleCloseAddAdmin();
  };

  const handleRemoveAdmin = async (event) => {
    event.preventDefault();
    if (!adminUsername) {
      alert('Username cannot be empty');
      return;
    }
    try {
      await axios.delete('http://localhost:3001/admin_delete', { data: { username: adminUsername } });
      alert('Admin removed successfully');
    } catch (error) {
      console.error('There was an error removing the admin!', error);
      alert('Failed to remove admin');
    }
    handleCloseRemoveAdmin();
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }
    try {
      await axios.put('http://localhost:3001/admin_update_password', {
        username: adminUsername,
        current_password: currentPassword,
        new_password: newPassword,
      });
      alert('Password changed successfully');
    } catch (error) {
      console.error('There was an error changing the password!', error);
      alert('Failed to change password');
    }
    handleCloseChangePassword();
  };

  return (
    <div className="admin-setting-container">
      <h1>Admin Settings</h1>
      <div className="button-group">
        <Button variant="primary" onClick={handleShowAddAdmin}>Add Admin</Button>
        <Button variant="danger" onClick={handleShowRemoveAdmin}>Remove Admin</Button>
        <Button variant="warning" onClick={handleShowChangePassword}>Change Admin Password</Button>
      </div>

      {/* Add Admin Modal */}
      <Modal show={showAddAdmin} onHide={handleCloseAddAdmin} className="fade-in">
        <Modal.Header closeButton>
          <Modal.Title>Add Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddAdmin}>
            <Form.Group controlId="formAddAdminUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                required
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formAddAdminPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Admin
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Remove Admin Modal */}
      <Modal show={showRemoveAdmin} onHide={handleCloseRemoveAdmin} className="fade-in">
        <Modal.Header closeButton>
          <Modal.Title>Remove Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRemoveAdmin}>
            <Form.Group controlId="formRemoveAdminUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                required
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
              />
            </Form.Group>
            <Button variant="danger" type="submit">
              Remove Admin
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Change Password Modal */}
      <Modal show={showChangePassword} onHide={handleCloseChangePassword} className="fade-in">
        <Modal.Header closeButton>
          <Modal.Title>Change Admin Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleChangePassword}>
            <Form.Group controlId="formChangePasswordUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                required
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formChangePasswordCurrentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Current Password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formChangePasswordNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formChangePasswordConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm New Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="warning" type="submit">
              Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminSetting;
