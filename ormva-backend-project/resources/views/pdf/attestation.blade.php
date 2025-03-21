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

        .pdf__header table , .pdf__titre table {
            width: 100%;
        }

        .pdf__header td{
            text-align: center;
        }


        .pdf__titre table td{
            text-align: center;
            height: 80px;
            font-size: 22px;
            letter-spacing: 1px;
            font-weight: bold;
        }

        .pdf__infos .titre{
            letter-spacing: 1px;
            font-weight: bold;
        }
    </style>

</head>
<body>
    {{-- header of pdf --}}
    <div class="pdf__header" >
        <table >
            <tr>
                <td width="100%" >
                    <img src="{{ public_path('img/ormva-logo.png') }}" alt="ORMVA Logo" width="100"  >
                </td>
            </tr>
        </table>
    </div>

    {{-- title of pdf --}}
    <div class="pdf__titre" >
        <table>
            <tr>
                <td width="100%" >
                    Attestation de Formation Continue
                </td>
            </tr>
        </table>
    </div>

    {{-- participant and formation infos --}}

    <div class="pdf__infos" >
        <table>
            {{-- nom complet --}}
            <tr>
                <td >
                    <span class="titre" >Nom et Prenom</span>
                    : {{ $attestationDetails['details'][0]->nom_complet }}
                </td>
            </tr>
            {{-- formation --}}
            <tr>
                <td >
                    <span class="titre" >Formation</span>
                    : {{ $attestationDetails['details'][0]->intitule }}
                </td>
            </tr>
            {{-- duree --}}
            <tr>
                <td >
                    <span class="titre" >Durée</span>
                    : {{ $attestationDetails['details'][0]->duree }}
                </td>
            </tr>
            {{-- date de formation --}}
            <tr>
                <td >
                    <span class="titre" >Dates de Formation</span> :
                    Du  {{ $attestationDetails['details'][0]->date_debut }}
                    au  {{ $attestationDetails['details'][0]->date_fin }}
                </td>
            </tr>
            {{-- lieu --}}
            <tr>
                <td  >
                    <span class="titre" >Lieu</span> : {{ $attestationDetails['details'][0]->lieu }}
                </td>
            </tr>
        </table>
    </div>

</body>
</html>
