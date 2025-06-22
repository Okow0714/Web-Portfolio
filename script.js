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
    desc.style.position = '';
  } else {
    const rect = btn.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    const popupMaxWidth = 300; // match the CSS width
    const viewportWidth = window.innerWidth;

    // Calculate left position (make sure popup fits in viewport)
    let leftPos = rect.left + scrollLeft;
    if (leftPos + popupMaxWidth > scrollLeft + viewportWidth) {
      leftPos = scrollLeft + viewportWidth - popupMaxWidth - 10;
    }
    if (leftPos < scrollLeft + 10) {
      leftPos = scrollLeft + 10;
    }

    desc.style.position = 'absolute';
    desc.style.top = (rect.top + scrollTop) + 'px';  // align top with button
    desc.style.left = leftPos + 'px';
    desc.style.width = popupMaxWidth + 'px';
    desc.style.whiteSpace = 'normal';

    desc.classList.add('showdescription');
  }
}