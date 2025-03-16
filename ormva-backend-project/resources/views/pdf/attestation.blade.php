<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .header {
            text-align: center;
        }

        .titre h1{
            font-size: 20px;
            margin: 65px auto;
            text-align: center;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .content {
            width: 80%;
            height: 40%;
            padding: 10px 25px ;
            margin: 0 auto;
            line-height: 27px;
            letter-spacing: 1px;
            font-size: 18px ;
        }
        .footer {
            position: relative;
            width: 90%;
            height: 30%;
            margin: 0 auto;
        }

        .details , .lieu {
            width: 50%;
            position: absolute;
        }

        .details {
            top: 20%;
            left: 0;
        }

        .lieu {
            left: 70%;
            top: 20%;
            right: 0;
        }
    </style>
</head>
<body>
    {{-- header of pdf logo and name of office --}}
    <div class="header" >
        <img src="{{ public_path('img/ormva-logo.png') }}" alt="ORMVA Logo" width="100"  >
    </div>
    {{-- title of pdf --}}
    <div class="titre" >
        <h1>Attestation de Formation Continue</h1>
    </div>
    {{-- content section --}}
    <div class="content" >
        <p>
            Je soussigné, Hassan ,
            certifie que hamza obada a suivi avec succès
            la formation continue intitulée DevOps,
            organisée par ORMVA-SM.
        </p>
        <p>
            Cette formation s'est déroulée du 3/3/2025 au 3/6/2025,
            sur une durée totale de 3 Jours,
            et a permis à hamza obada d'acquérir une expertise approfondie dans le domaine
            de info . Grâce à cette expérience, hamza obada est
            désormais mieux préparé à relever les défis liés à ce domaine.
        </p>
    </div>
    <div class="footer">
            {{-- details of formation  --}}
    <div class="details" >
        <p>
            Intitulé de la formation : DevOps
        </p>
        <p>
            Durée : 3 Jours
        </p>
        <p>
            Organisée par : ORMVA-SM
        </p>
        <p>
            Encadrée par : Gharabi yassine
        </p>
    </div>
    {{-- lieu cachet --}}
    <div class="lieu" >
        <p>
            Fait à : clubFellah
        </p>
        <p>
            Le : 3/3/2025
        </p>
        <p>
            Signature du responsable
        </p>
        <p>
            Cachet officiel
        </p>
    </div>
    </div>
</body>
</html>
