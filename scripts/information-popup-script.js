function onOpenInformationPopUp() {
    let popup = document.getElementById('information-popup');
    popup.style.display = 'flex'; // Ensure it’s displayed as a flex container
}

function onCloseInformationPopUpByButton() {
    let popup = document.getElementById('information-popup');
    popup.style.display = 'none';
}

// Hide popup when clicking outside the popup content
window.addEventListener('click', (event) => {
    const popup = document.getElementById('information-popup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});
