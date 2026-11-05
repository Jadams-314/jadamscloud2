import React from 'react';
import { createRoot } from 'react-dom/client';

const FormComponent = () => {
  //const [formData, setFormData] = React.useState({ first: 'Tim', last: 'Berners-Lee' });
  const [formData, setFormData] = React.useState({ cloth: 'sock', female1: 'john cena', female2: 'mewtwo', male1: 'peter parker', male2: 'thor', nounf: 'she', nounm: 'he' });
  const [message, setMessage] = React.useState({}); // initialize it as an empty object

  // When you click submit button, sendStuff runs
  // Send formData to the server using fetch('/form').
  const sendStuff = async (event) => {
    event.preventDefault(); // prevent form default event which refreshes the page
    try {
      const response = await fetch('/madlibs', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=UTF-8',},
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setMessage(await response.json());  // assuming response is JSON
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  /* As you type handleChange runs immediately
    React grabs your keystroke, updates the formData state object, and 
    re-renders the component so the letters show up in the box.
    value is tied to formData.first and formData.last
  */
  // de-structure the event object directly in the function parameters
  const handleChange = ({ target: { input, value } }) => {
    setFormData((prev) => ({ ...prev, [input]: value }));
  };
  
  // Alternative way (longer version)
  /*
  const handleChange = (event) => {
    const name = event.target.name; // "name" is from HTML input tag attribute to identify first or last
    const value = event.target.value;
    setFormData((prev) => {
      const updatedFormData = { ...prev };  // Spread the previous state
      updatedFormData[name] = value;   // Update the property corresponding to the provided name with the new value
      return updatedFormData; // Return the updated state
    });
  };*/

  /* Note that.....
  In React, state objects should be treated as immutable (you shouldn't modify the existing state directly). 
  Also, when you call setFormData, React does not merge your new changes with the old state automatically
  it completely replaces the old state object with whatever new object you provide.

  Spreading previous state means taking all the existing key-value pairs inside an object and 
  copying them over into a brand-new object using JavaScript's Spread Operator (...)
  This is same as python's spread operator 
  Python uses an asterisk (*) for lists and tuples, and a double asterisk (**) for dictionaries
  Kotlin has a spread operator same as python (*), more restritive though
  */

  return (
    <div>
      <form method="post" onSubmit={sendStuff}>
        <label> Article of clothing </label><br />
        <input type="text" input="cloth" placeholder="sock/underwear/shirt/etc" 
                            value={formData.cloth} onChange={handleChange} /><br />
        <label> Female you know#1</label> <br />
        <input type="text" input="female1" placeholder="not man" 
                            value={formData.female1} onChange={handleChange} /><br /><br />
        <label> Female you know#2</label> <br />
        <input type="text" input="female1" placeholder="not man again" 
                            value={formData.female2} onChange={handleChange} /><br /><br />
        <label> Male you know#1</label> <br />
        <input type="text" input="female1" placeholder="not man again" 
                            value={formData.male1} onChange={handleChange} /><br /><br />
        <label> Male you know#2</label> <br />
        <input type="text" input="female1" placeholder="not man again" 
                            value={formData.male2} onChange={handleChange} /><br /><br />
        <label> Noun female</label> <br />
        <input type="text" input="female1" placeholder="not man again" 
                            value={formData.nounf} onChange={handleChange} /><br /><br />
        <label> Noun male</label> <br />
        <input type="text" input="female1" placeholder="not man again" 
                            value={formData.nounm} onChange={handleChange} /><br /><br />
        <input type="submit" value="Post something"></input>
      </form>
      {message &&(
        <>
        

            {sendStuff &&( 
                
                <p> {message.female1} hates {message.cloth}, her husband {message.male1} does not like wearing {message.cloth} at all! {message.female2} {message.nounf} is allergic to {message.cloth} {message.nounm} no longer is! </p>
                
                
            
            
            )}
        </>
      )}
    </div>
  );
};

const madlibs = createRoot(document.getElementById('madlibs'));
madlibs.render(<FormComponent />);