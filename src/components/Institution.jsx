import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { StateContext } from "../context/state";
import { useParams } from "react-router-dom";

export default function Institution() {
  const [hospitals, setHospitals] = useState([]);
  const [users, setUsers] = useState([]);
  const { isLogIn, setIsLogIn } = useContext(StateContext);
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const id = JSON.parse(localStorage.getItem("userprofile"));
  const [bookingData, setBookingdata] = useState({
    user: id.user,
    patientAge: "",
    patientDisease: "",
    timeBooked: "",
    // hospital: "",
  });

  const [error, setError] = useState(null);
  const url = "http://127.0.0.1:8000/api/hospitaldetails/";
  const bookingUrl = "http://127.0.0.1:8000/api/booking/";
  const userprofileUrl = "http://127.0.0.1:8000/api/user/profile/";
  const imageUrl = "http://127.0.0.1:8000/api";
  function handleChange(e) {
    setBookingdata({ ...setBookingdata, [e.target.name]: e.target.value });
  }

  if (isLogIn.is_loggedIn) {
    isLogIn.username = localStorage.getItem("username");
    isLogIn.email = localStorage.getItem("email");
  }

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setHospitals(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });

    axios.get(userprofileUrl).then((response) => {
      // console.log(response.data);
      setUsers(response.data);
    });
  }, []);

  function handleBooking(e) {
    e.preventDefault();
    console.log(bookingData);
    axios.post(bookingUrl,{
      user:"",
      patientAge:"",
      patientDisease:bookingData.patientDisease,
    }).then((response)=>{
      console.log(response).data;
    })

    // const errors = {};
    // (formData.patientAge === undefined || formData.patientAge === "") &&
    //   (errors.patientAge = "Please enter your age");
    // (formData.patientDisease === undefined || formData.patientDisease === "") &&
    //   (errors.patientDisease = "Please enter you problem");
    // (formData.timeBooked === undefined || formData.timeBooked === "") &&
    //   (errors.timeBooked = "Please enter the time you want to book");

    // setFormErrors(errors);
    // console.log(errors);
    // console.log(formData);
  }
  return (
    <div className="">
      {hospitals.map((hospital) => {
        return (
          <div className=" bg-[url('assets/images/bg.jpeg')] bg-no-repeat bg-cover py-[5em]">
            <div className="flex container mx-auto justify-between ">
              <div className="flex flex-col flex-1">
                <div className="w-[400px] h-400px] rounded-s-lg flex-1">
                  <img
                    src={`${imageUrl}${hospital.hospital_Image}`}
                    alt=""
                    className="h-[100%] w-[100%] object-contain flex justify-center rounded-s-lg"
                  />
                </div>

                <div className="py-3 flex-1 flex-col ">
                  <p className="text-2xl">
                    <span className="text-4xl">|</span>{" "}
                    {hospital.hospital_Slogan}
                  </p>
                  <h1 className="text-5xl pt-4 text-blue-400">
                    {hospital.related_data.name}
                  </h1>
                  <p className="text-2xl py-4 text-blue-400">
                    {hospital.hospital_Location}
                  </p>
                  {/* <p className="text-2xl">{`${hospital.workingHours} Hours`}</p> */}
                  <p className="w-[80%] text-xl pt-4">
                    {hospital.hospital_Description}
                  </p>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <h1 className="text-center text-5xl my-6">BOOK NOW</h1>
                <form action="" className="text-xl flex flex-col ">
                  <div className="flex flex-col flex-1 items-center gap-6">
                    <div className="w-[90%] ml-[1em] flex items-center gap-4 border-2 border-blue-400 rounded-full p-3 bg-white">
                      <p>Age:</p>{" "}
                      <input
                        name="patientAge"
                        type="number"
                        min={10}
                        max={100}
                        onChange={(e) => handleChange(e)}
                        className="bg-white outline-none "
                      />
                    </div>

                    <select
                      name="patientDisease"
                      id=""
                      placeholder="Choose medical service"
                      className="w-[90%] rounded-full p-3 outline-gray-200 bg-white border-2 border-blue-400"
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Type Of Service</option>
                      <option value="Ultrasound">Ultrasound</option>
                      <option value="CT-Scan">CT-Scan</option>
                      <option value="Surgery">Surgery</option>
                      <option value="Pharmacy">Pharmacy</option>
                      <option value="Physiotherapy">Physiotherapy</option>
                      <option value="Orthopaedics">Orthopaedics</option>
                      <option value="Occupational Therapy">
                        Occupational Therapy
                      </option>
                      <option value="Maternity in-patient services with a ward">
                        Maternity in-patient services with a ward
                      </option>
                      <option value="Curative services">
                        Curative services
                      </option>
                      <option value="Laboratory Services">
                        Laboratory Services
                      </option>
                      <option value="Dental">Dental</option>
                      <option value="Counselling">Counselling</option>
                      <option value="Pharmacy">Pharmacy</option>
                      <option value="TB Clinics">TB Clinics</option>
                      <option value="Diabetes & hypertension clinics">
                        Diabetes & hypertension clinics
                      </option>
                      <option value="Comprehensive care clinics for patients living with HIV">
                        Comprehensive care clinics for patients living with HIV
                      </option>
                      <option value="Baby well clinics">
                        Baby well clinics
                      </option>
                      <option value="Antenatal and Postnatal Services">
                        Antenatal and Postnatal Services
                      </option>
                    </select>
                    <div className="w-[90%] ml-[1em] flex items-center gap-4 border-2 border-blue-400 rounded-full p-3 bg-white">
                      <p>Date:</p>

                      <input
                        type="datetime-local"
                        name="timeBooked"
                        onChange={(e) => handleChange(e)}
                        className="bg-white outline-none "
                      />
                    </div>
                  </div>
                </form>
                <div className="w-[100%] flex ">
                  <button
                    className="my-10 py-6 text-xl w-[40%] mx-auto bg-blue-500 rounded-full text-white"
                    onClick={(e) => {
                      handleBooking(e);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
