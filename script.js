function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  if (!event.target.matches('.text-1') && !event.target.closest('.mainbody-description')) {
    var descriptions = document.getElementsByClassName("mainbody-description");
    var i;
    for (i = 0; i < descriptions.length; i++) {
      var openDesc = descriptions[i];
      if (openDesc.classList.contains('showdescription')) {
        openDesc.classList.remove('showdescription');
      }
    }
  }
}

// function myFunctionDescription(id) {
//   const desc = document.getElementById(id);
//   if (desc) {
//     desc.classList.toggle('showdescription');
//   }
// }
function myFunctionDescription(id) {
  // Close all descriptions first
  const allDescriptions = document.querySelectorAll('.mainbody-description');
  allDescriptions.forEach(desc => {
    desc.classList.remove('showdescription');
    desc.style.top = '';
    desc.style.left = '';
  });

  const desc = document.getElementById(id);
  const button = document.querySelector(`[onclick="myFunctionDescription('${id}')"]`);

  if (!desc || !button) return;

  const rect = button.getBoundingClientRect();

  // Position the description box slightly below the button
  desc.style.top = `${rect.bottom + window.scrollY + 10}px`;
  desc.style.left = `${rect.left + window.scrollX}px`;

  desc.classList.add('showdescription');
}


