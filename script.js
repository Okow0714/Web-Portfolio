function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close dropdown & descriptions when clicking outside
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  if (!event.target.matches('.text-1') && !event.target.closest('.mainbody-description')) {
    const descriptions = document.getElementsByClassName("mainbody-description");
    for (let i = 0; i < descriptions.length; i++) {
      const openDesc = descriptions[i];
      if (openDesc.classList.contains('showdescription')) {
        openDesc.classList.remove('showdescription');
      }
    }
  }
};

function myFunctionDescription(id, btn) {
  const desc = document.getElementById(id);
  if (!desc) return;

  if (desc.classList.contains('showdescription')) {
    desc.classList.remove('showdescription');
  } else {
    desc.classList.add('showdescription');
  }
}