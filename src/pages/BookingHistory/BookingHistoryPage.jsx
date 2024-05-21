import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import axios from "../../services/axios";

const BookingHistoryPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/bookings/user/${user._id}`, {
          headers: {
            "x-token": token,
          },
        });
        setBookings(response.data.bookings);
      } catch (err) {
        toast.error("Failed to fetch booking history");
      }
    };
    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-stone-800 text-white">
      <h1 className="text-3xl font-bold mb-4">Booking History</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className="mb-4 p-4 bg-gray-700 rounded-md">
              <h3 className="text-xl font-bold">{booking.hotel.name}</h3>
              <p>Room: {booking.room.room_number}</p>
              <p>
                Dates: {new Date(booking.startDate).toLocaleDateString()} -{" "}
                {new Date(booking.endDate).toLocaleDateString()}
              </p>
              <p>Total: ${booking.total}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistoryPage;
