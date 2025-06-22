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

function myFunctionDescription(id, btn) {
  const desc = document.getElementById(id);
  if (!desc) return;

  if (desc.classList.contains('showdescription')) {
    desc.classList.remove('showdescription');
    desc.style.top = '';
    desc.style.left = '';
  } else {
    // Get button position
    const rect = btn.getBoundingClientRect();

    // Position the popup relative to button
    desc.style.position = 'fixed'; // fixed relative to viewport
    desc.style.top = rect.bottom + 'px'; // just below button
    desc.style.left = rect.left + 'px';  // align left edges

    desc.classList.add('showdescription');
  }
}


