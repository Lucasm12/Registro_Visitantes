document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const visitorForm = document.getElementById('visitorForm');
    const searchForm = document.getElementById('searchForm');
    const searchFormRecepcao = document.getElementById('searchFormRecepcao');
    const visitorList = document.getElementById('visitorList');
    const adminVisitorList = document.getElementById('adminVisitorList');
    const logoutButtons = document.querySelectorAll('#logout');

    logoutButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    });

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username === '1' && password === '1') {
                window.location.href = 'admin.html';
            } else if (username === '2' && password === '2') {
                window.location.href = 'recepcao.html';
            } else {
                alert('Login inválido!');
            }
        });
    }

    if (visitorForm) {
        visitorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const visitorName = document.getElementById('visitorName').value;
            const evangelica = document.getElementById('evangelica').value;
            const igrejaNome = document.getElementById('igrejaNome').value;
            const observacoes = document.getElementById('observacoes').value;
            const dataVisita = document.getElementById('dataVisita').value;
            
            const visitor = {
                id: Date.now(),
                name: visitorName,
                evangelica,
                igreja: igrejaNome,
                observacoes,
                dataVisita,
                date: new Date().toLocaleDateString()
            };

            let visitors = JSON.parse(localStorage.getItem('visitors')) || [];
            visitors.push(visitor);
            localStorage.setItem('visitors', JSON.stringify(visitors));
            displayVisitors();
            visitorForm.reset();
        });

        function displayVisitors() {
            visitorList.innerHTML = '';
            let visitors = JSON.parse(localStorage.getItem('visitors')) || [];
            visitors = visitors.filter(visitor => visitor.date === new Date().toLocaleDateString());
            visitors.forEach(visitor => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${visitor.name}</td>
                    <td>${visitor.evangelica}</td>
                    <td>${visitor.igreja}</td>
                    <td>${visitor.observacoes}</td>
                    <td>${visitor.dataVisita}</td>
                    <td>
                        <button onclick="editVisitor(${visitor.id})">Editar</button>
                        <button onclick="deleteVisitor(${visitor.id})">Excluir</button>
                    </td>
                `;
                visitorList.appendChild(tr);
            });
        }

        window.editVisitor = function(id) {
            const visitors = JSON.parse(localStorage.getItem('visitors')) || [];
            const visitor = visitors.find(visitor => visitor.id === id);
            if (visitor) {
                document.getElementById('visitorName').value = visitor.name;
                document.getElementById('evangelica').value = visitor.evangelica;
                document.getElementById('igrejaNome').value = visitor.igreja;
                document.getElementById('observacoes').value = visitor.observacoes;
                document.getElementById('dataVisita').value = visitor.dataVisita;
                visitors.splice(visitors.indexOf(visitor), 1);
                localStorage.setItem('visitors', JSON.stringify(visitors));
                displayVisitors();
            }
        }

        window.deleteVisitor = function(id) {
            let visitors = JSON.parse(localStorage.getItem('visitors')) || [];
            visitors = visitors.filter(visitor => visitor.id !== id);
            localStorage.setItem('visitors', JSON.stringify(visitors));
            displayVisitors();
        }

        displayVisitors();
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchDate = document.getElementById('searchDate').value;
            displayAdminVisitors(searchDate);
        });

        function displayAdminVisitors(date) {
            adminVisitorList.innerHTML = '';
            let visitors = JSON.parse(localStorage.getItem('visitors')) || [];
            visitors = visitors.filter(visitor => visitor.dataVisita === date);
            visitors.forEach(visitor => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${visitor.name}</td>
                    <td>${visitor.evangelica}</td>
                    <td>${visitor.igreja}</td>
                    <td>${visitor.observacoes}</td>
                    <td>${visitor.dataVisita}</td>
                `;
                adminVisitorList.appendChild(tr);
            });
        }
    }

    if (searchFormRecepcao) {
        searchFormRecepcao.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchDate = document.getElementById('searchDateRecepcao').value;
            displayReceptionVisitors(searchDate);
        });

        function displayReceptionVisitors(date) {
            visitorList.innerHTML = '';
            let visitors = JSON.parse(localStorage.getItem('visitors')) || [];
            visitors = visitors.filter(visitor => visitor.dataVisita === date);
            visitors.forEach(visitor => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${visitor.name}</td>
                    <td>${visitor.evangelica}</td>
                    <td>${visitor.igreja}</td>
                    <td>${visitor.observacoes}</td>
                    <td>${visitor.dataVisita}</td>
                    <td>
                        <button onclick="editVisitor(${visitor.id})">Editar</button>
                        <button onclick="deleteVisitor(${visitor.id})">Excluir</button>
                    </td>
                `;
                visitorList.appendChild(tr);
            });
        }
    }
});
