/*
    Yuliya Baran info 343
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

function onReady() {
	var form = document.getElementById('signup');
    var option;
    var stateSelect = form.elements['state'];
    var occupation = form.elements['occupation'];
    var occupationOther = form.elements['occupationOther'];


//Load the State Select
    for (var idx = 0; idx < usStates.length; idx++) {
        option = document.createElement('option');     
        option.innerHTML = usStates[idx].name;
        option.value = usStates[idx].code;
        stateSelect.appendChild(option);
    }
//you can add an event listener for this event to run some code whenever the user selects an occupation.
    occupation.addEventListener( 'change', function () {
    	if(occupation.value == 'other') {
        	occupationOther.style.display = 'block';
     	} 
		else {
        	occupationOther.style.display = 'none';
    	}
    });

//Confirm the "No Thanks" Button
	var noThanks = document.getElementById('cancelButton');
    noThanks.addEventListener( 'click', function () {
    	if (window.confirm("Are you really sure you want to leave? I worked really hard on this! Don't you love me?")) {
            window.location = "http://google.com";
        }
	});

    form.addEventListener('submit', onSubmit);
}

function onSubmit(evt) {

    evt.returnValue = validateForm(this);
    if (!evt.returnValue && evt.preventDefault) {
        evt.preventDefault();
    }

    return evt.returnValue;
} 

//Validate the Form Before Submit
function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var idx;
    var formValid = true;

    for(idx = 0; idx < requiredFields.length; idx++) {
        if (!validateRequiredField(form.elements[requiredFields[idx]])) {
            formValid = false;
        }
    }

    var occupation = document.getElementById('occupation');
//If the occupation select's value is 'other', the occupationOther field must have a value. Just as with the required fields
    var occupationOther = document.getElementsByName('occupationOther');
    if (occupation.value == 'other' && occupationOther.value.trim() == '') {
            formValid = false;
            occupationOther.className = 'error';
            
    }
    else {
            occupationOther.className = 'form-control';
    }

    var zip = form.elements['zip'];
    var zipRegEx = new RegExp('^\\d{5}$'); 
    var zipValue = zip.value;
    var result = zipRegExp.test(zipValue);

    if(!result) {
        zip.className = 'error';
    }

    var phone = document.getElementById("phone");

    var birthdate = form.elements['birthdate'].value;
	var age = getAge(birthdate);
	var msg = document.getElementById("birthdateMessage");
	if (isNaN(age)) {
        birthdate.className = 'error';
    	} 

    if (age < 13) {
    	birthdate.className = 'error';
        msg.innerHTML = "Invalid Age! You have to me 13+";
        valid = false;
    } else {
        msg.innerHTML = "";
    }

} //validateForm()

function getAge(birthdate) {
    var today = new Date();
    var birthdate = new Date(birthdate);
    var age = today.getFullYear() - birthDate.getUTCFullYear();
    var m = today.getMonth() - birthDate.getUTCMonth();
    var d = today.getDate() - birthDate.getUTCDate();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function validateRequiredField(field) {
    var value = field.value.trim();
    var valid = value.length > 0;
    if (valid){
        field.className = 'form-control';
    }
    else {
        field.className = 'error';

    }
    return valid;

} //validateRequiredField()


// Listen for the DOMContentLoaded Event
document.addEventListener('DOMContentLoaded', onReady);