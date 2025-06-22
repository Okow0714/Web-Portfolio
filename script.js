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
    // Hide popup and reset styles
    desc.classList.remove('showdescription');
    desc.style.top = '';
    desc.style.left = '';
    desc.style.width = '';
    desc.style.position = '';
  } else {
    // Show popup and position it
    const rect = btn.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    const popupWidth = 300; // match your CSS width
    const viewportWidth = window.innerWidth;

    // Calculate left position so popup doesn't overflow viewport on right
    let leftPos = rect.left + scrollLeft;
    if (leftPos + popupWidth > scrollLeft + viewportWidth) {
      leftPos = scrollLeft + viewportWidth - popupWidth - 10; // 10px padding from right edge
    }
    if (leftPos < scrollLeft + 10) {
      leftPos = scrollLeft + 10; // 10px padding from left edge
    }

    desc.style.position = 'absolute';
    desc.style.top = (rect.bottom + scrollTop) + 'px';  // place below the button
    desc.style.left = leftPos + 'px';
    desc.style.width = popupWidth + 'px';
    desc.style.whiteSpace = 'normal';

    desc.classList.add('showdescription');
  }
}
