var welcomeLabel = document.getElementById('welcome');
var displayEvent = document.getElementById('displayEvent');

var userDisplay = document.getElementById('userDisplay');
var passDisplay = document.getElementById('passDisplay');

welcomeLabel.addEventListener('dblclick', function () {
  console.log('Event: dblclick');
  if (displayEvent.textContent) {
    displayEvent.textContent = 'Event: dblclick';
  }
});
welcomeLabel.addEventListener('mouseover', function () {
  console.log('Event: mouseover');
  if (displayEvent.textContent) {
    displayEvent.textContent = 'Event: mouseover';
  }
});
welcomeLabel.addEventListener('mouseout', function () {
  console.log('Event: mouseout');
  if (displayEvent.textContent) {
    displayEvent.textContent = 'Event: mouseout';
  }
});

function validateForm() {
  let x = document.forms['myForm']['username'].value;
  let y = document.forms['myForm']['password'].value;
  if (x == '') {
    alert('Name must be filled out');
    return false;
  } else {
    console.log(`Username: ${x} \n Password: ${y}`);
    userDisplay.textContent = x;
    passDisplay.textContent = y;
    return false;
  }
}

function DeleteContactList(key) {
  localStorage.removeItem(key);
  let contactList = document.getElementById('contactList'); // Our contact list in the table of the contact-list page

  let data = ''; // Add data to this variable. Append deserialized data from localStorage to data
  let keys = Object.keys(localStorage); // Return a String Array of keys

  let index = 1; // Count number of keys

  // for every key in the keys collection
  for (const key of keys) {
    let contactData = localStorage.getItem(key); // Get localStorage data value related to the key
    let contact = new Contact();
    console.log(key.toString());

    contact.deserialize(contactData);

    // Inject repeatable row into the contactList
    data += `<tr>
                    <th scope="row" class="text-center">${index}</th>
                    <td class="text-center">${contact.Name}</td>
                    <td class="text-center">${contact.ContactNumber}</td>
                    <td class="text-center">${contact.EmailAddress}</td>
                    <td class="text-center"><button value=""  class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i>&nbsp; Edit</button></td>
                    <td class="text-center"><button value="" onclick="return DeleteContactList('${key}')" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i>&nbsp; Delete</button></td>
                </tr>
                `;

    index++;
  }

  contactList.innerHTML = data;
}
