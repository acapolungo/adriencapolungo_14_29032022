import "./form.css"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { departments } from '../../assets/departments';
import { states } from '../../assets/states';
import { addEmployee } from '../../reducers/employeeSlice';
import DatePicker from "react-datepicker";


// { setModal, setModalContent }
export default function Form({ openModal }) {

    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [stateName, setStateName] = useState(states[0].abbreviation);
    const [department, setDepartment] = useState(departments[0].abbreviation);
    const employeeId = () => {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
            + Math.random().toString(16).slice(2)
            + Date.now().toString(16).slice(4);
    };
    const [error, setError] = useState(null);

    const toDoubleDigit = (int) => int.toString().length <= 1 ? `0${int}` : int.toString();
    const formatDate = (date) => `${date.getFullYear()}-${toDoubleDigit(date.getMonth() + 1)}-${toDoubleDigit(date.getDate())}`
    const handleSubmitEmployee = (e) => {
        e.preventDefault();

        const isValid = () => {
            console.log(firstName === "")

            if (!birthdate instanceof(Date)) {
                return false
            } else if (!startDate instanceof(Date)) {
                return false
            } else if (firstName === "" || lastName === "" || street === "" || city === ""){
                setError("Please fill in all the fields of the form.")
                return false
            } else if (!zipcode.match(/\b\d{5}\b/g)) {
                setError("Please fill 5 digit number")
                return false
            } else {
                setError("")
                return true
            }
        }

        const employeeIsValid = isValid();

        if (employeeIsValid) {
            // on envoie dans le state les informations
            dispatch(
                addEmployee({
                    firstName: firstName,
                    lastName: lastName,
                    birthdate: formatDate(birthdate),
                    startDate: formatDate(startDate),
                    street: street,
                    city: city,
                    zipcode: zipcode,
                    stateName: stateName,
                    department: department,
                    id: employeeId(),
                })
            ); 
            openModal('Un employé à été créé')
        }
    }

    return (
        <>
            <form className="formEmployee">
                <h2 className="form__title">HRNet - Create Employee</h2>
                <div className="form__content">
                    <div className="form__container">
                        <span className='form__span' ><label htmlFor="firstName">First Name</label></span>
                        <input
                            className='form__input'
                            name="firstName"
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <span className='form__span'><label htmlFor="lastName">Last Name</label></span>
                        <input
                            className='form__input'
                            name="lastName"
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form__container">
                        <span className='form__span form__span-date'><label htmlFor="birthdate">Date of Birth</label></span>
                        <DatePicker
                         dateFormat="yyyy-MM-dd"
                         selected={birthdate}
                         onChange={(date) => setBirthdate(date)}
                         />
                        {/* <input
                            className='form__input'
                            name="birthdate"
                            id="birthdate"
                            type="date"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            required
                        /> */}
                        <span className='form__span form__span-date'><label htmlFor="startdate">Start Date</label></span>
                         <DatePicker
                         dateFormat="yyyy-MM-dd"
                         selected={startDate}
                         onChange={(date) => setStartDate(date)}
                         />
                        {/* <input
                            className='form__input'
                            name="startdate"
                            id="startdate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        /> */}
                    </div>
                </div>
                <div className="form__content">
                    {/* <hr className="form__line" /> */}
                    <h2 className="form__title">Adress</h2>
                    <div className="form__street">
                        <span className='form__span form__span--adress'><label htmlFor="street">Street</label></span>
                        <input
                            className='form__input'
                            name="street"
                            id="street"
                            type="text"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form__container">
                        <span className='form__span form__span--adress'><label htmlFor="city">City</label></span>
                        <input
                            className='form__input'
                            name="city"
                            id="city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                        <span className='form__span form__span--adress'><label htmlFor="state">State</label></span>
                        <select
                            className='form__input form__input--select'
                            name="state"
                            id="state"
                            value={stateName}
                            onChange={(e) => setStateName(e.target.value)}
                            required
                        >
                            {states.map(elt =>
                                <option
                                    key={`element-${elt.abbreviation}`}
                                    value={elt.abbreviation}
                                >
                                    {elt.name}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="form__container">
                        <span className='form__span form__span--adress'><label htmlFor="zipcode">Zipcode</label></span>
                        <input
                            className='form__input'
                            name="zipcode"
                            id="zipcode"
                            type="number"
                            max="99999"
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            required
                        />
                        <span className='form__span form__span--adress'><label htmlFor="department">Department</label></span>
                        <select
                            className='form__input form__input--select'
                            name="department"
                            id="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        >
                            {departments.map(elt =>
                                <option
                                    key={`element-${elt.abbreviation}`}
                                    value={elt.abbreviation}
                                >
                                    {elt.name}
                                </option>
                            )}
                        </select>
                    </div>
                </div>

                <button className="form__button" onClick={handleSubmitEmployee} >Save </button>
                <div className="form__error">{error}</div>
            </form>
        </>
    );
}