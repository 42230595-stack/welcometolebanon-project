import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../styles/App.css'
import { cities } from "../Data";

function City() {
  const { name } = useParams();
  const city = cities.find((c) => c.name === name);
  const [hotelModal, setHotelModal] = useState(null);
  const [restModal, setRestModal] = useState(null);
  const [people, setPeople] = useState(1);
  const [nights, setNights] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const b = localStorage.getItem("hotelBookings");
    const r = localStorage.getItem("tableReservations");
    if (b) setBookings(JSON.parse(b));
    if (r) setReservations(JSON.parse(r));
  }, []);

  useEffect(() => {
    localStorage.setItem("hotelBookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("tableReservations", JSON.stringify(reservations));
  }, [reservations]);

  if (!city) return <div className="container"><h2>City not found</h2></div>;

  const openBooking = (hotel) => {
    setHotelModal(hotel);
    setPeople(1);
    setNights(1);
    setSelectedServices([]);
  };

  const toggleService = (sName) => {
    setSelectedServices((prev) => (prev.includes(sName) ? prev.filter((x) => x !== sName) : [...prev, sName]));
  };

  const calcTotal = () => {
    if (!hotelModal) return 0;
    const base = hotelModal.pricePerNight * nights * people;
    const servicesSum = selectedServices.reduce((sum, sName) => {
      const srv = hotelModal.services.find((s) => s.name === sName);
      return sum + (srv ? srv.price * nights * people : 0);
    }, 0);
    return base + servicesSum;
  };

  const confirmBooking = () => {
    const booking = {
      id: Date.now(),
      city: city.name,
      hotel: hotelModal.name,
      people,
      nights,
      services: selectedServices,
      total: calcTotal()
    };
    setBookings((b) => [booking, ...b]);
    setHotelModal(null);
  };

  const cancelBooking = (id) => {
    setBookings((b) => b.filter((bk) => bk.id !== id));
  };

  const openRestaurant = (rest) => {
    setRestModal({ ...rest, time: rest.times[0], people: 2 });
  };

  const confirmReservation = () => {
    const res = {
      id: Date.now(),
      city: city.name,
      restaurant: restModal.name,
      time: restModal.time,
      people: restModal.people,
      price: restModal.reservationPrice
    };
    setReservations((r) => [res, ...r]);
    setRestModal(null);
  };

  const cancelReservation = (id) => {
    setReservations((r) => r.filter((x) => x.id !== id));
  };

  return (
    <div className="container">
      <h1>{city.name}</h1>
      <p>{city.description}</p>
      <h2>Landmarks</h2>
      <section className="landmarks-grid">
        {city.images.map((lm, i) => (
          <div key={i} className="landmark-card card">
            <img src={lm.src} alt={lm.name} />
            <div className="card-body">
              <div className="title">{lm.name}</div>
            </div>
          </div>
        ))}
      </section>
      <h2>Hotels</h2>
      <div className="hotels-grid">
        {city.hotels.map((h, idx) => (
          <div className="hotel-card card" key={idx} role="button" tabIndex="0" onClick={() => openBooking(h)} onKeyDown={(e)=>{ if(e.key==="Enter") openBooking(h); }}>
            <img src={h.image} alt={h.name} />
            <div className="hotel-body card-body">
              <div className="hotel-title">
                <h3 className="title">{h.name}</h3>
                <div className="stars">{Array.from({ length: h.stars }).map((_, i) => <span key={i}>★</span>)}</div>
              </div>
              <div className="hotel-price">${h.pricePerNight} / night</div>
              <button className="btn" onClick={(ev)=>{ ev.stopPropagation(); openBooking(h); }}>View & Book</button>
            </div>
          </div>
        ))}
      </div>
      <h2>Restaurants</h2>
      <div className="restaurants-grid">
        {city.restaurants.map((r, i) => (
          <div className="restaurant-card card" key={i} role="button" tabIndex="0" onClick={() => openRestaurant(r)} onKeyDown={(e)=>{ if(e.key==="Enter") openRestaurant(r); }}>
            <img src={r.image} alt={r.name} />
            <div className="restaurant-body card-body">
              <h3 className="title">{r.name}</h3>
              <div className="muted">Reservation fee: ${r.reservationPrice}</div>
              <button className="btn" onClick={(ev)=>{ ev.stopPropagation(); openRestaurant(r); }}>Reserve Table</button>
            </div>
          </div>
        ))}
      </div>
      {hotelModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{hotelModal.name}</h3>
            <div>Price per night: ${hotelModal.pricePerNight}</div>
            <label>People: <input type="number" min="1" value={people} onChange={(e)=>setPeople(Number(e.target.value))} /></label>
            <label>Nights: <input type="number" min="1" value={nights} onChange={(e)=>setNights(Number(e.target.value))} /></label>
            <h4>Services</h4>
            <div className="services-list-modal">
              {hotelModal.services.map((s, i) => (
                <label key={i}>
                  <input type="checkbox" checked={selectedServices.includes(s.name)} onChange={()=>toggleService(s.name)} />
                  {s.name} (+${s.price}/night)
                </label>
              ))}
            </div>
            <h4>Total: ${calcTotal()}</h4>
            <div className="modal-actions">
              <button className="btn" onClick={confirmBooking}>Confirm Booking</button>
              <button className="btn btn-ghost" onClick={()=>setHotelModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {restModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{restModal.name}</h3>
            <div>Reservation fee: ${restModal.reservationPrice}</div>
            <label>Time:
              <select value={restModal.time} onChange={(e)=>setRestModal({...restModal, time: e.target.value})}>
                {restModal.times.map((t, i)=> <option key={i} value={t}>{t}</option>)}
              </select>
            </label>
            <label>People:
              <input type="number" min="1" value={restModal.people} onChange={(e)=>setRestModal({...restModal, people: Number(e.target.value)})} />
            </label>
            <div className="modal-actions">
              <button className="btn" onClick={confirmReservation}>Confirm Reservation</button>
              <button className="btn btn-ghost" onClick={()=>setRestModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <h2>Your Hotel Bookings</h2>
      <div className="bookings-list">
        {bookings.length === 0 && <p>No hotel bookings yet.</p>}
        {bookings.map((b) => (
          <div className="booking-card" key={b.id}>
            <div>
              <strong>{b.hotel}</strong> — {b.city}
              <div>People: {b.people} | Nights: {b.nights}</div>
              <div>Services: {b.services.length ? b.services.join(", ") : "None"}</div>
            </div>
            <div>
              <div className="booking-total">${b.total}</div>
              <button className="btn btn-small btn-danger" onClick={()=>cancelBooking(b.id)}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
      <h2>Your Table Reservations</h2>
      <div className="bookings-list">
        {reservations.length === 0 && <p>No reservations yet.</p>}
        {reservations.map((r) => (
          <div className="booking-card" key={r.id}>
            <div>
              <strong>{r.restaurant}</strong> — {r.city}
              <div>Time: {r.time} | People: {r.people}</div>
            </div>
            <div>
              <div className="booking-total">${r.price}</div>
              <button className="btn btn-small btn-danger" onClick={()=>cancelReservation(r.id)}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default City;
