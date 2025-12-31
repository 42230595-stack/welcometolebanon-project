import React, { useEffect, useState } from "react";
import "../styles/App.css";
import { cities } from "../Data";

function Bookings() {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [tableReservations, setTableReservations] = useState([]);
  const [editModal, setEditModal] = useState(null);

  useEffect(() => {
    const hb = JSON.parse(localStorage.getItem("hotelBookings")) || [];
    const tr = JSON.parse(localStorage.getItem("tableReservations")) || [];
    setHotelBookings(hb);
    setTableReservations(tr);
  }, []);

  const cancelHotel = (id) => {
    const updated = hotelBookings.filter((b) => b.id !== id);
    setHotelBookings(updated);
    localStorage.setItem("hotelBookings", JSON.stringify(updated));
  };

  const cancelReservation = (id) => {
    const updated = tableReservations.filter((r) => r.id !== id);
    setTableReservations(updated);
    localStorage.setItem("tableReservations", JSON.stringify(updated));
  };

  const openEditHotel = (bk) => {
    const city = cities.find((c) => c.name === bk.city);
    const hotelObj = city ? city.hotels.find((h) => h.name === bk.hotel) : null;
    setEditModal({ type: "hotel", data: { ...bk }, hotelObj });
  };

  const saveHotelEdit = () => {
    const { data, hotelObj } = editModal;
    const people = Number(data.people);
    const nights = Number(data.nights);
    const services = data.services || [];

    const base = hotelObj ? hotelObj.pricePerNight * people * nights : 0;
    const servicesSum = services.reduce((s, n) => {
      const srv = hotelObj.services.find((x) => x.name === n);
      return s + (srv ? srv.price * people * nights : 0);
    }, 0);

    const updatedBooking = { ...data, people, nights, services, total: base + servicesSum };

    const updated = hotelBookings.map((b) =>
      b.id === updatedBooking.id ? updatedBooking : b
    );

    setHotelBookings(updated);
    localStorage.setItem("hotelBookings", JSON.stringify(updated));
    setEditModal(null);
  };

  return (
    <div className="container">
      <h1>My Bookings</h1>

      <h2>Hotel Bookings</h2>
      {hotelBookings.length === 0 && <p>No hotel bookings yet.</p>}

      <table className="bookings-table">
        <thead>
          <tr>
            <th>City</th>
            <th>Hotel</th>
            <th>People</th>
            <th>Nights</th>
            <th>Services</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotelBookings.map((b) => (
            <tr key={b.id}>
              <td>{b.city}</td>
              <td>{b.hotel}</td>
              <td>{b.people}</td>
              <td>{b.nights}</td>
              <td>{b.services.length ? b.services.join(", ") : "None"}</td>
              <td>${b.total}</td>
              <td>
                <button className="btn btn-small" onClick={() => openEditHotel(b)}>Edit</button>
                <button className="btn btn-small btn-danger" onClick={() => cancelHotel(b.id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 30 }}>Table Reservations</h2>
      {tableReservations.length === 0 && <p>No table reservations yet.</p>}

      <table className="bookings-table">
        <thead>
          <tr>
            <th>City</th>
            <th>Restaurant</th>
            <th>Time</th>
            <th>People</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableReservations.map((r) => (
            <tr key={r.id}>
              <td>{r.city}</td>
              <td>{r.restaurant}</td>
              <td>{r.time}</td>
              <td>{r.people}</td>
              <td>${r.price}</td>
              <td>
                <button className="btn btn-small btn-danger" onClick={() => cancelReservation(r.id)}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editModal && editModal.type === "hotel" && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit {editModal.data.hotel}</h3>

            <label>
              People:
              <input
                type="number"
                min="1"
                value={editModal.data.people}
                onChange={(e) =>
                  setEditModal({
                    ...editModal,
                    data: { ...editModal.data, people: Number(e.target.value) }
                  })
                }
              />
            </label>

            <label>
              Nights:
              <input
                type="number"
                min="1"
                value={editModal.data.nights}
                onChange={(e) =>
                  setEditModal({
                    ...editModal,
                    data: { ...editModal.data, nights: Number(e.target.value) }
                  })
                }
              />
            </label>

            <div className="modal-actions">
              <button className="btn" onClick={saveHotelEdit}>Save</button>
              <button className="btn btn-ghost" onClick={() => setEditModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;
