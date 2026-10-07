import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Modal from "../components/Modal";
import { notifySuccess, notifyInfo } from "../components/Toast";
import "../styles/components.css";
import "../styles/sidebar.css";

const CustomersPage = () => {
  const { customers, setCustomers } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "" });
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Filter customers by search
  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new customer
  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.email) {
      notifyInfo("Name and Email are required");
      return;
    }
    setCustomers([...customers, newCustomer]);
    setNewCustomer({ name: "", email: "", phone: "" });
    notifySuccess("Customer added successfully");
  };

  // Delete customer with confirmation
  const handleDeleteCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setCustomers(customers.filter((c) => c !== selectedCustomer));
    notifyInfo("Customer deleted");
    setShowModal(false);
  };

  return (
    <div className="customers-page">
      <h1>Customer Management</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search customers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Add Customer Form */}
      <form onSubmit={handleAddCustomer} className="customer-form">
        <input
          type="text"
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={newCustomer.phone}
          onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
        />
        <button type="submit">Add Customer</button>
      </form>

      {/* Customer List */}
      <div className="customer-list">
        {filteredCustomers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          filteredCustomers.map((c, i) => (
            <div key={i} className="customer-card">
              <h3>{c.name}</h3>
              <p>Email: {c.email}</p>
              <p>Phone: {c.phone || "N/A"}</p>
              <button onClick={() => handleDeleteCustomer(c)}>Delete</button>
            </div>
          ))
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <Modal
          message={`Delete customer ${selectedCustomer.name}?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CustomersPage