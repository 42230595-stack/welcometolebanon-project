import React, { useState, useEffect } from "react";
import '../styles/App.css'
import { cities } from "../Data";

function Bookings() {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [tableReservations, setTableReservations] = useState([]);
  const [editModal, setEditModal] = useState(null);

  useEffect(() => {
    const hb = localStorage.getItem("hotelBookings");
    const tr = localStorage.getItem("tableReservations");
    if (hb) setHotelBookings(JSON.parse(hb));
    if (tr) setTableReservations(JSON.parse(tr));
  }, []);

  useEffect(() => {
    localStorage.setItem("hotelBookings", JSON.stringify(hotelBookings));
  }, [hotelBookings]);

  useEffect(() => {
    localStorage.setItem("tableReservations", JSON.stringify(tableReservations));
  }, [tableReservations]);

  const openEditHotel = (bk) => {
    const city = cities.find((c) => c.name === bk.city);
    const hotelObj = city ? city.hotels.find((h) => h.name === bk.hotel) : null;
    setEditModal({
      type: "hotel",
      data: { ...bk },
      hotelObj
    });
  };

  const openEditReservation = (res) => {
    setEditModal({
      type: "reservation",
      data: { ...res }
    });
  };

  const saveHotelEdit = () => {
    const { data, hotelObj } = editModal;
    const people = Number(data.people);
    const nights = Number(data.nights);
    const services = data.services || [];
    const base = hotelObj ? hotelObj.pricePerNight * nights * people : 0;
    const servicesSum = services.reduce((sum, sName) => {
      const srv = hotelObj ? hotelObj.services.find((s) => s.name === sName) : null;
      return sum + (srv ? srv.price * nights * people : 0);
    }, 0);
    const total = base + servicesSum;
    const updated = { ...data, people, nights, services, total };
    setHotelBookings((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditModal(null);
  };

  const saveReservationEdit = () => {
    const updated = { ...editModal.data };
    setTableReservations((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditModal(null);
  };

  const cancelHotel = (id) => {
    setHotelBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const cancelReservation = (id) => {
    setTableReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const onHotelFieldChange = (field, value) => {
    setEditModal((em) => ({ ...em, data: { ...em.data, [field]: value } }));
  };

  const onReservationFieldChange = (field, value) => {
    setEditModal((em) => ({ ...em, data: { ...em.data, [field]: value } }));
  };

  const exportCSV = (type) => {
    const data = type === "hotels" ? hotelBookings : tableReservations;
    if (!data || data.length === 0) return;
    let headers = [];
    let rows = [];
    if (type === "hotels") {
      headers = ["id","city","hotel","people","nights","services","total"];
      rows = data.map(d => [
        d.id,
        d.city,
        d.hotel,
        d.people,
        d.nights,
        (d.services || []).join(";"),
        d.total
      ]);
    } else {
      headers = ["id","city","restaurant","time","people","price"];
      rows = data.map(d => [
        d.id,
        d.city,
        d.restaurant,
        d.time,
        d.people,
        d.price
      ]);
    }
    const csvContent = [headers.join(","), ...rows.map(r => r.map(String).map(s => `"${s.replace(/"/g,'""')}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = type === "hotels" ? "hotel_bookings.csv" : "table_reservations.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearTable = (type) => {
    if (!window.confirm("Are you sure you want to clear this table?")) return;
    if (type === "hotels") {
      setHotelBookings([]);
      localStorage.removeItem("hotelBookings");
    } else {
      setTableReservations([]);
      localStorage.removeItem("tableReservations");
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <div className="title">
          <h1>My Bookings</h1>
          <p className="muted">Manage your hotel bookings and table reservations</p>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn" onClick={()=>exportCSV("hotels")}>Export Hotels CSV</button>
          <button className="btn btn-ghost" onClick={()=>clearTable("hotels")}>Clear Hotel Bookings</button>
          <button className="btn" onClick={()=>exportCSV("tables")}>Export Tables CSV</button>
          <button className="btn btn-ghost" onClick={()=>clearTable("tables")}>Clear Table Reservations</button>
        </div>
      </div>

      <h2>Hotel Bookings</h2>
      <div className="table-wrap table-scroll">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>City</th>
              <th>Hotel</th>
              <th>People</th>
              <th>Nights</th>
              <th>Services</th>
              <th>Total</th>
              <th className="action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotelBookings.length === 0 && (
              <tr><td colSpan="8" className="center">No hotel bookings yet.</td></tr>
            )}
            {hotelBookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.city}</td>
                <td>{b.hotel}</td>
                <td>{b.people}</td>
                <td>{b.nights}</td>
                <td>{b.services && b.services.length ? b.services.join(", ") : "None"}</td>
                <td><span className="booking-total">${b.total}</span></td>
                <td className="table-actions">
                  <button className="btn btn-small" onClick={()=>openEditHotel(b)}>Edit</button>
                  <button className="btn btn-small btn-danger" onClick={()=>cancelHotel(b.id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{marginTop:20}}>Table Reservations</h2>
      <div className="table-wrap table-scroll">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>City</th>
              <th>Restaurant</th>
              <th>Time</th>
              <th>People</th>
              <th>Price</th>
              <th className="action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableReservations.length === 0 && (
              <tr><td colSpan="7" className="center">No table reservations yet.</td></tr>
            )}
            {tableReservations.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.city}</td>
                <td>{r.restaurant}</td>
                <td>{r.time}</td>
                <td>{r.people}</td>
                <td><span className="booking-total">${r.price}</span></td>
                <td className="table-actions">
                  <button className="btn btn-small" onClick={()=>openEditReservation(r)}>Edit</button>
                  <button className="btn btn-small btn-danger" onClick={()=>cancelReservation(r.id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editModal && editModal.type === "hotel" && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Booking - {editModal.data.hotel}</h3>
            <div>City: {editModal.data.city}</div>
            <label>People: <input type="number" min="1" value={editModal.data.people} onChange={(e)=>onHotelFieldChange("people", Number(e.target.value))} /></label>
            <label>Nights: <input type="number" min="1" value={editModal.data.nights} onChange={(e)=>onHotelFieldChange("nights", Number(e.target.value))} /></label>
            <h4>Services</h4>
            <div className="services-list-modal" style={{maxHeight:160,overflowY:"auto"}}>
              {editModal.hotelObj && editModal.hotelObj.services.map((s, idx) => (
                <label key={idx} style={{display:"block"}}>
                  <input
                    type="checkbox"
                    checked={editModal.data.services.includes(s.name)}
                    onChange={()=>{
                      const has = editModal.data.services.includes(s.name);
                      const newServices = has ? editModal.data.services.filter(x=>x!==s.name) : [...editModal.data.services, s.name];
                      onHotelFieldChange("services", newServices);
                    }}
                  />
                  {s.name} (+${s.price}/night)
                </label>
              ))}
            </div>
            <h4>New Total: ${(() => {
              const people = Number(editModal.data.people);
              const nights = Number(editModal.data.nights);
              const base = editModal.hotelObj ? editModal.hotelObj.pricePerNight * nights * people : 0;
              const servicesSum = (editModal.data.services || []).reduce((sum, sName) => {
                const srv = editModal.hotelObj ? editModal.hotelObj.services.find((s)=>s.name===sName) : null;
                return sum + (srv ? srv.price * nights * people : 0);
              },0);
              return base + servicesSum;
            })()}</h4>
            <div className="modal-actions">
              <button className="btn" onClick={saveHotelEdit}>Save</button>
              <button className="btn btn-ghost" onClick={()=>setEditModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {editModal && editModal.type === "reservation" && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Reservation - {editModal.data.restaurant}</h3>
            <div>City: {editModal.data.city}</div>
            <label>Time:
              <select value={editModal.data.time} onChange={(e)=>onReservationFieldChange("time", e.target.value)}>
                {(cities.find(c=>c.name===editModal.data.city) || {restaurants:[]}).restaurants
                  .find(r=>r.name===editModal.data.restaurant)?.times?.map((t, i)=><option key={i} value={t}>{t}</option>) || [<option key="na" value={editModal.data.time}>{editModal.data.time}</option>]}
              </select>
            </label>
            <label>People: <input type="number" min="1" value={editModal.data.people} onChange={(e)=>onReservationFieldChange("people", Number(e.target.value))} /></label>
            <div className="modal-actions">
              <button className="btn" onClick={saveReservationEdit}>Save</button>
              <button className="btn btn-ghost" onClick={()=>setEditModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;
