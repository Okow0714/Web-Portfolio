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
    desc.style.width = '';
    desc.style.height = '';
  } else {
    const rect = btn.getBoundingClientRect();

    desc.style.position = 'fixed';  // relative to viewport
    desc.style.top = rect.top + 'px';    // align top to button top
    desc.style.left = rect.left + 'px';  // align left to button left

    // Make popup fully cover the button size
    desc.style.width = (rect.width * 2) + 'px';  // 2x wider
    desc.style.height = (rect.height * 3) + 'px'; // 3x taller

    desc.classList.add('showdescription');
  }
}