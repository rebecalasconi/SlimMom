import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './DailyCaloriesForm.css';

// const DailyCaloriesForm = () => {
//   const [formData, setFormData] = useState({
//     height: '',
//     age: '',
//     currentWeight: '',
//     desiredWeight: '',
//     bloodType: '1',
//   });
//   const [calories, setCalories] = useState(null);
//   const [forbiddenFoods, setForbiddenFoods] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/dailycalorieintake', formData);
//       const [allForbiddenFoods, setAllForbiddenFoods] = useState([]);
//       setCalories(response.data.calories);
//       setForbiddenFoods(response.data.forbiddenFoods); // Folosește cele 4 alimente
//       setAllForbiddenFoods(response.data.allForbiddenFoods); // Toate alimentele interzise
      
//       setModalOpen(true);
//       localStorage.setItem('calorieFormData', JSON.stringify(formData));
//       console.log('Data saved to localStorage:', formData);
//     } catch (error) {
//       console.error('Error calculating calories:', error);
//     }
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     document.body.classList.remove('modal-open');
//   };

//   useEffect(() => {
//     if (modalOpen) {
//       document.body.classList.add('modal-open');
//     } else {
//       document.body.classList.remove('modal-open');
//     }
//   }, [modalOpen]);

//   useEffect(() => {
//     const handleEscKey = (e) => {
//       if (e.key === 'Escape') {
//         closeModal();
//       }
//     };

//     document.addEventListener('keydown', handleEscKey);
//     return () => {
//       document.removeEventListener('keydown', handleEscKey);
//     };
//   }, []);

//   const redirectToLogin = () => {
//     navigate('/login');
//   };

//   const handleOverlayClick = (e) => {
//     // Închide modalul doar dacă click-ul a avut loc pe overlay, nu pe conținutul modalului
//     if (e.target === e.currentTarget) {
//       closeModal();
//     }
//   };

//   return (
//     <div>
//       {/* Overlay */}
//       {modalOpen && <div className="overlay" onClick={handleOverlayClick}></div>}

//       {/* Formularul */}
//       <form onSubmit={handleSubmit} className="form">
//         <div className="column">
//           <label>Height* <input type="number" name="height" required onChange={handleChange} /></label>
//           <label>Age* <input type="number" name="age" required onChange={handleChange} /></label>
//           <label>Current weight* <input type="number" name="currentWeight" required onChange={handleChange} /></label>
//         </div>

//         <div className="column">
//           <label>Desired weight* <input type="number" name="desiredWeight" required onChange={handleChange} /></label>
//           <label>Blood type*</label>
//           <div className="blood-type-options">
//             {['1', '2', '3', '4'].map((type) => (
//               <label key={type} className={`blood-type-label ${formData.bloodType === type ? 'active' : ''}`}>
//                 <input
//                   type="radio"
//                   name="bloodType"
//                   value={type}
//                   checked={formData.bloodType === type}
//                   onChange={handleChange}
//                 />
//                 <span className="radio-circle"></span>
//                 <span className="blood-type-number">{type}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <button className="submit-btn" type="submit">Start losing weight</button>
//       </form>

//       {/* Modalul */}
//       {modalOpen && (
//         <div className="modal" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <span className="close-btn" onClick={closeModal}>&times;</span>
//             <h3>Your recommended daily calorie intake is</h3>
//             <p><span className='kcal'>{calories}</span> kcal</p>
//             <hr />
//             <h4>Foods you should not eat</h4>
//             <ul>
//               {forbiddenFoods.map((food, index) => <li key={index}>{index + 1}. {food}</li>)}
//             </ul>
//             <button className="start-btn" onClick={redirectToLogin}>Start losing weight</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DailyCaloriesForm;import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DailyCaloriesForm.css';

const DailyCaloriesForm = () => {
  const [formData, setFormData] = useState({
    height: '',
    age: '',
    currentWeight: '',
    desiredWeight: '',
    bloodType: '1',
  });
  const [calories, setCalories] = useState(null);
  const [allForbiddenFoods, setAllForbiddenFoods] = useState([]);
  const [forbiddenFoods, setForbiddenFoods] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/dailycalorieintake', formData);
      setCalories(response.data.calories);
      setForbiddenFoods(response.data.forbiddenFoods);
  
      // Salvează allForbiddenFoods
      const allForbiddenFoods = response.data.allForbiddenFoods || [];
      const currentDate = new Date().toLocaleDateString('ro-RO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '.'); // Înlocuiește slash cu punct
      

  
      // Salvăm datele în localStorage
      localStorage.setItem('calorieFormData', JSON.stringify(formData));
      localStorage.setItem('caloriesData', JSON.stringify({
        dailyRate: response.data.calories,
        consumed: 0,
        forbiddenFoods: response.data.forbiddenFoods,
        allForbiddenFoods: allForbiddenFoods, // Include allForbiddenFoods
        dateCompleted: currentDate,
      }));
  
      setModalOpen(true); // Deschidem modal doar după ce primim răspunsul
    } catch (error) {
      console.error('Error calculating calories:', error);
    }
  };
  

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    document.body.classList.toggle('modal-open', modalOpen);
  }, [modalOpen]);

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      {modalOpen && <div className="overlay" onClick={closeModal}></div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="column">
          <label>Height* <input type="number" name="height" required onChange={handleChange} value={formData.height} /></label>
          <label>Age* <input type="number" name="age" required onChange={handleChange} value={formData.age} /></label>
          <label>Current weight* <input type="number" name="currentWeight" required onChange={handleChange} value={formData.currentWeight} /></label>
        </div>

        <div className="column">
          <label>Desired weight* <input type="number" name="desiredWeight" required onChange={handleChange} value={formData.desiredWeight} /></label>
          <label>Blood type*</label>
          <div className="blood-type-options">
            {['1', '2', '3', '4'].map((type) => (
              <label key={type} className={`blood-type-label ${formData.bloodType === type ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="bloodType"
                  value={type}
                  checked={formData.bloodType === type}
                  onChange={handleChange}
                />
                <span className="radio-circle"></span>
                <span className="blood-type-number">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="submit-btn" type="submit">Start losing weight</button>
      </form>

      {modalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h3>Your recommended daily calorie intake is</h3>
            <p><span className='kcal'>{calories}</span> kcal</p>
            <hr />
            <h4>Foods you should not eat</h4>
            <ul>
               {forbiddenFoods.map((food, index) => <li key={index}> {food}</li>)}
            </ul>
            <button className="start-btn" onClick={redirectToLogin}>Start losing weight</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyCaloriesForm;
