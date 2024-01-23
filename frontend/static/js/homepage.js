function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    sidebar.style.width = (sidebar.style.width === '200px' || sidebar.style.width === '') ? '0' : '200px';
}
