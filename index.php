<!DOCTYPE html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Voice Note - Universitas Pamulang</title>
    <link rel="shortcut icon" href="assets/ico/favicon.ico">
    <meta name="description" content="Sebuah aplikasi voice note yang mengizinkan kamu mengambil suara dan atau catatan dan dapat diputar kembali.">
    <link rel="stylesheet" href="assets/css/style.css" media="screen">
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" media="screen">
</head>
<body>
    <div class="container-fluid align-center">
        <img loading="lazy" importance="low" style="height: 5rem; width: 5rem;" src="assets/img/code-mic-150.png" alt="Voice Note App Logo">
        <h1>Voice Note</h1>
        <p>Aplikasi ini membuat catatan suara dan/atau teks dan memutarnya kembali.</p>
        <h3 class="no-browser-support">Maaf, browser kamu tidak support Web Speech API. Coba buka di Google Chrome</h3>
        <div class="app">
            <div class="row">
                <div class="col-md-6 align-center">
                    <h3>Tambah Pesan Suara</h3> <hr>
                    <div class="input-single">
                        <textarea id="note-textarea" style="font-size: 25px; resize: none; border: none;" placeholder="Buat sebuah pesan suara dengan mengetik atau menggunakan voice recognition." rows="8"></textarea>
                    </div>
                    <button id="start-record-btn" class="btn btn-flat btn-danger" title="Start Recording">Mulai</button>
                    <button id="pause-record-btn" class="btn btn-flat btn-warning" title="Pause Recording">Jeda</button>
                    <button id="save-note-btn" class="btn btn-flat btn-primary" title="Save Note">Simpan</button>
                    <p id="recording-instructions">Tekan tombol <strong>Mulai</strong> dan izinkan akses</p>
                </div>
                <div class="col-md-6 align-center">
                    <h3>Pesan Suara</h3> <hr>
                    <ul id="notes">
                        <li>
                            <p class="no-notes">You don't have any notes.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div id="footer">
        <div class="clearfix1">
            <div class="container">
                <div class="row">
                    <div class="center">
                        <p>Speech to Text Voice Note &copy; 2022 Hafiz Ramadhan</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>