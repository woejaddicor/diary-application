async function loadSpecificDiary(){
    const response = await fetch('http://localhost:3000/');
    const data = await response.json();
    document.getElementById('title').textContent = data.title;
    document.getElementById('content').textContent = data.description;
}
loadSpecificDiary();