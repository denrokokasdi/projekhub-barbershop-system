import React, { useState, useEffect } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [packageType, setPackageType] = useState("Haircut (MYR 20)");
  const [queue, setQueue] = useState([
    {
      name: "Aiman Tino",
      phone: "0182838882",
      packageType: "Haircut (MYR 20)", // pakej 1
      time: new Date(Date.now() - 5 * 60 * 1000).toLocaleTimeString(),
      countdown: 10 * 60,
    },
  ]);
  const [popup, setPopup] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addToQueue = () => {
    if (name.trim() !== "" && phone.trim() !== "") {
      const newEntry = {
        name,
        phone,
        packageType,
        time: new Date().toLocaleTimeString(),
        countdown: 10 * 60, // 10 minutes countdown
      };
      setQueue([...queue, newEntry]);
      setName("");
      setPhone("");
      setPopup(true);
      setTimeout(() => setPopup(false), 2000);
    }
  };

  // countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setQueue((prevQueue) =>
        prevQueue.map((item) =>
          item.countdown > 0 ? { ...item, countdown: item.countdown - 1 } : item
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black">
      {/* Navbar */}
      <div className="w-full bg-gray-900 text-white py-3 px-6 flex justify-between items-center">
        <h1 className="font-bold text-lg">Adam Barber Shop</h1>
        {/* <span className="text-sm">{currentTime.toLocaleString()}</span> */}
      </div>

      {/* Title Photo */}
      <div className="mt-[0px] mb-[-10px]">
        <img
          src="https://www.shutterstock.com/image-vector/barbershop-logo-vector-design-cut-600nw-2494643347.jpg"
          alt="Barber Shop"
          className="mx-auto w-80"
        />
      </div>

      {/* Tagline */}
      <div className="text-center mt-4 mb-6">
        <p className="text-xl font-bold text-gray-800">
          Barber Kacak, Anda Kacak
        </p>
        <p className="text-gray-600">Danau Kota, KL</p>
      </div>

      {/* Form */}

      {/* Queue List */}
      <div className="w-full max-w-md mt-6 pl-10 pr-10">
        <h2 className="text-lg font-semibold mb-2">Current Queue</h2>
        <ul className="border rounded-lg p-3 bg-white h-60 overflow-y-auto">
          {queue.length === 0 ? (
            <p className="text-gray-500 text-center">No customers waiting</p>
          ) : (
            queue.map((person, index) => (
              <li
                key={index}
                className={`p-2 rounded mb-2 ${
                  index === 0 ? "bg-gray-200 font-semibold" : "bg-gray-50"
                }`}
              >
                {index === 0 && (
                  <span className="mr-2 text-green-600 font-bold">🟢</span>
                )}
                {index + 1}. {person.name} ({person.phone}) – {person.packageType}
                <br />
                <span className="text-sm text-gray-600">
                  Registered at: {person.time} | Time left:{" "}
                  {formatCountdown(person.countdown)}
                </span>
                {index === 0 && (
                  <div className="text-xs text-green-700 font-semibold mt-1">
                    Ongoing haircut
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="bg-gray-100 shadow-lg rounded-2xl w-full max-w-md p-6 pl-10 pr-10">
        <h2 className="text-xl font-semibold text-center mb-4">
          Join the Queue
        </h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="tel"
            placeholder="Enter your phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
          <select
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option>Haircut (MYR 20)</option>
            <option>Shave (MYR 15)</option>
            <option>Haircut + Shave (MYR 30)</option>
          </select>
          <button
            onClick={addToQueue}
            className="bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Popup */}
      {popup && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
          You will be notified!
        </div>
      )}

      {/* Footer with map */}
      <div className="w-full mt-10 bg-gray-100 p-6 text-center">
        <h2 className="font-semibold text-lg mb-2">📍 Our Location</h2>
        <p className="mb-4">Adam Barber Shop, Danau Kota, Kuala Lumpur</p>
        <iframe
          title="Danau Kota Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.07357133011!2d101.71926967472584!3d3.205007296758998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc37d5a7fef2d5%3A0x88f26b41e1f7d6f4!2sDanau%20Kota%2C%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1694605000000!5m2!1sen!2smy"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
