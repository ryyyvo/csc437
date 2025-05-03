document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.menu-button');
  const navElement = document.querySelector('header nav');
  const headerElement = document.querySelector('header');
  const mediaQuery = window.matchMedia('(max-width: 768px)');
    
  const darkModeToggle = document.querySelector('.dark-mode-toggle');

  darkModeToggle.addEventListener('change', function() {
    console.log('Dark mode toggled:', this.checked);
    document.body.classList.toggle('dark-mode', this.checked);

    localStorage.setItem('darkMode', this.checked);
  });

  let menuExpanded = !mediaQuery.matches;
  navElement.style.display = menuExpanded ? 'block' : 'none';
  
  menuButton.addEventListener('click', function() {
    if (menuExpanded) {
      navElement.style.display = 'none';
      menuExpanded = false;
    } else {
      navElement.style.display = 'block';
      menuExpanded = true;
    }
  });
  
  document.body.addEventListener('click', function(event) {
    if (mediaQuery.matches && menuExpanded && !headerElement.contains(event.target)) {
      navElement.style.display = 'none';
      menuExpanded = false;
    }
  });
  
  function handleScreenChange(e) {
    if (!e.matches) {
      navElement.style.display = 'block';
      menuExpanded = true;
    } else {
      navElement.style.display = 'none';
      menuExpanded = false;
    }
  }
  
  handleScreenChange(mediaQuery);
  
  mediaQuery.addEventListener('change', handleScreenChange);

  const darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'true') {
    document.body.classList.toggle('dark-mode', darkMode);
    darkModeToggle.checked = true;
  }
  
});

