<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>

        *{
            font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
        }

        /* first page style */
        .first_page{
            page-break-after: always ;
        }

        .first_page table {
            width: 100%;
        }

        .first_page table .title {
            letter-spacing: 1px;
            font-weight: bold;
        }

        .first_page .cont_1 td {
            text-align: center;
            font-size: 16px;
            height: 15%;
            vertical-align: middle ;
            text-transform: uppercase;
        }

        .first_page .cont_2 .objet {
            font-size: 16px;
            height: 5%;
            vertical-align: middle ;
        }

        .first_page .cont_2 .objet span {
            font-size: 16px;
            text-decoration: underline;
            font-weight: bold;
        }

        .first_page .cont_2 .main_cont {
            font-size: 16px;
            height: 5%;
            width: 80%;
        }

        .first_page .footer {
            margin-top: 20%;
            text-align: right;
            margin-right: 20px;
        }

        /* second page style */
        .second_page .header {
            text-align: center;
        }

        .second_page .header h1 {
            font-size: 20px;
            text-transform: uppercase;
        }

        .second_page .header h2 {
            font-size: 16px;
            text-transform: capitalize;
        }
        .second_page .cont_1 {
            width: 100%;
            border-collapse: collapse;
            border: 0.5px black solid ;
            font-size: 16px;
        }

        .second_page .cont_1 td{
            padding:  15px 10px  ;
        }

        .small_title{
            font-size: 16px;
            font-weight: bold;
            text-transform: capitalize;
        }

        .liste_des_participants{
            width: 100%;
            border-collapse: collapse;
            border: 0.5px black solid ;
        }

        .liste_des_participants td , .liste_des_participants th {
            padding: 5px 0 ;
        }

        .liste_des_participants tr {
            text-align: center;
        }


    </style>

</head>
<body>

    {{-- convocation page --}}
    <div class="first_page" >
        {{-- header --}}
        <table>
            <tr>
                <td>
                    <img src="{{ public_path('img/ormva-logo.png') }}" alt="ormva-logo" width="60%" >
                </td>
                <td class="title" >
                    Royaume du Maroc  Ministère de l'Agriculture, de la Pêche <br> Maritime, du Développement Rural et des  Eaux et Forêts
                </td>
            </tr>
        </table>

        {{-- content --}}
        <table class="cont_1" >
            <tr>
                <td>
                    le directeur de l'office regional <br> de mise en valeur agricole <br> du souss massa
                </td>
            </tr>
        </table>

        <table class="cont_1" >
            <tr>
                <td>
                    -MM. les chefs des services
                </td>
            </tr>
        </table>

        <table class="cont_2" >
            <tr>
                <td class="objet" >
                        <span>
                            objet :
                        </span>
                        Realisation des sessions de formation
                </td>
            </tr>
            <tr>
                <td class="main_cont">
                        J'ai l'honneur de vous informer que la session de formation relative au theme : ""{{ $data['formation']->intitule }}""
                        aura lieu au {{ $data['formation']->lieu }}, du {{ $data['formation']->date_debut }} au {{ $data['formation']->date_fin }}.
                </td>
            </tr>
            <tr>
                <td class="main_cont">
                    A cet effet, je vous demande de bien vouloir inviter les agents relevant de votre entite, dont les noms figurent sur la liste ci-jointe, a assister a cette session de formation.
                </td>
            </tr>
        </table>


        <div class="footer" >
        cachet & signature
        </div>

    </div>

    {{-- liste de participant --}}
    <div class="second_page" >
        {{-- header --}}
        <div class="header" >
            <h1>liste des participants</h1>
            <h4>session de formation continue</h4>
        </div>

        {{-- cont --}}
        <table class="cont_1" border="1" >
            <tr>
                <td width="50%">
                    <span class="small_title">
                        module :
                    </span>
                    {{ $data['formation']->intitule }}
                </td>
                <td width="50%">
                    <span class="small_title">
                        theme :
                    </span>
                    {{ $data['formation']->description }}
                </td>
            </tr>
            <tr>
                <td colspan="2" width="100%" >
                    <p>
                        <span class="small_title" >
                            lieu :
                        </span>
                        {{ $data['formation']->lieu }}
                    </p>
                    <p>
                        <span class="small_title" >
                            dates :
                        </span>
                        du {{ $data['formation']->date_debut }} au {{ $data['formation']->date_fin }}
                    </p>
                    <p>
                        <span class="small_title" >
                            duree :
                        </span>
                        {{ $data['formation']->duree }} jours
                    </p>
                </td>
            </tr>
        </table>

        {{-- liste des participants --}}

        <table class="liste_des_participants" border="1" >
            <tr>
                <th>MATRICULE</th>
                <th>PERSONNEL BENEFICIAIRE</th>
                <th>SERVICE</th>
            </tr>
            @foreach ($data['employes'] as $employe)
            <tr>
                <td>{{ $employe->matricule }}</td>
                <td>{{ $employe->nom_complet }}</td>
                <td>{{ $employe->service }}</td>
            </tr>
            @endforeach
        </table>

    </div>


</body>
</html>
