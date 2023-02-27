(function () {
  function DisplayHome() {
    $('#RandomButton').on('click', function () {
      location.href = 'contact.html';
    });

    // concatenation - '1' + '2' + '3'
    // interpolation - `${var_1}`
    let firstString = 'This is a ';
    let secondString = `${firstString} main paragraph that we added through javascript and this is also on GitHub Pages`;

    $('main')
      .addClass('container')
      .append(
        `<p id="MainParagraph" class="mt-3 container">${secondString}</p>`
      );
  }

  function DisplayNavBar() {
    // ajax
    // instatiate the xhr objecct
    let XHR = new XMLHttpRequest();
    // add event listener for readystatechange
    XHR.addEventListener('readystatechange', () => {
      if (XHR.readyState === 4 && XHR.status === 200) {
        $('#navigationBar').html(XHR.responseText);
      }
    });
    // connect and get data
    XHR.open('GET', './static/header.html');
    XHR.send();
  }

  function DisplayProjects() {
    console.log('Projects Page');
  }

  function AddContact(fullName, contactNumber, emailAddress) {
    let contact = new core.Contact(fullName, contactNumber, emailAddress);
    if (contact.serialize()) {
      let key = contact.Name.substring(0, 1) + Date.now();
      localStorage.setItem(key, contact.serialize());
    }
  }

  function ValidateInput(inputeFiledId, regularExpresion, exception) {
    let messageArea = $('#messageArea').hide();

    $(`#${inputeFiledId}`).on('blur', function () {
      let inputeText = $(this).val();
      if (!regularExpresion.test(inputeText)) {
        // failure to match full name with regex
        $(this).trigger('focus').trigger('select');
        messageArea.addClass('alert alert-danger').text(exception).show();
      } else {
        // success in mathing full name with rgex
        messageArea.removeAttr('class').hide();
      }
    });
  }

  function ContactFormValidate() {
    let fullNamePattern =
      /^([A-Z][a-z]{1,25})((\s|,|-)([A-Z][a-z]{1,25}))*(\s|-|,)*([A-Z][a-z]{1,25})*$/g;
    ValidateInput(
      'fullName',
      fullNamePattern,
      'Please enter a valid Full Name which needs a captilatized first name and capitalized last name'
    );

    let emailAddressPattern = /^[\w-\.]+@([\w-]+\.)+[\w-][^\d]{1,10}$/;
    ValidateInput(
      'emailAddress',
      emailAddressPattern,
      'Please enter a valid Email Address'
    );

    let contactNumberPatter = /^9\d{9}$/;
    ValidateInput(
      'contactNumber',
      contactNumberPatter,
      'Please enter a valid Contact Number'
    );
  }

  function DisplayContacts() {
    console.log('Contact Us Page');

    let submitButton = document.getElementById('submitButton');
    let subscribeCheckbox = document.getElementById('subscribeCheckbox');

    ContactFormValidate();
    submitButton.addEventListener('click', function (event) {
      event.preventDefault();
      if (subscribeCheckbox.checked) {
        // If user subscribes, store the contact in localStorage
        AddContact(fullName.value, contactNumber.value, emailAddress.value);
      }

      return false;
    });
  }

  function DisplayContactList() {
    if (localStorage.length > 0) {
      let contactList = document.getElementById('contactList'); // Our contact list in the table of the contact-list page

      let data = ''; // Add data to this variable. Append deserialized data from localStorage to data
      let keys = Object.keys(localStorage); // Return a String Array of keys

      let index = 1; // Count number of keys

      // for every key in the keys collection
      for (const key of keys) {
        let contactData = localStorage.getItem(key); // Get localStorage data value related to the key
        let contact = new core.Contact();
        console.log(key.toString());

        contact.deserialize(contactData);

        // Inject repeatable row into the contactList
        data += `<tr>
                    <th scope="row" class="text-center">${index}</th>
                    <td class="text-center">${contact.Name}</td>
                    <td class="text-center">${contact.ContactNumber}</td>
                    <td class="text-center">${contact.EmailAddress}</td>
                    <td class="text-center"><button value="${key}"  class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i>&nbsp; Edit</button></td>
                    <td class="text-center"><button value="${key}" onclick="return DeleteContactList('${key}')" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i>&nbsp; Delete</button></td>
                </tr>
                `;

        index++;
      }

      contactList.innerHTML = data;

      $('button.edit').on('click', function () {
        location.href = `edit.html#` + $(this).val();
      });
    }

    $('#addButton').on('click', () => {
      console.log('here');
      location.href = 'edit.html#Add';
    });
    contactList.innerHTML = data;
  }

  function DisplayEditPage() {
    ContactFormValidate();
    let page = location.hash.substring(1);
    switch (page) {
      case 'Add':
        {
          $('#welcome').text('WEBD6201 Demo Add Contact');

          $('#editButton').html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);

          $('#editButton').on('click', (event) => {
            event.preventDefault();

            // get form information (name, contact number, email address)
            AddContact(fullName.value, contactNumber.value, emailAddress.value);

            location.href = 'contact-list.html';
            // redirect to contact-;ist
          });
        }
        break;
      default:
        {
          // get contact ingo from local storeage

          let contact = new core.Contact();
          contact.deserialize(localStorage.getItem(page));
          // display contatct info in edit form
          $('#fullName').val(contact.Name);
          $('#contactNumber').val(contact.ContactNumber);
          $('#emailAddress').val(contact.EmailAddress);

          // when edit button pressed, update the contact
          $('#editButton').on('click', (event) => {
            event.preventDefault();

            // get all changes from the form
            contact.Name = $('#fullName').val();
            contact.ContactNumber = $('#contactNumber').val();
            contact.EmailAddress = $('#emailAddress').val();

            // replacce the changes in localstorage
            localStorage.setItem(page, contact.serialize());

            // go back to contact-list.htm
            location.href = 'contact-list.html';
          });
        }
        break;
    }
  }

  function DisplayReferences() {
    console.log('References Page');
  }

  function Start() {
    console.log('App Started Successfully!');

    switch (document.title) {
      case 'Home - WEBD6201 Demo':
        DisplayHome();
        DisplayNavBar();
        break;
      case 'Projects - WEBD6201 Demo':
        DisplayProjects();
        break;
      case 'Contact Us - WEBD6201 Demo':
        DisplayContacts();
        break;
      case 'Contact List - WEBD6201 Demo':
        DisplayContactList();
        break;
      case 'References - WEBD6201 Demo':
        DisplayReferences();
        break;
      case 'Edit - WEBD6201 Demo':
        DisplayEditPage();
        break;
    }
  }

  window.addEventListener('load', Start);
})();
