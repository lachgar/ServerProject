var employes = Array();
var id = 0;
function  load() {
    if (typeof localStorage != 'undefined') {
        if ('employes' in localStorage) {
            employes = JSON.parse(localStorage.getItem('employes'));
            var contenu = $('#contenu');
            var ligne = '';
            var i = 0;
            employes.forEach(e => {
                ligne += '<tr><td>' + e.nom + '</td><td>' + e.prenom + '</td><td>' + e.email + '</td><td><a class="delete" href="" indice="' + i + '">Supprimer</a></td><td><a href="" indice="' + i + '" class="update">Modifier</a></td></tr>';
                i++;
            });
            contenu.html(ligne);
        }else {
            $('#contenu').html("");
        }
    } else {
        alert("le locat storage n'est pas supporté");
    }
}
$(document).ready(function () {
    load();
    $('#valider').click(function () {
        var emp = {
            nom: $('#nom').val(),
            prenom: $('#prenom').val(),
            email: $('#email').val()
        };
        if ($('#valider').html() == 'Modifier') {
            employes[id] = emp;
            $('#valider').html("valider");
        } else {
            employes.push(emp);
        }

        localStorage.setItem('employes', JSON.stringify(employes));
        load();
    });

    $('#contenu').on('click', '.delete', function () {
        id = $(this).attr("indice");
        employes.splice(id, 1);
        localStorage.removeItem('employes');
        localStorage.setItem('employes', JSON.stringify(employes));
    });

    $('#contenu').on('click', '.update', function () {
        id = $(this).attr("indice");
        $('#nom').val(employes[id].nom);
        $('#prenom').val(employes[id].prenom);
        $('#email').val(employes[id].email);
        $('#valider').html('Modifier');
        return false;
    });
    $('#envoyer').click(function () {
        $.ajax({
            url: 'SendData',
            data: {employes: JSON.stringify(employes)},
            type: 'GET',
            cache: false,
            success: function (data) {
                if (data == 'yes') {
                    localStorage.removeItem('employes');
                    load();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('erreur');
            }
        });
    });
});

