
document.getElementById("signInForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    var formData = {
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        Email: document.getElementById("Email").value,
        gname: document.getElementById("gname").value
    };
    //convert formdata to json string
//     const jsonData = JSON.stringify(formData);
//     readFile('db.json', 'utf8', (err, data) => {
//         if (err) {
//             res.writeHead(500, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ error: 'Internal Server Error' }));
//         } else {
//             const players = JSON.parse(data).players;
//             formData.id = players.length + 1;
//             players.push(formData);
//             writeFile('db.json', JSON.stringify({ players }), 'utf8', err => {
//                 if (err) {
//                     res.writeHead(500, { 'Content-Type': 'application/json' });
//                     res.end(JSON.stringify({ error: 'Internal Server Error' }));
//                 } else {
//                     res.writeHead(200, { 'Content-Type': 'application/json' });
//                     res.end(JSON.stringify({ message: 'Form data submitted successfully' }));
//                 }
//             });
//         }
//     });
// });
 // Retrieve existing data or initialize an empty array
 var playersData = JSON.parse(localStorage.getItem('players')) || [];

 // Assign ID to formData
 formData.id = playersData.length + 1;

 // Add new formData to playersData array
 playersData.push(formData);

 // Save updated data to localStorage
 localStorage.setItem('players', JSON.stringify(playersData));

 // Notify user of successful form submission
 alert("Form data submitted successfully!");
});